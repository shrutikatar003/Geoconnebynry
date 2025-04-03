import React, { useState, useEffect, useRef } from 'react';
import { Map, Loader } from 'lucide-react';

const GoogleMap = ({ address, lat, lng }) => {
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    // Load Google Maps script
    const googleMapScript = document.createElement('script');
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
    googleMapScript.async = true;
    googleMapScript.defer = true;
    
    googleMapScript.addEventListener('load', () => {
      setMapLoaded(true);
    });
    
    googleMapScript.addEventListener('error', () => {
      setMapError(true);
    });
    
    document.body.appendChild(googleMapScript);
    
    return () => {
      document.body.removeChild(googleMapScript);
    };
  }, []);

  useEffect(() => {
    if (mapLoaded && mapRef.current) {
      try {
        // Create map instance
        const mapInstance = new window.google.maps.Map(mapRef.current, {
          center: { lat, lng },
          zoom: 14,
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
        });
        
        // Add marker for the location
        const marker = new window.google.maps.Marker({
          position: { lat, lng },
          map: mapInstance,
          title: address,
          animation: window.google.maps.Animation.DROP
        });
        
        // Create info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `<div><strong>${address}</strong></div>`
        });
        
        // Show info window on marker click
        marker.addListener('click', () => {
          infoWindow.open(mapInstance, marker);
        });
      } catch (error) {
        console.error("Error initializing map:", error);
        setMapError(true);
      }
    }
  }, [mapLoaded, lat, lng, address]);

  if (mapError) {
    return (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center flex-col">
        <Map size={48} className="text-red-600 mb-2" />
        <p className="font-medium text-red-600">Unable to load map</p>
        <p className="text-sm text-gray-600">Please check your connection and try again</p>
      </div>
    );
  }

  if (!mapLoaded) {
    return (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center flex-col">
        <Loader size={48} className="text-blue-600 mb-2 animate-spin" />
        <p className="font-medium">Loading map...</p>
      </div>
    );
  }

  return <div ref={mapRef} className="w-full h-full" />;
};

export default GoogleMap;