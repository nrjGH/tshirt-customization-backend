import React, { useState } from 'react';
import './design.css';

const DesignToolPage = () => {
  const [color, setColor] = useState('white');
  const [design, setDesign] = useState('');
  const [name, setName] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [previewImage, setPreviewImage] = useState(''); // State for fetched image

  const handleFetchImage = () => {
    setPreviewImage(design); // Set the fetched image as the preview
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ color, design, name, isPublic });
  };

  return (
    <div className="design-container">
      <h1 className="design-title">Design Your Shirt</h1>
      <div className="design-grid">
        <div>
          <form onSubmit={handleSubmit} className="design-form">
            <div className="form-group">
              <label htmlFor="color">Shirt Color</label>
              <select
                id="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="Select color of your shirt"
                className="design-select"
              >
                <option value="white" className="design-select-text">White</option>
                <option value="black" className="design-select-text">Black</option>
                <option value="red" className="design-select-text">Red</option>
                <option value="#FFD1DC" className="design-select-text">Pastel Pink</option>
                <option value="#AEC6CF" className="design-select-text">Pastel Blue</option>
                <option value="#77DD77" className="design-select-text">Pastel Green</option>
                <option value="#FDFD96" className="design-select-text">Pastel Yellow</option>
                <option value="#C3B1E1" className="design-select-text">Pastel Purple</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="design">Upload Design</label>
              <input
                id="design"
                type="text"
                value={design}
                onChange={(e) => setDesign(e.target.value)}
                placeholder="Public URL of image"
                className="design-input"
              />
              <button
                type="button"
                className="fetch-button"
                onClick={handleFetchImage}
              >
                Fetch
              </button>
            </div>
            <div className="form-group">
              <label htmlFor="name">Design Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter design name"
                className="design-input"
              />
            </div>
            <div className="form-group switch-group">
              <label htmlFor="public">Make design public</label>
              <input
                id="public"
                type="checkbox"
                checked={isPublic}
                onChange={() => setIsPublic(!isPublic)}
                className="design-switch"
              />
            </div>
            <button type="submit" className="design-button">
              Save Design
            </button>
          </form>
        </div>
        <div className="design-preview">
          <div
            className="preview-box"
            style={{
              backgroundColor:
              color === 'white' ? '#ffffff' : color.startsWith('pastel') ? `var(--color-${color})` : color, 
            }}
          >
            {previewImage ? (
              <img
                src={previewImage}
                alt="Design Preview"
                className="preview-image"
              />
            ) : (
              <p className="preview-placeholder">Design Preview</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignToolPage;