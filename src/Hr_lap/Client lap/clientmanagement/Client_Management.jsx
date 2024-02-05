import React, { useState } from 'react';
import './Client_Management.css';
import { clientupdateUser, clientdeleteUser } from '../../../http-common';
 
const Client_Management = () => {
  const [searchCriteria, setSearchCriteria] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [editMode, setEditMode] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
 
  const handleInputChange = (e) => {
    setSearchCriteria(e.target.value);
  };
 
  const handleSearch = () => {
    // Mock data for demonstration purposes
    const data = [
      
    ];
 
    // Filter data based on the provided criteria
    const filteredData = data.filter(
      (item) =>
        (!searchCriteria ||
          item.id.toString().includes(searchCriteria) ||
          item.name.toLowerCase().includes(searchCriteria.toLowerCase()) ||
          item.phone.includes(searchCriteria))
    );
 
    setSearchResults(filteredData);
    setIsTableVisible(true);
  };
 
  const handleDelete = (id) => {
    const updatedResults = searchResults.filter((item) => item.id !== id);
    setSearchResults(updatedResults);
    setEditMode(null);
    setDeleteSuccess(true);
 
    // Clear success message after a delay
    setTimeout(() => {
      setDeleteSuccess(false);
    }, 3000);
  };
 
  const handleEdit = (id) => {
    setEditMode(id);
    const rowToEdit = searchResults.find((item) => item.id === id);
    setEditedValues({ ...rowToEdit });
  };
 
  const handleSave = () => {
    const updatedResults = searchResults.map((item) =>
      item.id === editedValues.id ? editedValues : item
    );
 
    setSearchResults(updatedResults);
    setEditMode(null);
    setSaveSuccess(true);
 
    // Clear success message after a delay
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };
 
  const handleCancelEdit = () => {
    setEditMode(null);
  };
 
  const handleEditInputChange = (e, field) => {
    setEditedValues({ ...editedValues, [field]: e.target.value });
  };
 
  return (
    <div className="search-page-container">
      <h1>Client Management</h1>
 
      <div className="search-bar-container">
        <div className={`search-input-container ${isTableVisible ? 'hidden' : ''}`}>
          <input
            type="text"
            id="searchInput"
            value={searchCriteria}
            onChange={handleInputChange}
            placeholder="Search by Client ID/Name/Phone No"
          />
          <span className="search-symbol" onClick={handleSearch}>
            &#128269;
          </span>
        </div>
      </div>
 
      {isTableVisible && (
        <table className="result-table">
          <thead>
            <tr>
              <th>Client ID</th>
              <th>S No</th>
              <th>Client Name</th>
              <th>Phone Number</th>
              <th>Date</th>
              <th>Web Site</th>
              <th>Contact Person</th>
              <th>Email Id</th>
              <th>Meeting Time</th>
              <th>Who Involved</th>
              <th>Remarks</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((item) => (
              <tr key={item.S_no}>
                <td>{editMode === item.id ? <input type="text" value={editedValues.id} disabled /> : item.id}</td>
                <td>{editMode === item.id ? <input type="text" value={editedValues.S_no} onChange={(e) => handleEditInputChange(e, 'S_no')} /> : item.S_no}</td>
                <td>{editMode === item.id ? <input type="text" value={editedValues.name} onChange={(e) => handleEditInputChange(e, 'name')} /> : item.name}</td>
                <td>{editMode === item.id ? <input type="number" value={editedValues.phone} onChange={(e) => handleEditInputChange(e, 'phone')} /> : item.phone}</td>
                <td>{editMode === item.id ? <input type="date" value={editedValues.date} onChange={(e) => handleEditInputChange(e, 'date')} /> : item.date}</td>
                <td>{editMode === item.id ? <input type="text" value={editedValues.web} onChange={(e) => handleEditInputChange(e, 'web')} /> : item.web}</td>
                <td>{editMode === item.id ? <input type="text" value={editedValues.cotactPerson} onChange={(e) => handleEditInputChange(e, 'cotactPerson')} /> : item.cotactPerson}</td>
                <td>{editMode === item.id ? <input type="text" value={editedValues.emailId} onChange={(e) => handleEditInputChange(e, 'emailId')} /> : item.emailId}</td>
                <td>{editMode === item.id ? <input type="time" value={editedValues.meetingTime} onChange={(e) => handleEditInputChange(e, 'meetingTime')} /> : item.meetingTime}</td>
                <td>{editMode === item.id ? <input type="text" value={editedValues.whoInvolved} onChange={(e) => handleEditInputChange(e, 'whoInvolved')} /> : item.whoInvolved}</td>
                <td>{editMode === item.id ? <input type="text" value={editedValues.remarks} onChange={(e) => handleEditInputChange(e, 'remarks')} /> : item.remarks}</td>
                <td>
                  {editMode === item.id ? (
                    <>
                      <button onClick={handleSave}>Save</button>
                      <button onClick={handleCancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(item.id)}>Edit</button>
                      <button onClick={() => handleDelete(item.id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
 
      {saveSuccess && <div className="success-message">Changes saved successfully!</div>}
      {deleteSuccess && <div className="success-message">Deleted successfully!</div>}
    </div>
  );
};
 
export default Client_Management;