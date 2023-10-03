import React from 'react';

const SearchResult = ({ title, publishedDate, id, onResultClick }) => {
  return (
    <div className="search-result p-3 mb-3 bg-light border rounded">
      <h3>{title}</h3>
      <p className="text-muted">Published Date: {publishedDate}</p>
      <button
        className="btn btn-primary"
        onClick={() => onResultClick(title, publishedDate, id)}
      >
        View Details
      </button>
    </div>
  );
};

export default SearchResult;
