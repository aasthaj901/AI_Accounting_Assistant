import React, { useState } from 'react';
import { ChevronDown, Plus, Download, Filter, ArrowUpDown } from 'lucide-react';
import './TableStyles.css';

const Clients = () => {
  const [clients] = useState([
    { 
      id: 1,
      idNumber: 'CLT-001', 
      name: 'Dinesh Chabra', 
      email: 'dinesh.chabra@gmail.com', 
      phone: '+91 8794567890',
      balance: 'Rs. 2,499.00',
      paidToDate: 'Rs. 12,499.00', 
      status: 'Active' 
    },
    { 
      id: 2,
      idNumber: 'CLT-002',
      name: 'Danika Patil', 
      email: 'danika.patil8190@gmail.com', 
      phone: '+91 8910123891',
      balance: 'Rs. 599.00',
      paidToDate: 'Rs. 8,999.00',
      status: 'Active' 
    },
  ]);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterText, setFilterText] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const handleDropdownToggle = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  return (
    <div className="section-container">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span>Home</span> &gt; <span>Clients</span>
      </div>

      {/* Header Actions */}
      <div className="header-actions">
        <div className="actions-left">
          <div className="dropdown">
            <button className="btn">
              More Actions
              <ChevronDown size={16} />
            </button>
            {dropdownOpen !== null && (
              <div className="dropdown-menu">
                <button className="dropdown-item" onClick={() => alert('Edit Client')}>
                  Edit Client
                </button>
                <button className="dropdown-item" onClick={() => alert('Delete Client')}>
                  Delete Client
                </button>
              </div>
            )}
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
          
          <button className="btn btn-blue">
            <Plus size={16} />
            New Client
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="table">
          <thead className="table-header">
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>
                ID NUMBER
                <ArrowUpDown size={16} />
              </th>
              <th>
                NAME
                <ArrowUpDown size={16} />
              </th>
              <th>
                EMAIL
                <ArrowUpDown size={16} />
              </th>
              <th>
                PHONE
                <ArrowUpDown size={16} />
              </th>
              <th>
                BALANCE
                <ArrowUpDown size={16} />
              </th>
              <th>
                PAID TO DATE
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
            {clients.map((client, index) => (
              <tr key={client.id} className="table-row">
                <td>
                  <input type="checkbox" />
                </td>
                <td>{client.idNumber}</td>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td>{client.balance}</td>
                <td>{client.paidToDate}</td>
                <td>
                  <span className={`status-badge status-${client.status.toLowerCase()}`}>
                    {client.status}
                  </span>
                </td>
                <td>
                  <div className="dropdown">
                    <button className="btn" onClick={() => handleDropdownToggle(index)}>
                      More Actions <ChevronDown size={16} />
                    </button>
                    {dropdownOpen === index && (
                      <div className="dropdown-menu">
                        <button className="dropdown-item" onClick={() => alert('Edit Client')}>
                          Edit Client
                        </button>
                        <button className="dropdown-item" onClick={() => alert('Delete Client')}>
                          Delete Client
                        </button>
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
              Page 1 of 1. Total results: {clients.length}
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

export default Clients;
