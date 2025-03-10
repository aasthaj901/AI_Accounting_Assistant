// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home, Package, Users, FileText, ShoppingBag } from 'lucide-react';
import './App.css';
import Dashboard from './components/Dashboard';
import Products from './components/Products';
import Vendors from './components/Vendors';
import Clients from './components/Clients';
import Invoices from './components/Invoices';


const App = () => {
  return (
    <Router>
      <div className="app-container">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-title">Dashboard</div>
          <nav className="sidebar-nav">
            <Link to="/" className="nav-link">
              <Home className="nav-link-icon" size={20} />
              Dashboard
            </Link>
            <Link to="/products" className="nav-link">
              <Package className="nav-link-icon" size={20} />
              Products
            </Link>
            <Link to="/vendors" className="nav-link">
              <ShoppingBag className="nav-link-icon" size={20} />
              Vendors
            </Link>
            <Link to="/clients" className="nav-link">
              <Users className="nav-link-icon" size={20} />
              Clients
            </Link>
            <Link to="/invoices" className="nav-link">
              <FileText className="nav-link-icon" size={20} />
              Invoices
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="header">
            <h1 className="header-title"> AI ACCOUNTING ASSISTANT </h1>
          </div>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/invoices" element={<Invoices />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;