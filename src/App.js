import React, { useEffect, useState } from 'react';
import LocationTable from './components/LocationTable/LocationTable';
import LocationForm from './components/LocationForm/LocationForm';
import * as api from './services/api';
import './index.css';

const App = () => {
  const [locations, setLocations] = useState([]);
  const [editMode, setEditMode] = useState(null);
  
  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const data = await api.getLocations();
      setLocations(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddLocation = async (newLocation) => {
    try {
      const createdLocation = await api.createLocation(newLocation);
      setLocations((prevLocations) => [...prevLocations, createdLocation]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditLocation = (locationId) => {
    setEditMode(locationId);
  };

  const handleSaveLocation = async (updatedLocation) => {
    try {
      await api.updateLocation(updatedLocation.id, updatedLocation);
      setLocations((prevLocations) =>
        prevLocations.map((location) =>
          location.id === updatedLocation.id ? updatedLocation : location
        )
      );
      setEditMode(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteLocation = async (id) => {
    try {
      await api.deleteLocation(id);
      setLocations((prevLocations) =>
        prevLocations.filter((location) => location.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app">
      <h1>Location App</h1>
      <LocationForm onSubmit={handleAddLocation} />
      <LocationTable
        locations={locations}
        editMode={editMode}
        onEdit={handleEditLocation}
        onSave={handleSaveLocation}
        onDelete={handleDeleteLocation}
      />
    </div>
  );
};

export default App;
