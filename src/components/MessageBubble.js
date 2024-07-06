import React from 'react';

const MessageBubble = ({ message, colorScheme, leftName, isNew }) => {
  const bubbleClass = `message-bubble ${message.isLeft ? 'left' : 'right'} ${isNew ? 'new' : ''}`;
  const contentClass = `message-content ${message.text.length <= 2 ? 'short' : ''}`;
  const bubbleStyle = {
    backgroundColor: message.isLeft ? colorScheme.left : colorScheme.right,
    color: message.isLeft ? colorScheme.leftText : colorScheme.rightText,
  };

  return (
    <div className={bubbleClass}>
      {message.isLeft && (
        <div className="user-icon left-icon">
          {leftName.charAt(0)}
        </div>
      )}
      <div className={contentClass} style={bubbleStyle}>
        {message.isImage ? (
          <img src={message.text} alt="Uploaded content" className="message-image" />
        ) : (
          message.text
        )}
      </div>
    </div>
  );
};

export default MessageBubble;