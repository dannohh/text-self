import logo from './logo.svg';
import './App.css';
import { useState, useRef, useEffect } from 'react';
import ConvoDisplay from './components/ConvoDisplay';
import TextForm from './components/TextForm';
import BatteryCharging20Icon from '@mui/icons-material/BatteryCharging20';
import BatteryCharging20 from '@mui/icons-material/BatteryCharging20';
import Battery6BarIcon from '@mui/icons-material/Battery6Bar';
import FiveGIcon from '@mui/icons-material/FiveG';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import SignalCellularAlt2BarIcon from '@mui/icons-material/SignalCellularAlt2Bar';
import { SelectUnstyledContext } from '@mui/base';
import * as htmlToImage from 'html-to-image'
import html2canvas from 'html2canvas';
import { FaBeer } from 'react-icons/fa'
import { getNativeSelectUtilityClasses } from '@mui/material';
import {IoBatteryChargingOutline} from "react-icons/io5";
import Viewer from './components/Viewer';


function App() {

  const [message, setMessage] = useState(null)
  const [isSender, setIsSender] = useState(true)
  const [messages, setMessages] = useState([])
  const time = new Date().toLocaleTimeString().slice(0,4);
  const [user, setUser] = useState("(636) 234-4679")
  const [bat, setBat] = useState('charging')
  const [signal, setSignal] = useState('three')
  const [undone, setUndone] = useState('false')


  const domEl = useRef(null);
  const downloadImage = async () => {
    html2canvas(domEl.current).then(function(canvas) {
    var link = document.createElement('a');
    link.download = 'filename.png';
    link.href = canvas.toDataURL()
    console.log(link.href)
    link.click();    
    });
  };
  
  const undoLast = () => {
    setUndone(!undone)
    let tempArray = messages
    tempArray.pop()
    setMessage('')
    setMessages(tempArray)
  }
  const handleChange = (e) => {
    console.log(message)
    setMessage(e.target.value)
    
  }

  const handleCheck = (e) => {
    e.target.checked === false ? setIsSender(true) : setIsSender(false)
    console.log(isSender)
  }

  const handleSubmit = () => {
    let newMessage = {sender: isSender, body: message}
    setMessages([...messages, newMessage])
    console.log(messages)
    setMessage('')
  }

  const handleBat = () => {
    bat === 'charging' ? setBat('full'): setBat('charging')
  }
  const handleSig = () => {
    signal === 'three' ? setSignal('two'): setSignal('three')
  }
  const picFileRef = useRef(null)


  const picHandler = () => {
    const data = new FormData()
    data.append("file", picFileRef.current.files[0])
    data.append("upload_preset", "wrs8strf")
    data.append("cloud_name","dannohh")
    fetch("https://api.cloudinary.com/v1_1/dannohh/image/upload",{
    method:"post",
    body: data
}).then(res => res.json()).then(json => setMessages([...messages, {sender: isSender, body: json.url}]))
  }

  return (
    <div className="app" id='domEl' ref={domEl}>

      <div className="topBar" >
       <input className="time" />
        <div className='rightSideIcons'>
          <span>
            <FiveGIcon style={{height: "15px", marginTop: "2px"}}/>
          </span>
          <span className="signal" onClick={handleSig}>
            {signal === 'three' ? 
            <SignalCellularAltIcon style={{height: "13px", marginBottom: "2px"}}/> :
            <SignalCellularAlt2BarIcon style={{height: "13px", marginBottom: "2px"}} />
             }
          </span>
          <span 
            className='battery' 
            onClick={handleBat}>
            {bat === "charging" ? 
            <IoBatteryChargingOutline style={{height: "15px", marginTop: "2px"}}/> : 
            <Battery6BarIcon style={{ height: "15px", marginTop: "2px"}}/>}
          </span>
        </div>
      </div>
      <ConvoDisplay messages={messages} user={user}/>
      <TextForm handleChange={handleChange} handleSubmit={handleSubmit} handleCheck={handleCheck} isSender={isSender}/>
      <button 
       className="logDownload" onClick={undoLast}></button>
      <button className="logDownload" onClick={downloadImage}></button>
      <input type='file' onChange={picHandler} ref={picFileRef}/>
             {/* <Viewer messages={messages} time={time}/> */}
    </div>
  );
}

export default App;
