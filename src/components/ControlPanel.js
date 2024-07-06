import React from 'react';

const ControlPanel = ({
  isLeftSide,
  toggleSide,
  showImageUpload,
  setShowImageUpload,
  isDarkMode,
  setIsDarkMode,
  undoLastMessage,
  resetMessages,
  takeScreenshot,
  isReaderScrolling,
  setIsReaderScrolling,
  readerScrollSpeed,
  setReaderScrollSpeed,
  leftName,
  setLeftName,
  rightName,
  setRightName,
  saveConversation,
  setShowSavedConversations,
  customTime,
  updateCustomTime,
  setShowStoryLoader
}) => {
  const handleTimeChange = (e) => {
    const [hours, minutes] = e.target.value.split(':');
    const newTime = new Date(customTime);
    newTime.setHours(hours);
    newTime.setMinutes(minutes);
    updateCustomTime(newTime);
  };

  return (
    <div className="control-panel">
      <button onClick={toggleSide}>
        {isLeftSide ? '◀ Swap to Right' : 'Swap to Left ▶'}
      </button>
      <button onClick={() => setShowImageUpload(!showImageUpload)}>
        {showImageUpload ? '👁️' : '👁️‍🗨️'} Image Upload
      </button>
      <button onClick={() => setIsDarkMode(!isDarkMode)}>
        {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
      <button onClick={undoLastMessage}>↩️ Undo Last</button>
      <button onClick={resetMessages}>🗑️ Reset All</button>
      <button onClick={takeScreenshot}>📷 Screenshot</button>
      <button onClick={() => setIsReaderScrolling(!isReaderScrolling)}>
        {isReaderScrolling ? '⏹️ Stop Auto-scroll' : '▶️ Start Auto-scroll'}
      </button>
      <select 
        value={readerScrollSpeed} 
        onChange={(e) => setReaderScrollSpeed(Number(e.target.value))}
      >
        <option value="1">Slow</option>
        <option value="2">Medium</option>
        <option value="4">Fast</option>
      </select>
      <input 
        value={leftName}
        onChange={(e) => setLeftName(e.target.value)}
        placeholder="Left Name"
      />
      <input 
        value={rightName}
        onChange={(e) => setRightName(e.target.value)}
        placeholder="Right Name"
      />
      <button onClick={saveConversation}>💾 Save Conversation</button>
      <button onClick={() => setShowSavedConversations(true)}>📚 Saved Conversations</button>
      <input
        type="time"
        value={`${customTime.getHours().toString().padStart(2, '0')}:${customTime.getMinutes().toString().padStart(2, '0')}`}
        onChange={handleTimeChange}
      />
          <button onClick={() => setShowStoryLoader(true)}>📚 Load Story</button>

    </div>
  );
};

export default ControlPanel;