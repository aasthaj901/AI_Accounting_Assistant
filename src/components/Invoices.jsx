import React, { useState } from 'react';
import { ChevronDown, Plus, Download, Filter, ArrowUpDown } from 'lucide-react';
import './TableStyles.css';


const Invoices = () => {
  const [invoices, setInvoices] = useState([
    { 
      id: 'INV-001', 
      client: 'Dinesh Chabra', 
      amount: 'Rs. 1,299.00',
      balance: 'Rs. 299.00',
      date: '2024-02-20',
      dueDate: '2024-03-20', 
      status: 'Paid' 
    },
    { 
      id: 'INV-002', 
      client: 'Danika Patil', 
      amount: 'Rs. 2,499.00',
      balance: 'Rs. 2,499.00',
      date: '2024-02-19',
      dueDate: '2024-03-19', 
      status: 'Pending' 
    },
  ]);
  
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [filterText, setFilterText] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [newInvoice, setNewInvoice] = useState({
    client: '',
    phone: '',
    email: '',
    amount: '',
    products: '',
    status: 'Pending',
    date: new Date().toISOString().split('T')[0], // Default to current date
    dueDate: new Date().toISOString().split('T')[0], // Default to current date
  });

  // Toggle dropdown visibility
  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInvoice({ ...newInvoice, [name]: value });
  };

  // Handle new invoice form submission
  const handleAddInvoice = () => {
    const newInvoiceData = {
      ...newInvoice,
      id: `INV-${(invoices.length + 1).toString().padStart(3, '0')}`, // Generate new invoice ID
    };
    setInvoices([...invoices, newInvoiceData]); // Add new invoice to the list
    setShowModal(false); // Close the modal
    setNewInvoice({
      client: '',
      phone: '',
      email: '',
      amount: '',
      products: '',
      status: 'Pending',
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date().toISOString().split('T')[0],
    }); // Reset the form
  };

  return (
    <div className="section-container">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span>Home</span> &gt; <span>Invoices</span>
      </div>

      {/* Header Actions */}
      <div className="header-actions">
        <div className="actions-left">
          <div className="dropdown">
            <button className="btn" onClick={() => toggleDropdown('moreActions')}>
              More Actions
              <ChevronDown size={16} />
            </button>
            {/* Dropdown menu */}
            {dropdownOpen === 'moreActions' && (
              <div className="dropdown-menu">
                <button className="dropdown-item">Delete Invoice</button>
                <button className="dropdown-item">Print Invoice</button>
              </div>
            )}
          </div>

          <div className="dropdown">
            <button className="btn btn-light-blue" onClick={() => toggleDropdown('status')}>
              All Status
              <ChevronDown size={16} />
            </button>
            {/* Dropdown menu */}
            {dropdownOpen === 'status' && (
              <div className="dropdown-menu">
                <button className="dropdown-item">Paid</button>
                <button className="dropdown-item">Pending</button>
                <button className="dropdown-item">Overdue</button>
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
            Export
          </button>

          <button className="btn btn-blue" onClick={() => setShowModal(true)}>
            <Plus size={16} />
            New Invoice
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
                INVOICE #
                <ArrowUpDown size={16} />
              </th>
              <th>
                CLIENT
                <ArrowUpDown size={16} />
              </th>
              <th>
                AMOUNT
                <ArrowUpDown size={16} />
              </th>
              <th>
                BALANCE
                <ArrowUpDown size={16} />
              </th>
              <th>
                DATE
                <ArrowUpDown size={16} />
              </th>
              <th>
                DUE DATE
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
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="table-row">
                <td>
                  <input type="checkbox" />
                </td>
                <td>{invoice.id}</td>
                <td>{invoice.client}</td>
                <td>{invoice.amount}</td>
                <td>{invoice.balance}</td>
                <td>{invoice.date}</td>
                <td>{invoice.dueDate}</td>
                <td>
                  <span className={`status-badge status-${invoice.status.toLowerCase()}`}>
                    {invoice.status}
                  </span>
                </td>
                <td>
                  <div className="dropdown">
                    <button className="btn" onClick={() => toggleDropdown(invoice.id)}>
                      More Actions <ChevronDown size={16} />
                    </button>
                    {/* Dropdown menu */}
                    {dropdownOpen === invoice.id && (
                      <div className="dropdown-menu">
                        <button className="dropdown-item">Delete Invoice</button>
                        <button className="dropdown-item">Print Invoice</button>
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
              Page 1 of 1. Total results: {invoices.length}
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

      {/* Add New Invoice Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add New Invoice</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddInvoice();
              }}
            >
              <div className="form-group">
                <label>Client Name:</label>
                <input
                  type="text"
                  name="client"
                  value={newInvoice.client}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone Number:</label>
                <input
                  type="text"
                  name="phone"
                  value={newInvoice.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={newInvoice.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Amount:</label>
                <input
                  type="text"
                  name="amount"
                  value={newInvoice.amount}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Products:</label>
                <input
                  type="text"
                  name="products"
                  value={newInvoice.products}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Due Date:</label>
                <input
                  type="date"
                  name="dueDate"
                  value={newInvoice.dueDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit">Add Invoice</button>
                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoices;
