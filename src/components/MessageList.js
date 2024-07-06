import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';

const MessageList = ({ messages, colorScheme, containerRef, customTime, leftName }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages]);

  return (
    <div className="message-list" ref={containerRef}>
      {messages.map((message, index) => (
        <MessageBubble 
          key={index} 
          message={message} 
          colorScheme={colorScheme}
          customTime={customTime}
          leftName={leftName}
        />
      ))}
      <div ref={bottomRef} style={{ float: 'left', clear: 'both' }} />
    </div>
  );
};

export default MessageList;