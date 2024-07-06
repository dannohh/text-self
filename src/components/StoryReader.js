import React, { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';

const StoryReader = ({ colorScheme }) => {
  const [story, setStory] = useState(null);
  const [displayedMessages, setDisplayedMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [speed, setSpeed] = useState(1); // 1 is normal speed, 0.5 is slow, 2 is fast
  const messageListRef = useRef(null);

  const loadStory = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = JSON.parse(e.target.result);
        setStory(content);
        setDisplayedMessages([]);
        setCurrentMessageIndex(0);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        alert('Error loading story. Please make sure it\'s a valid JSON file.');
      }
    };
    reader.readAsText(file);
  };

  useEffect(() => {
    if (story && currentMessageIndex < story.messages.length) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setDisplayedMessages(prev => [...prev, { ...story.messages[currentMessageIndex], isNew: true }]);
        setIsTyping(false);
        setCurrentMessageIndex(prev => prev + 1);
        
        // Remove the 'isNew' flag after the animation
        setTimeout(() => {
          setDisplayedMessages(prev => 
            prev.map((msg, idx) => idx === prev.length - 1 ? { ...msg, isNew: false } : msg)
          );
        }, 500);
      }, (1500 + Math.random() * 1500) / speed);

      return () => clearTimeout(timer);
    }
  }, [story, currentMessageIndex, speed]);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [displayedMessages]);

  const TypingIndicator = ({ isLeft }) => (
    <div className={`message-bubble ${isLeft ? 'left' : 'right'}`}>
      <div className={`message-content typing-indicator ${isLeft ? 'left' : 'right'}`}>
        <span>.</span><span>.</span><span>.</span>
      </div>
    </div>
  );

  if (!story) {
    return (
      <div className="story-reader">
        <input type="file" accept=".json" onChange={loadStory} />
        <p>Please load a story to begin.</p>
      </div>
    );
  }

  return (
    <div className="story-reader">
      <div className="speed-control">
        <button onClick={() => setSpeed(0.5)} disabled={speed === 0.5}>Slow</button>
        <button onClick={() => setSpeed(1)} disabled={speed === 1}>Normal</button>
        <button onClick={() => setSpeed(2)} disabled={speed === 2}>Fast</button>
      </div>
      <div className="message-list" ref={messageListRef}>
        {displayedMessages.map((message, index) => (
          <MessageBubble
            key={index}
            message={{
              ...message,
              isLeft: message.sender === 'left'
            }}
            colorScheme={colorScheme}
            leftName={story.leftName}
            isNew={message.isNew}
          />
        ))}
        {isTyping && story.messages[currentMessageIndex] && (
          <TypingIndicator isLeft={story.messages[currentMessageIndex].sender === 'left'} />
        )}
      </div>
    </div>
  );
};

export default StoryReader;