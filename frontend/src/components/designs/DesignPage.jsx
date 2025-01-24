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

  // Fetch public designs
  const fetchDesigns = async () => {
    try {
      const response = await axios.get(`https://tshirt-customization-backend.onrender.com/api/v1/designs/public`, {
        params: { page, limit: 10 },
      });

      const { docs, hasMore } = response.data.data;
      setDesigns(docs); // Set designs directly instead of appending
      setHasMore(hasMore);
    } catch (error) {
      console.error('Failed to fetch designs:', error);
    }
  };

  return (
    <div className="designs-page">
      {designs.map((design) => (
        // code updated here: added unique key prop and updated design details
        <div key={design._id} className="design-card">
          <h2>{design.name}</h2>
          <img src={design.designLink} alt={design.name} />
          <p>Color: {design.color}</p>
          {/* <p>Created By: {design.createdBy}</p> */} {/* create functionality to show username of account that created this design */}
          <p>Likes: {design.likedBy.length}</p>
        </div>
      ))}
      {hasMore && (
        <button onClick={() => setPage((prevPage) => prevPage + 1)}>
          Load More
        </button>
      )}
    </div>
  );
};

export default DesignPage;