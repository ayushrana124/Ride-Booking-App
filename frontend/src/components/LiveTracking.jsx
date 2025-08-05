import React, { useEffect, useState, useRef } from 'react'
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
    height: '400px'
};

const LiveTracking = () => {
  const [position, setPosition] = useState(null);
  const [geoError, setGeoError] = useState('');
  const intervalRef = useRef(null);

  const updateLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          });
          setGeoError('');
        },
        (err) => {
          let errorMsg = '';
          switch (err.code) {
            case err.PERMISSION_DENIED:
              errorMsg = 'Permission denied. Please allow location access in your browser settings.';
              break;
            case err.POSITION_UNAVAILABLE:
              errorMsg = 'Position unavailable. Please check your device’s location settings.';
              break;
            case err.TIMEOUT:
              errorMsg = 'Request timed out. Try again.';
              break;
            default:
              errorMsg = 'An unknown geolocation error occurred.';
              break;
          }
          console.error('Geolocation error:', errorMsg);
          setGeoError(errorMsg);
        },
        { enableHighAccuracy: true }
      );
    } else {
      setGeoError('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    updateLocation(); // Initial fetch
    intervalRef.current = setInterval(updateLocation, 5000); // Update every 5 sec

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        {position ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={position}
            zoom={15}
          >
            <Marker position={position} />
          </GoogleMap>
        ) : (
          <div>
            <p>Getting your location...</p>
            {geoError && <p style={{ color: 'red' }}>{geoError}</p>}
          </div>
        )}
      </LoadScript>
    </div>
  );
};

export default LiveTracking;
