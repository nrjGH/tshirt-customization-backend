import { useState, useEffect } from 'react';
import axios from 'axios';

const DesignsPage = () => {
  const [designs, setDesigns] = useState([]); // Designs data from the backend
  const [page, setPage] = useState(1); // Pagination state
  const [hasMore, setHasMore] = useState(true); // Check for more designs

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
      setDesigns((prevDesigns) => [...prevDesigns, ...docs]);
      setHasMore(hasMore);
    } catch (error) {
      console.error('Failed to fetch designs:', error);
    }
  };

  return (
    <div className="designs-page">
      <h1 className="designs-title">Public Designs</h1>
      <div className="designs-grid">
        {designs.map((design) => (
          <div key={design._id} className="design-card">
            <img
              src={design.designLink || '/placeholder.svg'}
              alt={design.name}
              className="design-image"
            />
            <h2 className="design-name">{design.name}</h2>
            <p className="design-color">Color: {design.color}</p>
          </div>
        ))}
      </div>
      {hasMore && (
        <button className="load-more-button" onClick={() => setPage((prev) => prev + 1)}>
          Load More
        </button>
      )}
    </div>
  );
};

export default DesignsPage;
