import React, { useState } from 'react';
import axios from 'axios';
import SearchResult from './components/SearchResult';
import DetailedView from './components/DetailedView';
import 'bootstrap/dist/css/bootstrap.min.css';

export const API_URL = 'http://localhost:3001';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const [query, setQuery] = useState(''); // Added state for query

  const handleSearch = async () => {
    const options = {
      query,
      numResults: 9,
      type: 'neural',
      useAutoprompt: true,
    };

    axios
      .post(`${API_URL}/search`, options, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        setSearchResults(response.data.results);
        setError(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        setError(true);
      });
  };
  const handleResultClick = (title, publishedDate, id, url) => {
    setSelectedResult({ title, publishedDate, id, url });
  };

  const handleCloseDetailedView = () => {
    setSelectedResult(null);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Content Recommender</h1>
      <div className="row mb-4">
        <div className="col-10">
          <input
            type="text"
            className="form-control"
            placeholder="Enter a topic"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="col-2">
          <button className="btn btn-primary btn-block" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      {error && (
        <div className="alert alert-warning" role="alert">
          Something went wrong! please try again.
        </div>
      )}
      <div className="row">
        {searchResults.map((result, index) => (
          <div key={index} className="col-md-4">
            <SearchResult
              title={result.title}
              publishedDate={result.publishedDate}
              id={result.id}
              onResultClick={() =>
                handleResultClick(
                  result.title,
                  result.publishedDate,
                  result.id,
                  result.url
                )
              }
            />
          </div>
        ))}
      </div>
      {selectedResult && (
        <DetailedView
          title={selectedResult.title}
          publishedDate={selectedResult.publishedDate}
          id={selectedResult.id}
          url={selectedResult.url}
          onClose={handleCloseDetailedView}
        />
      )}
    </div>
  );
};

export default App;
