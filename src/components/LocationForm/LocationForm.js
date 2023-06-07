import React, { useState } from 'react';
import './LocationForm.css';

const LocationForm = ({ onSubmit }) => {
  const [addressName, setAddressName] = useState('');
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Regular expressions to validate latitude and longitude
    const latRegex = /^-?([1-8]?[0-9]{1}\.{1}\d{1,7}|90\.{1}0{1,7})$/;
    const longRegex = /^-?((([1]?[0-7]?[0-9]{1})|([1]?[8]?[0]{1}))\.{1}\d{1,7}|([1]?[8]?[0]{1}\.{1}0{1,7}))$/;

    if (!lat.match(latRegex) || !long.match(longRegex)) {
      setError('Please enter a valid latitude and longitude.');
      return;
    }

    const newLocation = {
      addressName,
      lat: parseFloat(lat).toFixed(7),
      long: parseFloat(long).toFixed(7),
    };
    onSubmit(newLocation);
    setAddressName('');
    setLat('');
    setLong('');
    setError('');
  };

  return (
    <form className="location-form" onSubmit={handleSubmit}>
      <h2>Add Location</h2>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        placeholder="Address Name"
        value={addressName}
        onChange={(e) => setAddressName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Latitude"
        value={lat}
        onChange={(e) => setLat(e.target.value)}
      />
      <input
        type="text"
        placeholder="Longitude"
        value={long}
        onChange={(e) => setLong(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default LocationForm;
