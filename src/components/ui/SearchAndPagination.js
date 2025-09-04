import React from 'react'

export default function SearchAndPagination({ activePage, setActivePage, totalPages }) {
  const handlePageClick = (page) => {
    setActivePage(page);
  };
// Generate page numbers dynamically based on totalPages
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  return (
     <div
          className="bg-white rounded-top d-flex flex-nowrap align-items-center"
          style={{
            width: "95%",
            margin: "auto",
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
     {pageNumbers.map(page => (
            <button
              key={page}
              className="btn btn-sm rounded-lg px-3"
              style={{
                backgroundColor: activePage === page ? '#6c63ff' : 'transparent',
                color: activePage === page ? '#fff' : '#000'
              }}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </button>
          ))}
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
    </div>   
  
  )
}


