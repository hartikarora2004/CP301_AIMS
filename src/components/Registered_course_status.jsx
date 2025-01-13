import React, { useState } from 'react';
import "./Registered_course_status.css"
import Navbar_student from './navbar_student';
const Registered_course_status = () => {
  const data = [
    { id: 1, course: 'HS406 MANAGERIAL SCIENCE', type: 'Credit', status: 'Pending Faculty Advisor Approval' },
    { id: 2, course: 'HS406 MANAGERIAL SCIENCE', type: 'Credit', status: 'Pending Instructor Approval'},
    { id: 3, course: 'HS406 MANAGERIAL SCIENCE', type: 'Credit', status: 'Enrolled'},
  ];


  return (
    <div>
      <Navbar_student />
    <div className='ApproveTable'>
      <h2>Course Status</h2>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>S#</th>
            <th>Course Title/Code</th>
            <th>Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={row.id}>
              <td>{index + 1}</td>
              <td>{row.course}</td>
              <td>{row.type}</td>
              <td>{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Registered_course_status;
