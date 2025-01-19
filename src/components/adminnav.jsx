import React from 'react';
import './Navbar.css';

const AdminNav = ({ setActiveTab }) => {
    return (
        <nav className="navbar">
            <div className="logo">AIMS</div>
            <div className="menu">
                <a onClick={() => setActiveTab('students')}>Manage Students</a>
                <a onClick={() => setActiveTab('faculty')}>Manage Faculty</a>
            </div>
        </nav>
    );
};

export default AdminNav ;
