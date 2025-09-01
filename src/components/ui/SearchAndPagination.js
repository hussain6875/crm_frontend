import React from 'react'
<<<<<<< HEAD
import { FaSearch } from 'react-icons/fa'
import { useState } from 'react';

export default function SearchAndPagination({ activePage, setActivePage, totalPages }) {
  const handlePageClick = (page) => {
    setActivePage(page);
  };

  return (
  
     <div className="bg-white rounded-top d-flex flex-nowrap align-items-center"
          style={{
            width: "95%",
            margin: "20px",
            height: "10%",
            justifyContent: "space-between"
          }}
        >
 <div className="d-flex align-items-center bg-white p-3 rounded mb-3 shadow-sm w-100 margin-2px">
  {/* Search Input */}
  <div  style={{ width: '280px', margin:"10px" }}>
    <FaSearch className="position-absolute top-50 start-0 translate-middle-y ms-2 text-gray-300" />
    <input
      type="text"
      className="form-control ps-5 bg-light border-0 rounded-lg"
      placeholder="Search phone, name, city"
    />
  </div>

  {/* Pagination */}
  <div className="d-flex align-items-center gap-2 ms-auto flex-wrap">
    <button
      className="btn text-muted"
      onClick={() => activePage > 1 && setActivePage(activePage - 1)}
      disabled={activePage === 1}
      style={{ cursor: activePage === 1 ? 'not-allowed' : 'pointer' }}
    >
      &larr; Previous
    </button>
    <button 
      className="btn btn-sm rounded-lg px-3" 
      style={{ backgroundColor: activePage === 1 ? '#6c63ff' : 'transparent', color: activePage === 1 ? '#fff' : '#000' }}
      onClick={() => handlePageClick(1)}
    >
      1
    </button>
    <button 
      className="btn btn-sm rounded-lg px-3" 
      style={{ backgroundColor: activePage === 2 ? '#6c63ff' : 'transparent', color: activePage === 2 ? '#fff' : '#000' }}
      onClick={() => handlePageClick(2)}
    >
      2
    </button>
    <button 
      className="btn btn-sm rounded-lg px-3" 
      style={{ backgroundColor: activePage === 3 ? '#6c63ff' : 'transparent', color: activePage === 3 ? '#fff' : '#000' }}
      onClick={() => handlePageClick(3)}
    >
      3
    </button>
    <span className="text-muted">...</span>
    <button 
      className="btn btn-sm rounded-lg px-3" 
      style={{ backgroundColor: activePage === 67 ? '#6c63ff' : 'transparent', color: activePage === 67 ? '#fff' : '#000' }}
      onClick={() => handlePageClick(67)}
    >
      67
    </button>
    <button 
      className="btn btn-sm rounded-lg px-3" 
      style={{ backgroundColor: activePage === 68 ? '#6c63ff' : 'transparent', color: activePage === 68 ? '#fff' : '#000' }}
      onClick={() => handlePageClick(68)}
    >
      68
    </button>
    <button
      className="btn"
      style={{ color: '#6c63ff', cursor: activePage === totalPages ? 'not-allowed' : 'pointer' }}
      onClick={() => activePage < totalPages && setActivePage(activePage + 1)}
      disabled={activePage === totalPages}
    >
      Next &rarr;
    </button>
  </div>
</div>
=======

export default function SearchAndPagination() {
  return (
     <div
          className="bg-white rounded-top d-flex flex-nowrap align-items-center"
          style={{
            width: "95%",
            margin: "auto",
            height: "10%",
            marginLeft: "20px",
            marginRight: "10px",
            marginTop:"2px",
            justifyContent: "space-between",
          }}
        >
>>>>>>> 195647c (add Leads list, Lead detail page, and Create Lead offcanvas drawer)
        
        </div>
  )
}


