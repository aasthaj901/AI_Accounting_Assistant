import React, { useState } from 'react';
import { ChevronDown, Plus, Download, Filter, ArrowUpDown } from 'lucide-react';
import './TableStyles.css';

const Vendors = () => {
  const [vendors, setVendors] = useState([
    { id: 1, name: 'Vendor 1', city: 'Mumbai', phone: '+91 9345672890', status: 'Active' },
    { id: 2, name: 'Vendor 2', city: 'Nasik', phone: '+91 8905673891', status: 'Active' },
  ]);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterText, setFilterText] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [showForm, setShowForm] = useState(false); // To control the visibility of the form
  const [newVendor, setNewVendor] = useState({
    name: '',
    city: '',
    phone: '',
    status: 'Active',
  });

  // Toggle the dropdown visibility
  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  // Handle input change for the new vendor form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVendor({
      ...newVendor,
      [name]: value,
    });
  };

  // Add new vendor to the table
  const handleAddVendor = () => {
    if (newVendor.name && newVendor.city && newVendor.phone) {
      setVendors([
        ...vendors,
        {
          id: vendors.length + 1, // Simple way to generate a unique ID
          ...newVendor,
        },
      ]);
      setShowForm(false); // Hide the form after submission
      setNewVendor({ name: '', city: '', phone: '', status: 'Active' }); // Reset form fields
    }
  };

  return (
    <div className="section-container">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span>Home</span> &gt; <span>Vendors</span>
      </div>

      {/* Header Actions */}
      <div className="header-actions">
        <div className="actions-left">
          <div className="dropdown">
            <button className="btn">
              More Actions
              <ChevronDown size={16} />
            </button>
          </div>

          
        </div>

        <div className="actions-right">
          <div className="filter-input-container">
            <input
              type="text"
              className="filter-input"
              placeholder="Filter"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
            <Filter size={16} className="filter-icon" />
          </div>
          
          <button className="btn btn-green">
            <Download size={16} />
            Import
          </button>
          
          <button
            className="btn btn-blue"
            onClick={() => setShowForm(true)} // Show the form when clicked
          >
            <Plus size={16} />
            New Vendor
          </button>
        </div>
      </div>

      {/* New Vendor Form */}
      {showForm && (
        <div className="new-vendor-form">
          <h3>Add New Vendor</h3>
          <input
            type="text"
            name="name"
            placeholder="Vendor Name"
            value={newVendor.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={newVendor.city}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={newVendor.phone}
            onChange={handleInputChange}
          />
          <select
            name="status"
            value={newVendor.status}
            onChange={handleInputChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button onClick={handleAddVendor}>Add Vendor</button>
          <button onClick={() => setShowForm(false)}>Cancel</button>
        </div>
      )}

      {/* Table */}
      <div className="table-container">
        <table className="table">
          <thead className="table-header">
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>
                NAME
                <ArrowUpDown size={16} />
              </th>
              <th>
                CITY
                <ArrowUpDown size={16} />
              </th>
              <th>
                PHONE
                <ArrowUpDown size={16} />
              </th>
              <th>
                STATUS
                <ArrowUpDown size={16} />
              </th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor) => (
              <tr key={vendor.id} className="table-row">
                <td>
                  <input type="checkbox" />
                </td>
                <td>{vendor.name}</td>
                <td>{vendor.city}</td>
                <td>{vendor.phone}</td>
                <td>
                  <span className={`status-badge status-${vendor.status.toLowerCase()}`}>
                    {vendor.status}
                  </span>
                </td>
                <td>
                  <div className="dropdown">
                    <button
                      className="btn"
                      onClick={() => toggleDropdown(vendor.id)}
                    >
                      More Actions <ChevronDown size={16} />
                    </button>
                    {dropdownOpen === vendor.id && (
                      <div className="dropdown-menu">
                        <button className="dropdown-item">Edit Vendor</button>
                        <button className="dropdown-item">Delete Vendor</button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination-container">
          <div>
            <select
              className="rows-select"
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
            >
              <option value={10}>2</option>
              <option value={20}>3</option>
              <option value={50}>4</option>
            </select>
            <span className="pagination-text"> rows</span>
          </div>

          <div className="pagination-controls">
            <span className="pagination-text">
              Page 1 of 1. Total results: {vendors.length}
            </span>
            <div className="pagination-buttons">
              <button className="pagination-button" disabled>
                Previous
              </button>
              <button className="pagination-button" disabled>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vendors;
