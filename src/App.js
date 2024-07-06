import React, { useState, useRef, useEffect } from 'react';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import ColorSchemeSelector from './components/ColorSchemeSelector';
import ControlPanel from './components/ControlPanel';
import PhoneFrame from './components/PhoneFrame';
import SavedConversations from './components/SavedConversations';
import StoryLoader from './components/StoryLoader';
import StoryReader from './components/StoryReader';
import useAutoScroll from './hooks/useAutoScroll';
import { colorSchemes } from './utils/colorSchemes';
import { takeScreenshot } from './utils/helpers';
import './App.css';

// Import Material-UI icons
import BatteryCharging20Icon from '@mui/icons-material/BatteryCharging20';
import Battery6BarIcon from '@mui/icons-material/Battery6Bar';
import FiveGIcon from '@mui/icons-material/FiveG';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import SignalCellularAlt2BarIcon from '@mui/icons-material/SignalCellularAlt2Bar';

// Import any other necessary libraries
import { IoBatteryChargingOutline } from "react-icons/io5";

function App() {
  const [messages, setMessages] = useState([]);
  const [isLeftSide, setIsLeftSide] = useState(true);
  const [colorScheme, setColorScheme] = useState('default');
  const [leftName, setLeftName] = useState('L');
  const [rightName, setRightName] = useState('R');
  const [showImageUpload, setShowImageUpload] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [savedConversations, setSavedConversations] = useState([]);
  const [showSavedConversations, setShowSavedConversations] = useState(false);
  const [bat, setBat] = useState('charging');
  const [signal, setSignal] = useState('three');
  const [customTime, setCustomTime] = useState(new Date());
  const [showStoryLoader, setShowStoryLoader] = useState(false);
  const [isReaderMode, setIsReaderMode] = useState(false);
  
  const phoneRef = useRef(null);
  const messageContainerRef = useRef(null);
  const { isReaderScrolling, setIsReaderScrolling, readerScrollSpeed, setReaderScrollSpeed } = useAutoScroll(messageContainerRef);

  const addMessage = (text, isImage = false) => {
    if (text.trim() !== '') {
      setMessages(prevMessages => [...prevMessages, { text, isLeft: isLeftSide, isImage, timestamp: new Date() }]);
    }
  };

  const toggleSide = () => setIsLeftSide(prev => !prev);
  const undoLastMessage = () => setMessages(prev => prev.slice(0, -1));
  const resetMessages = () => setMessages([]);

  const saveConversation = () => {
    const newConversation = {
      id: Date.now(),
      title: `Conversation ${savedConversations.length + 1}`,
      messages,
      leftName,
      rightName,
    };
    setSavedConversations(prev => [...prev, newConversation]);
  };

  const loadConversation = (conversation) => {
    setMessages(conversation.messages);
    setLeftName(conversation.leftName);
    setRightName(conversation.rightName);
    setShowSavedConversations(false);
  };

  const deleteConversation = (id) => {
    setSavedConversations(prev => prev.filter(conv => conv.id !== id));
  };

  const handleBat = () => {
    setBat(prev => prev === 'charging' ? 'full' : 'charging');
  };

  const handleSig = () => {
    setSignal(prev => prev === 'three' ? 'two' : 'three');
  };

  const updateCustomTime = (newTime) => {
    setCustomTime(newTime);
  };

  const handleLoadStory = (story) => {
    setMessages(story.messages.map(msg => ({
      ...msg,
      isLeft: msg.sender === 'left'
    })));
    setLeftName(story.leftName);
    setRightName(story.rightName);
    setShowStoryLoader(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        setIsLeftSide(true);
      } else if (event.key === 'ArrowRight') {
        setIsLeftSide(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={`app ${isDarkMode ? 'dark' : ''}`}>
      <div className="main-content">
        <PhoneFrame ref={phoneRef}>
          <div className="phone-content">
            <div className="topBar">
              <div className="statusBar">
                <div className="leftIcons">
                  <span className="time">{customTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div className="centerNotch"></div>
                <div className="rightIcons">
                  <span className="icon">
                    <FiveGIcon style={{fontSize: "16px"}}/>
                  </span>
                  <span className="icon signal" onClick={handleSig}>
                    {signal === 'three' ? 
                    <SignalCellularAltIcon style={{fontSize: "16px"}}/> :
                    <SignalCellularAlt2BarIcon style={{fontSize: "16px"}} />
                    }
                  </span>
                  <span className="icon battery" onClick={handleBat}>
                    {bat === "charging" ? 
                    <IoBatteryChargingOutline style={{fontSize: "18px"}}/> : 
                    <Battery6BarIcon style={{fontSize: "18px"}}/>}
                  </span>
                </div>
              </div>
              </div>
  {isReaderMode ? (
    <StoryReader 
      colorScheme={colorSchemes[colorScheme]}
    />
  ) : (
    <>
      <div className="userInfo">
        <div className="recipientCircle">
          {isLeftSide ? leftName : rightName}
        </div>
        <div className="userNameDisplay">
          {isLeftSide ? leftName : rightName}
        </div>
      </div>
      <div className="separator"></div>
      <MessageList 
        messages={messages} 
        colorScheme={colorSchemes[colorScheme]} 
        containerRef={messageContainerRef}
        customTime={customTime}
        leftName={leftName}
      />
      <MessageInput 
        key={isLeftSide ? 'left' : 'right'}
        onSend={addMessage} 
        isLeftSide={isLeftSide}
        showImageUpload={showImageUpload}
      />
    </>
  )}
</div>
        </PhoneFrame>
        <div className="control-panel">
          <ColorSchemeSelector value={colorScheme} onChange={setColorScheme} />
          <ControlPanel
            isLeftSide={isLeftSide}
            toggleSide={toggleSide}
            showImageUpload={showImageUpload}
            setShowImageUpload={setShowImageUpload}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            undoLastMessage={undoLastMessage}
            resetMessages={resetMessages}
            takeScreenshot={() => takeScreenshot(phoneRef)}
            isReaderScrolling={isReaderScrolling}
            setIsReaderScrolling={setIsReaderScrolling}
            readerScrollSpeed={readerScrollSpeed}
            setReaderScrollSpeed={setReaderScrollSpeed}
            leftName={leftName}
            setLeftName={setLeftName}
            rightName={rightName}
            setRightName={setRightName}
            saveConversation={saveConversation}
            setShowSavedConversations={setShowSavedConversations}
            customTime={customTime}
            updateCustomTime={updateCustomTime}
            setShowStoryLoader={setShowStoryLoader}
          />
          <button onClick={() => setIsReaderMode(!isReaderMode)}>
            {isReaderMode ? 'Switch to Chat Simulator' : 'Switch to Story Reader'}
          </button>
        </div>
      </div>
      {showSavedConversations && (
        <SavedConversations
          conversations={savedConversations}
          loadConversation={loadConversation}
          deleteConversation={deleteConversation}
          onClose={() => setShowSavedConversations(false)}
        />
      )}
      {showStoryLoader && (
        <StoryLoader
          onLoadStory={handleLoadStory}
          onClose={() => setShowStoryLoader(false)}
        />
      )}
    </div>
  );
}

export default App;