import React, { useState, useEffect } from "react";
import { getAuth, updateProfile, updateEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Correct navigation hook
  const auth = getAuth();

  useEffect(() => {
    const user = auth.currentUser; // Fetch user inside useEffect
    if (user) {
      setDisplayName(user.displayName || "");
      setEmail(user.email || "");
    }
  }, [auth]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const user = auth.currentUser; // Fetch user inside function to avoid stale values

    if (!user) {
      setError("User not authenticated.");
      return;
    }

    try {
      await updateProfile(user, { displayName });
      // Updating email requires reauthentication
      navigate("/dashboard");
      await updateEmail(user, email);
      setMessage("Profile updated successfully.");
    } catch (error) {
      setError("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      {message && <p className="text-green-500">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleUpdateProfile} className="space-y-4">
        <input
          type="text"
          placeholder="Display Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
