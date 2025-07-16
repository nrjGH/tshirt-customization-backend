import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './design.css';
import { useNavigate } from 'react-router-dom';
import { GoogleGenAI, Modality } from "@google/genai";

const DesignToolPage = () => {
  const [color, setColor] = useState('white');
  const [design, setDesign] = useState('');
  const [name, setName] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [profile, setProfile] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
  const CLOUDINARY_CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const CLOUDINARY_UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
  const [imageCode, setImageCode] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          // 'http://localhost:8000/api/v1/users/verify',
          'https://tshirt-customization-backend.onrender.com/api/v1/users/verify',
          {
          withCredentials: true
        });
        console.log(response)
        if (response.data.statusCode === 200) {
          setProfile(response.data.data.user);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        navigate('/login');
      }
    };
  
    fetchUserData();
  }, [navigate]);

  // Cleanup blob URLs on component unmount
  useEffect(() => {
    return () => {
      if (design && design.startsWith('blob:')) {
        URL.revokeObjectURL(design);
      }
    };
  }, [design]);

  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      alert('Please enter a prompt to generate an image');
      return;
    }

    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});
      
      const instructions = "Create a standalone digital art graphic with a clean, centralized composition. The design should have a high-impact, bold, and graphic feel.The image must not include the outline of a t-shirt or any clothing.For any humans or animals in the design, hyperrealism is not expected. They should be rendered in a semi-realistic, or abstract style.Focus on bold, clean lines and a limited but vibrant color palette. Use flat colors without complex shadows or photorealistic textures. The design should have a modern, minimalist feel while having an eye catching and attractive design.";
      const contents = instructions + prompt;

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-preview-image-generation",
        contents: contents,
        config: {
          responseModalities: [Modality.TEXT, Modality.IMAGE],
        },
      });

      if (response.candidates && response.candidates.length > 0) {
        const base64Code = response.candidates[0]?.content?.parts[1]?.inlineData?.data;

        if (base64Code) {
          // Clean up previous blob URL if it exists
          if (design && design.startsWith('blob:')) {
            URL.revokeObjectURL(design);
          }
          
          // Convert base64 to blob URL for display
          const binaryString = atob(base64Code);
          const bytes = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
          const blob = new Blob([bytes], { type: 'image/png' });
          const imageUrl = URL.createObjectURL(blob);
          console.log('Generated Image URL:', imageUrl);
          
          setDesign(imageUrl);
          setPreviewImage(imageUrl);
          setImageCode(base64Code);
        }
      }
    } catch (error) {
      console.error('Failed to generate image:', error);
      alert('Failed to generate image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const uploadToCloudinary = async (imageData, isBase64 = false) => {
    try {
      if (isBase64) {
        // For base64 data from AI generation
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            file: `data:image/png;base64,${imageData}`,
            upload_preset: CLOUDINARY_UPLOAD_PRESET,
          }
        );
        return response.data.secure_url;
      } else if (imageData.startsWith('blob:')) {
        // For blob URLs from AI generation
        const response = await fetch(imageData);
        const blob = await response.blob();
        const file = new File([blob], 'ai-generated-design.png', { type: 'image/png' });
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        
        const cloudinaryResponse = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData
        );
        return cloudinaryResponse.data.secure_url;
      } else if (imageData.startsWith('http')) {
        // For external URLs
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            file: imageData,
            upload_preset: CLOUDINARY_UPLOAD_PRESET,
          }
        );
        return response.data.secure_url;
      }
      return imageData;
    } catch (error) {
      console.error('Cloudinary upload failed:', error);
      throw new Error('Failed to upload image to Cloudinary');
    }
  };

  const handleFetchImage = () => {
    setPreviewImage(design);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!design) {
      alert('Please generate or upload a design first');
      return;
    }

    if (!name.trim()) {
      alert('Please enter a design name');
      return;
    }

    setIsSaving(true);
    try {
      let cloudinaryUrl = design;
      
      // Upload to Cloudinary first
      console.log('Uploading to Cloudinary...');
      
      if (imageCode && design.startsWith('blob:')) {
        // If we have the base64 code from AI generation, use it directly
        cloudinaryUrl = await uploadToCloudinary(imageCode, true);
      } else {
        // For other cases (blob URLs or external URLs)
        cloudinaryUrl = await uploadToCloudinary(design, false);
      }
      
      console.log('Cloudinary upload successful:', cloudinaryUrl);

      // Save design with Cloudinary URL
      const saveResponse = await axios.post(
        'https://tshirt-customization-backend.onrender.com/api/v1/designs/',
        {
          designLink: cloudinaryUrl,
          name,
          isPublic,
          color,
        },
        { withCredentials: true }
      );
      
      console.log('Design saved:', saveResponse.data);
      alert('Design saved successfully!');
      
      // Reset form
      setDesign('');
      setPreviewImage('');
      setName('');
      setPrompt('');
      setImageCode('');
      setIsPublic(false);
      
    } catch (error) {
      console.error('Failed to save design:', error);
      alert('Failed to save design. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

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
            
            {/* AI Image Generation Section */}
            <div className="form-group">
              <label htmlFor="prompt">Describe what's on your mind</label>
              <input
                id="prompt"
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the image you want to generate..."
                className="design-input"
                disabled={isGenerating}
              />
              <button
                type="button"
                className="fetch-button"
                onClick={handleGenerateImage}
                disabled={isGenerating}
              >
                {isGenerating ? 'Generating...' : 'Generate Image'}
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
                disabled={isSaving}
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
                disabled={isSaving}
              />
            </div>
            <button 
              type="submit" 
              className="design-button"
              disabled={isSaving || !design}
            >
              {isSaving ? 'Saving...' : 'Save Design'}
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
                src={design}
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

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './design.css';
// import { useNavigate } from 'react-router-dom';

// const DesignToolPage = () => {
//   const [color, setColor] = useState('white');
//   const [design, setDesign] = useState('');
//   const [name, setName] = useState('');
//   const [isPublic, setIsPublic] = useState(false);
//   const [previewImage, setPreviewImage] = useState('');
//   const [profile, setProfile] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get(
//           // 'http://localhost:8000/api/v1/users/verify',
//           'https://tshirt-customization-backend.onrender.com/api/v1/users/verify',
//           {
//           withCredentials: true
//         });
//         console.log(response)
//         if (response.data.statusCode === 200) {
//           setProfile(response.data.data.user);
//         }
//       } catch (error) {
//         console.error('Auth check failed:', error);
//         navigate('/login');
//       }
//     };
  
//     fetchUserData();
//   }, [navigate]);

//   const handleFetchImage = () => {
//     setPreviewImage(design);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         'https://tshirt-customization-backend.onrender.com/api/v1/designs/',
//         {
//           designLink: design,
//           name,
//           isPublic,
//           color,
//         },
//         { withCredentials: true }
//       );
      
//       console.log('Design saved:', response.data);
//       alert('Design saved successfully!');
//     } catch (error) {
//       console.error('Failed to save design:', error);
//       alert('Failed to save design');
//     }
//   };

//   if (!profile) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="design-container">
//       <h1 className="design-title">Design Your Shirt</h1>
//       <div className="design-grid">
//         <div>
//           <form onSubmit={handleSubmit} className="design-form">
//             <div className="form-group">
//               <label htmlFor="color">Shirt Color</label>
//               <select
//                 id="color"
//                 value={color}
//                 onChange={(e) => setColor(e.target.value)}
//                 placeholder="Select color of your shirt"
//                 className="design-select"
//               >
//                 <option value="white" className="design-select-text">White</option>
//                 <option value="black" className="design-select-text">Black</option>
//                 <option value="red" className="design-select-text">Red</option>
//                 <option value="#FFD1DC" className="design-select-text">Pastel Pink</option>
//                 <option value="#AEC6CF" className="design-select-text">Pastel Blue</option>
//                 <option value="#77DD77" className="design-select-text">Pastel Green</option>
//                 <option value="#FDFD96" className="design-select-text">Pastel Yellow</option>
//                 <option value="#C3B1E1" className="design-select-text">Pastel Purple</option>
//               </select>
//             </div>
//             <div className="form-group">
//               <label htmlFor="design">Upload Design</label>
//               <input
//                 id="design"
//                 type="text"
//                 value={design}
//                 onChange={(e) => setDesign(e.target.value)}
//                 placeholder="Public URL of image"
//                 className="design-input"
//               />
//               <button
//                 type="button"
//                 className="fetch-button"
//                 onClick={handleFetchImage}
//               >
//                 Fetch
//               </button>
//             </div>
//             <div className="form-group">
//               <label htmlFor="name">Design Name</label>
//               <input
//                 id="name"
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Enter design name"
//                 className="design-input"
//               />
//             </div>
//             <div className="form-group switch-group">
//               <label htmlFor="public">Make design public</label>
//               <input
//                 id="public"
//                 type="checkbox"
//                 checked={isPublic}
//                 onChange={() => setIsPublic(!isPublic)}
//                 className="design-switch"
//               />
//             </div>
//             <button type="submit" className="design-button">
//               Save Design
//             </button>
//           </form>
//         </div>
//         <div className="design-preview">
//           <div
//             className="preview-box"
//             style={{
//               backgroundColor:
//               color === 'white' ? '#ffffff' : color.startsWith('pastel') ? `var(--color-${color})` : color, 
//             }}
//           >
//             {previewImage ? (
//               <img
//                 src={design}
//                 alt="Design Preview"
//                 className="preview-image"
//               />
//             ) : (
//               <p className="preview-placeholder">Design Preview</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DesignToolPage;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './design.css';
// import { useNavigate } from 'react-router-dom';
// import { GoogleGenAI, Modality } from "@google/genai";

// const DesignToolPage = () => {
//   const [color, setColor] = useState('white');
//   const [design, setDesign] = useState('');
//   const [name, setName] = useState('');
//   const [isPublic, setIsPublic] = useState(false);
//   const [previewImage, setPreviewImage] = useState('');
//   const [profile, setProfile] = useState(null);
//   const [prompt, setPrompt] = useState('');
//   const [isGenerating, setIsGenerating] = useState(false);
//   const navigate = useNavigate();

//   const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
//   const [imageCode, setImageCode] = useState('');


//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get(
//           // 'http://localhost:8000/api/v1/users/verify',
//           'https://tshirt-customization-backend.onrender.com/api/v1/users/verify',
//           {
//           withCredentials: true
//         });
//         console.log(response)
//         if (response.data.statusCode === 200) {
//           setProfile(response.data.data.user);
//         }
//       } catch (error) {
//         console.error('Auth check failed:', error);
//         navigate('/login');
//       }
//     };
  
//     fetchUserData();
//   }, [navigate]);

//   const handleGenerateImage = async () => {
//     if (!prompt.trim()) {
//       alert('Please enter a prompt to generate an image');
//       return;
//     }

//     setIsGenerating(true);
//     try {
//       const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});
//       // // astronaut floating in space
//       // const response = await ai.models.generateImages({
//       //   model: 'imagen-4.0-generate-preview-06-06',
//       //   prompt: prompt,
//       //   config: {
//       //     numberOfImages: 1,
//       //   },
//       // });

//       // if (response.generatedImages && response.generatedImages.length > 0) {
//       //   const generatedImage = response.generatedImages[0];
//       //   const imgBytes = generatedImage.image.imageBytes;
        
//       //   // Convert base64 to blob URL for display
//       //   const binaryString = atob(imgBytes);
//       //   const bytes = new Uint8Array(binaryString.length);
//       //   for (let i = 0; i < binaryString.length; i++) {
//       //     bytes[i] = binaryString.charCodeAt(i);
//       //   }
//       //   const blob = new Blob([bytes], { type: 'image/png' });
//       //   const imageUrl = URL.createObjectURL(blob);
        
//       //   setDesign(imageUrl);
//       //   setPreviewImage(imageUrl);
//       // }
//       const instructions = "Create a standalone digital art graphic with a clean, centralized composition. The design should have a high-impact, bold, and graphic feel.The image must not include the outline of a t-shirt or any clothing.For any humans or animals in the design, hyperrealism is not expected. They should be rendered in a semi-realistic, or abstract style.Focus on bold, clean lines and a limited but vibrant color palette. Use flat colors without complex shadows or photorealistic textures. The design should have a modern, minimalist feel while having an eye catching and attractive design.";
//       const contents = instructions + prompt;

//   // Set responseModalities to include "Image" so the model can generate  an image
//   const response = await ai.models.generateContent({
//     model: "gemini-2.0-flash-preview-image-generation",
//     contents: contents,
//     config: {
//       responseModalities: [Modality.TEXT, Modality.IMAGE],
//     },
//   });
//   // console.log('Response:', response);
//   for (const part of response.candidates[0].content.parts) {
//     // Based on the part type, either show the text or save the image
//     if (part.text) {
//       // console.log(part.text);
//     } else if (part.inlineData) {
//       const imageData = part.inlineData.data;
//       // const buffer = Buffer.from(imageData, "base64");
//       // fs.writeFileSync("gemini-native-image.png", buffer);
//       // console.log("Image saved as gemini-native-image.png ", imageData);
//     }
//   }
//         if (response.candidates && response.candidates.length > 0) {
//         const base64Code = response.candidates[0]?.content?.parts[1]?.inlineData?.data;

        
//         // // Convert base64 to blob URL for display
//         const binaryString = atob(base64Code);
//         const bytes = new Uint8Array(binaryString.length);
//         for (let i = 0; i < binaryString.length; i++) {
//           bytes[i] = binaryString.charCodeAt(i);
//         }
//         // console.log('imgBytes: ',imgBytes)
//         const blob = new Blob([bytes], { type: 'image/png' });
//         const imageUrl = URL.createObjectURL(blob);
//         console.log('Generated Image URL:', imageUrl);
        
//         setDesign(imageUrl);
//         setPreviewImage(imageUrl);
//         setImageCode(base64Code);
//       }
//     } catch (error) {
//       console.error('Failed to generate image:', error);
//       alert('Failed to generate image. Please try again.');
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleFetchImage = () => {
//     setPreviewImage(design);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         'https://tshirt-customization-backend.onrender.com/api/v1/designs/',
//         {
//           designLink: design,
//           name,
//           isPublic,
//           color,
//         },
//         { withCredentials: true }
//       );
      
//       console.log('Design saved:', response.data);
//       alert('Design saved successfully!');
//     } catch (error) {
//       console.error('Failed to save design:', error);
//       alert('Failed to save design');
//     }
//   };

//   if (!profile) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="design-container">
//       <h1 className="design-title">Design Your Shirt</h1>
//       <div className="design-grid">
//         <div>
//           <form onSubmit={handleSubmit} className="design-form">
//             <div className="form-group">
//               <label htmlFor="color">Shirt Color</label>
//               <select
//                 id="color"
//                 value={color}
//                 onChange={(e) => setColor(e.target.value)}
//                 placeholder="Select color of your shirt"
//                 className="design-select"
//               >
//                 <option value="white" className="design-select-text">White</option>
//                 <option value="black" className="design-select-text">Black</option>
//                 <option value="red" className="design-select-text">Red</option>
//                 <option value="#FFD1DC" className="design-select-text">Pastel Pink</option>
//                 <option value="#AEC6CF" className="design-select-text">Pastel Blue</option>
//                 <option value="#77DD77" className="design-select-text">Pastel Green</option>
//                 <option value="#FDFD96" className="design-select-text">Pastel Yellow</option>
//                 <option value="#C3B1E1" className="design-select-text">Pastel Purple</option>
//               </select>
//             </div>
            
//             {/* New AI Image Generation Section */}
//             <div className="form-group">
//               <label htmlFor="prompt">Describe what's on your mind</label>
//               <input
//                 id="prompt"
//                 type="text"
//                 value={prompt}
//                 onChange={(e) => setPrompt(e.target.value)}
//                 placeholder="Describe the image you want to generate..."
//                 className="design-input"
//               />
//               <button
//                 type="button"
//                 className="fetch-button"
//                 onClick={handleGenerateImage}
//                 disabled={isGenerating}
//               >
//                 {isGenerating ? 'Generating...' : 'Generate Image'}
//               </button>
//             </div>
            
//             {/* <div className="form-group">
//               <label htmlFor="design">Upload Design</label>
//               <input
//                 id="design"
//                 type="text"
//                 value={design}
//                 onChange={(e) => setDesign(e.target.value)}
//                 placeholder="Public URL of image"
//                 className="design-input"
//               />
//               <button
//                 type="button"
//                 className="fetch-button"
//                 onClick={handleFetchImage}
//               >
//                 Fetch
//               </button>
//             </div> */}
//             <div className="form-group">
//               <label htmlFor="name">Design Name</label>
//               <input
//                 id="name"
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Enter design name"
//                 className="design-input"
//               />
//             </div>
//             <div className="form-group switch-group">
//               <label htmlFor="public">Make design public</label>
//               <input
//                 id="public"
//                 type="checkbox"
//                 checked={isPublic}
//                 onChange={() => setIsPublic(!isPublic)}
//                 className="design-switch"
//               />
//             </div>
//             <button type="submit" className="design-button">
//               Save Design
//             </button>
//           </form>
//         </div>
//         <div className="design-preview">
//           <div
//             className="preview-box"
//             style={{
//               backgroundColor:
//               color === 'white' ? '#ffffff' : color.startsWith('pastel') ? `var(--color-${color})` : color, 
//             }}
//           >
//             {previewImage ? (
//               <img
//                 src={design}
//                 alt="Design Preview"
//                 className="preview-image"
//               />
//             ) : (
//               <p className="preview-placeholder">Design Preview</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DesignToolPage;
