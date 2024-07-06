import React from 'react';

const SavedConversations = ({ conversations, loadConversation, deleteConversation, onClose }) => {
  return (
    <div className="saved-conversations">
      <h2>Saved Conversations</h2>
      <button onClick={onClose}>Close</button>
      {conversations.length === 0 ? (
        <p>No saved conversations</p>
      ) : (
        <ul>
          {conversations.map((conversation) => (
            <li key={conversation.id}>
              <span>{conversation.title}</span>
              <button onClick={() => loadConversation(conversation)}>Load</button>
              <button onClick={() => deleteConversation(conversation.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedConversations;