import React, { useState } from 'react';
import axios from 'axios';
import SearchResult from './components/SearchResult';
import DetailedView from './components/DetailedView';

const apiKey = '87286863-5796-45a2-b45c-1301f4468f63';
const apiUrl = 'https://api.metaphor.systems';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [query, setQuery] = useState(''); // Added state for query

  const handleSearch = async () => {
    const options = {
      query,
      numResults: 5,
      type: 'neural',
      useAutoprompt: true,
    };

    axios
      .post(`${apiUrl}/search`, options, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  const handleResultClick = (title, publishedDate, content) => {
    setSelectedResult({ title, publishedDate, content });
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
      <div className="row">
        {searchResults.map((result, index) => (
          <div key={index} className="col-md-4">
            <SearchResult
              title={result.title}
              publishedDate={result.publishedDate}
              content={result.extract}
              onResultClick={handleResultClick}
            />
          </div>
        ))}
      </div>
      {selectedResult && (
        <DetailedView
          title={selectedResult.title}
          publishedDate={selectedResult.publishedDate}
          content={selectedResult.content}
          onClose={handleCloseDetailedView}
        />
      )}
    </div>
  );
};

export default App;
