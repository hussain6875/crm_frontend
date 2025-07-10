import React, { useState } from 'react';

const Filters = () => {
  const [industry, setIndustry] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [status, setStatus] = useState('');
  const [startDate, setStartDate] = useState('');

  const industryOptions = [
    'All', 'Technology', 'Finance', 'Healthcare', 'Education', 'Manufacturing'
  ];

  const cityOptions = [
    'All', 'New York', 'London', 'Tokyo', 'Paris', 'Berlin'
  ];

  const countryOptions = [
    'All', 'USA', 'UK', 'Japan', 'France', 'Germany'
  ];

  const statusOptions = [
    'All', 'New', 'Contacted', 'Qualified', 'Converted', 'Lost'
  ];

  const filterStyles = 'ps-3 bg-light rounded-lg text-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-200 bg-white shadow-sm transition-all duration-200 hover:border-gray-500';

  return (
    <div
    className="bg-white rounded-top d-flex flex-nowrap align-items-center"
    style={{
      width: "95%", 
      margin: "20px",
      height: "8%",
      justifyContent: "space-between",          }}
  >
          <div className="flex gap-7 items-equal p-4">
        {/* Industry Type */}
        <select
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className={filterStyles}
          style={{ color: '#6B7280' }}
          placeholder="Industry Type"
        >
          <option value="">Industry Type</option>
          {industryOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

        {/* City */}
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className={filterStyles}
          style={{ color: '#6B7280' }}
          placeholder="City"
        >
          <option value="">City</option>
          {cityOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

        {/* Country/Region */}
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className={filterStyles}
          style={{ color: '#6B7280' }}
          placeholder="Country/Region"
        >
          <option value="">Country/Region</option>
          {countryOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

        {/* Lead Status */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={filterStyles}
          style={{ color: '#6B7280' }}
          placeholder="Lead Status"
        >
          <option value="">Lead Status</option>
          {statusOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>

        {/* Created Date */}
        
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={filterStyles}
            style={{ color: '#6B7280' }}
            placeholder="Created Date"
          />
       
      </div>
    </div>
  );
};

export default Filters;