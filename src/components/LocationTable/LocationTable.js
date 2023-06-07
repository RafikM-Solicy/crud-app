import React, { useState } from 'react';
import './LocationTable.css';

const LocationTable = ({ locations, onEdit, onSave, onDelete }) => {
  const [editMode, setEditMode] = useState(null);
  const [editedAddressName, setEditedAddressName] = useState('');
  const [editedLat, setEditedLat] = useState('');
  const [editedLong, setEditedLong] = useState('');

  const handleEdit = (location) => {
    setEditMode(location.id);
    setEditedAddressName(location.addressName);
    setEditedLat(location.lat);
    setEditedLong(location.long);
  };

  const handleSave = () => {
    const updatedLocation = {
      id: editMode,
      addressName: editedAddressName,
      lat: parseFloat(editedLat).toFixed(7),
      long: parseFloat(editedLong).toFixed(7),
    };
    onSave(updatedLocation);
    setEditMode(null);
    setEditedAddressName('');
    setEditedLat('');
    setEditedLong('');
  };

  const handleCancel = () => {
    setEditMode(null);
    setEditedAddressName('');
    setEditedLat('');
    setEditedLong('');
  };

  return (
    <table className="location-table">
      <thead>
        <tr>
          <th>Address Name</th>
          <th>Latitude</th>
          <th>Longitude</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {locations.map((location) => (
          <tr key={location.id}>
            <td>
              {editMode === location.id ? (
                <input
                  type="text"
                  value={editedAddressName}
                  onChange={(e) => setEditedAddressName(e.target.value)}
                />
              ) : (
                location.addressName
              )}
            </td>
            <td>
              {editMode === location.id ? (
                <input
                  type="text"
                  value={editedLat}
                  onChange={(e) => setEditedLat(e.target.value)}
                />
              ) : (
                location.lat
              )}
            </td>
            <td>
              {editMode === location.id ? (
                <input
                  type="text"
                  value={editedLong}
                  onChange={(e) => setEditedLong(e.target.value)}
                />
              ) : (
                location.long
              )}
            </td>
            <td>
              {editMode === location.id ? (
                <>
                  <button onClick={handleSave}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => handleEdit(location)}>Edit</button>
                  <button onClick={() => onDelete(location.id)}>Delete</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LocationTable;
