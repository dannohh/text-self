import React, { useState } from 'react';

const StoryLoader = ({ onLoadStory }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleLoadStory = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const story = JSON.parse(e.target.result);
          onLoadStory(story);
        } catch (error) {
          console.error('Error parsing JSON:', error);
          alert('Error loading story. Please make sure it\'s a valid JSON file.');
        }
      };
      reader.readAsText(selectedFile);
    }
  };

  return (
    <div className="story-loader">
      <input type="file" accept=".json" onChange={handleFileChange} />
      <button onClick={handleLoadStory} disabled={!selectedFile}>
        Load Story
      </button>
    </div>
  );
};

export default StoryLoader;