import React, { useState } from 'react';
import { ChevronDown, Plus, Download, Filter, ArrowUpDown } from 'lucide-react';
import './TableStyles.css';
import './Products.css';

const Products = () => {
  const [products] = useState([
    { id: 1, name: 'Skin CARE shampoo L', status: 'Active', notes: '', price: 'Rs. 1011.00', quantity: 1 },
    { id: 2, name: 'Sunscreen SPF 50', status: 'Active', notes: '', price: 'Rs. 411.00', quantity: 1 },
  ]);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterText, setFilterText] = useState('');
  const [statusFilter, setStatusFilter] = useState('Active');

  const [dropdownVisible, setDropdownVisible] = useState(null);

  const handleAction = (productId, action) => {
    if (action === 'edit') {
      console.log(`Editing product with id: ${productId}`);
    } else if (action === 'delete') {
      console.log(`Deleting product with id: ${productId}`);
    }
  };

  const toggleDropdown = (productId) => {
    setDropdownVisible(dropdownVisible === productId ? null : productId);
  };

  return (
    <div className="section-container">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span>Home</span> &gt; <span>Products</span>
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

          <div className="dropdown">
            <button className="btn btn-light-blue">
              Active
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
          
          <button className="btn btn-blue">
            <Plus size={16} />
            New Product
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="products-table">
          <thead className="table-header">
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>
                PRODUCT
                <ArrowUpDown size={16} />
              </th>
              <th>
                NOTES
                <ArrowUpDown size={16} />
              </th>
              <th>
                PRICE
                <ArrowUpDown size={16} />
              </th>
              <th>
                QUANTITY
                <ArrowUpDown size={16} />
              </th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="table-row">
                <td>
                  <input type="checkbox" />
                </td>
                <td>
                  <div className="product-name">
                    <span className="status-badge">
                      {product.status}
                    </span>
                    {product.name}
                  </div>
                </td>
                <td>{product.notes}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>
                  <div className="dropdown">
                    <button className="btn" onClick={() => toggleDropdown(product.id)}>
                      More Actions <ChevronDown size={16} />
                    </button>
                    {dropdownVisible === product.id && (
                      <div className="dropdown-menu">
                        <button onClick={() => handleAction(product.id, 'edit')} className="dropdown-item">Edit Product</button>
                        <button onClick={() => handleAction(product.id, 'delete')} className="dropdown-item">Delete Product</button>
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
          <div className="rows-per-page">
            <select
              className="rows-select"
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
            >
              <option value={10}>2</option>
              <option value={20}>3</option>
              <option value={50}>4</option>
            </select>
            <span className="pagination-text">rows</span>
          </div>

          <div className="pagination-controls">
            <span className="pagination-text">
              Page 1 of 1. Total results: {products.length}
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

export default Products;
