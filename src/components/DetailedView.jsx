import React from 'react';
import DOMPurify from 'dompurify';

const DetailedView = ({ title, publishedDate, content, onClose }) => {
  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <div className="detailed-view p-4">
      <button className="btn btn-primary mb-3" onClick={onClose}>
        Close
      </button>
      <h2>{title}</h2>
      <p className="text-muted">Published Date: {publishedDate}</p>
      <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
    </div>
  );
};

export default DetailedView;
