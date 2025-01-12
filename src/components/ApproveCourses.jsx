import React, { useState } from 'react';
import "./ApproveCourse.css"
import Navbar from './navbar';
const CourseOfferingDetails = () => {
  const data = [
    { id: 1, rollNo: '2021CSB1066', name: 'ANANT PRAKASH SINGH', course: 'HS406 MANAGERIAL SCIENCE', type: 'Credit', approveAs: 'Faculty Advisor' },
    { id: 2, rollNo: '2021CSB1070', name: 'ANSHUL MITTAL', course: 'HS406 MANAGERIAL SCIENCE', type: 'Credit', approveAs: 'Faculty Advisor'},
    { id: 3, rollNo: '2021CHB1058', name: 'TUHINANSHU MODGIL', course: 'HS406 MANAGERIAL SCIENCE', type: 'Credit', approveAs: 'Faculty Advisor'},
  ];


  return (
    <div>
      <Navbar />
    <div className='ApproveTable'>
      <h2>Requests for Approval</h2>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>S#</th>
            <th>Roll No.</th>
            <th>Name</th>
            <th>Course Title/Code</th>
            <th>Approve Request As</th>
            <th>Approve</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={row.id}>
              <td>{index + 1}</td>
              <td>{row.rollNo}</td>
              <td>{row.name}</td>
              <td>{row.course}</td>
              <td>{row.approveAs}</td>
              <td><button>Approve Request</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default CourseOfferingDetails;
