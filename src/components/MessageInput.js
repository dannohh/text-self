import React, { useState, useRef, useEffect } from 'react';
import { FaArrowUp } from "react-icons/fa";

const MessageInput = ({ onSend, isLeftSide, showImageUpload }) => {
  const [newMessage, setNewMessage] = useState('');
  const [color, setColor] = useState('gray');
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
    setColor(isLeftSide ? '#d9d9de' : '#3fb4ff');
  }, [isLeftSide]);

  const handleSend = () => {
    if (newMessage.trim()) {
      onSend(newMessage);
      setNewMessage('');
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => onSend(e.target.result, true);
      reader.readAsDataURL(file);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <form 
      className="textForm"
      onSubmit={(e) => {
        e.preventDefault();
        handleSend();
      }}
    >
      <label htmlFor="box" style={{background: color}} className="checked"></label>   
      <input id="box" type="checkbox" checked={!isLeftSide} onChange={() => {}} style={{display: 'none'}} />
      
      <input 
        ref={inputRef}
        className="textBox" 
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type a message..."
      />
      <button type="submit" className="sendButton">
        <FaArrowUp />
      </button>
      {showImageUpload && (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
          <button type="button" onClick={() => fileInputRef.current?.click()}>
            📷
          </button>
        </>
      )}
    </form>
  );
};

export default MessageInput;