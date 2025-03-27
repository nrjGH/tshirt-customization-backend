import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './designs.css';

const DesignPage = () => {
  const [designs, setDesigns] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchDesigns();
  }, [page]);

  const fetchDesigns = async () => {
    try {
      const response = await axios.get(
        'https://tshirt-customization-backend.onrender.com/api/v1/designs/public',
        {
          params: { page, limit: 10 },
        }
      );

      const { docs, hasMore } = response.data.data;
      
      if (page === 1) {
        // For first page, just set the designs
        setDesigns(docs);
      } else {
        // For subsequent pages, append new unique designs
        setDesigns(prevDesigns => {
          // Create a Set of existing design IDs
          const existingIds = new Set(prevDesigns.map(d => d._id));
          // Filter out any duplicates from new designs
          const newDesigns = docs.filter(d => !existingIds.has(d._id));
          return [...prevDesigns, ...newDesigns];
        });
      }
      
      setHasMore(hasMore);
    } catch (error) {
      console.error('Failed to fetch designs:', error);
    }
  };

  return (
    <div className="designs-page">
      <div className="designs-grid">
        {designs.map((design) => (
          <div
            key={design._id}
            className="design-card"
            style={{
              backgroundColor: design.color === 'white' ? '#ffffff' : design.color
            }}
          >
            <img 
              src={design.designLink} 
              alt={design.name} 
              className="design-image"
            />
            <div className="design-info">
              <h3 className="design-name">{design.name}</h3>
              <div className="design-details">
                <span>Color: {design.color}</span>
                <span>Likes : {design.likedBy?.length || 0}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {hasMore && (
        <button 
          className="load-more-button"
          onClick={() => setPage(p => p + 1)}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default DesignPage;