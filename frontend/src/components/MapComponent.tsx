import type React from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import type { Cluster } from "../types"
import "leaflet/dist/leaflet.css"

interface MapComponentProps {
  clusters: Cluster[]
}

const MapComponent: React.FC<MapComponentProps> = ({ clusters }) => {
  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {clusters.map((cluster) => (
        <Marker key={cluster._id} position={[cluster.location.latitude, cluster.location.longitude]}>
          <Popup>
            <div>
              <h3>{cluster.name}</h3>
              <p>Users: {cluster.users}</p>
              <p>Projects: {cluster.projects}</p>
              <p>Leads: {cluster.leads}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default MapComponent

