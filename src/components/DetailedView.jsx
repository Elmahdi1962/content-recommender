import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import axios from 'axios';
import { API_URL } from '../App';

import './DetailedView.css';

const DetailedView = ({ title, publishedDate, id, url, onClose }) => {
  const [content, setContent] = useState('<p>Loading content...</p>');

  useEffect(() => {
    const getContentById = async () => {
      try {
        const response = await axios.get(`${API_URL}/getContent`, {
          params: { ids: [id] },
        });
        setContent(response.data.contents[0].extract);
      } catch (error) {
        console.error('Error:', error);
        setContent('<p>Failed to retrieve content</p>');
      }
    };

    getContentById();
  }, [id]);

  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>
          {title}
          <a href={url} target="_blank">
            link
          </a>
        </h2>
        <p>Published Date: {publishedDate}</p>
        <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default DetailedView;
