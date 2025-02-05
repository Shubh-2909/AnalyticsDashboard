from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field
from typing import List
import uvicorn
from datetime import datetime
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# MongoDB connection URL
MONGODB_URL = os.getenv("MONGODB_URL")
DB_NAME = "analytics_dashboard"
COLLECTION_NAME = "clusters"

# Pydantic Models for Data Validation
class Location(BaseModel):
    latitude: float = Field(..., ge=-90, le=90)
    longitude: float = Field(..., ge=-180, le=180)

class ClusterCreate(BaseModel):
    name: str = Field(..., min_length=1)
    location: Location
    users: int = Field(..., ge=0)
    projects: int = Field(..., ge=0)
    leads: int = Field(..., ge=0)

class ClusterResponse(ClusterCreate):
    id: str
    created_at: datetime

# Database Connection Setup
class Database:
    client: AsyncIOMotorClient = None

db = Database()

# Lifespan context manager (replaces on_event handlers)
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Connect to MongoDB
    db.client = AsyncIOMotorClient(MONGODB_URL)
    yield
    # Shutdown: Close MongoDB connection
    if db.client:
        db.client.close()

# Initialize FastAPI app with lifespan
app = FastAPI(title="Cluster Management API", lifespan=lifespan)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (change to specific domains in production)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# API Endpoints
@app.get("/api/data", response_model=List[ClusterResponse])
async def get_clusters():
    """Fetch all clusters from MongoDB."""
    clusters = []
    cursor = db.client[DB_NAME][COLLECTION_NAME].find()
    async for document in cursor:
        document["id"] = str(document.pop("_id"))
        clusters.append(ClusterResponse(**document))
    return clusters

@app.get("/api/metrics")
async def get_metrics():
    """Calculate and return metrics from MongoDB."""
    pipeline = [
        {
            "$group": {
                "_id": None,
                "total_users": {"$sum": "$users"},
                "total_projects": {"$sum": "$projects"},
                "total_leads": {"$sum": "$leads"},
                "cluster_count": {"$sum": 1}
            }
        }
    ]
    
    result = await db.client[DB_NAME][COLLECTION_NAME].aggregate(pipeline).to_list(1)
    
    if not result:
        return {
            "total_users": 0,
            "total_projects": 0,
            "total_leads": 0,
            "cluster_count": 0
        }
        
    metrics = result[0]
    metrics.pop("_id")
    return metrics

@app.post("/api/cluster", response_model=ClusterResponse)
async def create_cluster(cluster: ClusterCreate):
    """Add a new cluster to MongoDB."""
    # Check if cluster name already exists
    existing = await db.client[DB_NAME][COLLECTION_NAME].find_one({"name": cluster.name})
    if existing:
        raise HTTPException(status_code=400, detail="Cluster with this name already exists")
    
    # Prepare cluster document
    cluster_dict = cluster.dict()
    cluster_dict["created_at"] = datetime.utcnow()
    
    # Insert into MongoDB
    result = await db.client[DB_NAME][COLLECTION_NAME].insert_one(cluster_dict)
    
    # Prepare response
    cluster_dict["id"] = str(result.inserted_id)
    return ClusterResponse(**cluster_dict)

# Run the server
if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)
