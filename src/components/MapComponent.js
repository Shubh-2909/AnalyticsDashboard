// import React, { useEffect } from 'react';
// import L from 'leaflet';

// const MapComponent = ({ clusters }) => {
//   useEffect(() => {
//     // Initialize map only once
//     const map = L.map('map').setView([22.5937, 78.9629], 5); // Centered over India

//     // Add OpenStreetMap tiles
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; OpenStreetMap contributors'
//     }).addTo(map);

//     // Add markers for each cluster with clickable popups showing details
//     clusters.forEach(cluster => {
//       const marker = L.marker([cluster.location.latitude, cluster.location.longitude]).addTo(map);
//       marker.bindPopup(`<strong>${cluster.name}</strong><br/>Users: ${cluster.users}<br/>Projects: ${cluster.projects}`);
//     });

//     // Cleanup on unmount
//     return () => {
//       map.remove();
//     };
//   }, [clusters]);

//   return <div id="map" style={{ height: '400px', width: '100%' }} />;
// };

// export default MapComponent;

import React, { useEffect } from 'react';
import L from 'leaflet';

const MapComponent = ({ clusters }) => {
  useEffect(() => {
    // Initialize map only once
    const map = L.map('map').setView([22.5937, 78.9629], 5); // Centered over India

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Add markers for each cluster with clickable popups showing details
    clusters.forEach(cluster => {
      const marker = L.marker([cluster.location.latitude, cluster.location.longitude]).addTo(map);
      marker.bindPopup(`<strong>${cluster.name}</strong><br/>Users: ${cluster.users}<br/>Projects: ${cluster.projects}`);
    });

    // Cleanup on unmount
    return () => {
      map.remove();
    };
  }, [clusters]);

  return <div id="map" style={{ height: '400px', width: '100%' }} />;
};

export default MapComponent;