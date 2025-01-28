import React from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

const AdminNav = ({ setActiveTab }) => {
    const navigate = useNavigate();
    return (
        <nav className="navbar">
            <div className="logo"
            onClick={() => navigate("/admin")}>AIMS:: Academic Information Management System</div>
            <div className="menu">
                <a onClick={() => setActiveTab('students')}>Manage Students</a>
                <a onClick={() => setActiveTab('faculty')}>Manage Faculty</a>
            </div>
        </nav>
    );
};

export default AdminNav ;
