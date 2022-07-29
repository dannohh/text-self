import { colorChannel } from "@mui/system";
import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const TextForm = (props) => {

    const [color, setColor] = useState('gray')

    useEffect(() => {
        if(props.isSender === true) {
            setColor('#d9d9de')
        } else {
            setColor('#3fb4ff')
        }
    },[props.isSender])
   const inputRef = useRef(null)
   useEffect(() => {
    inputRef.current.focus()
   },[props.messages])
    return (
    <form 
        className="textForm"
        onSubmit={(e) => {
            e.preventDefault()
            inputRef.current.value = ""
            props.handleSubmit()
        }}>
        <label htmlFor="box" style={{background: color}} className="checked"></label>   
      <input id="box" type="checkbox" onClick={props.handleCheck}/>
      
      <input ref={inputRef} className="textBox" onChange={props.handleChange}/> <button className="sendButton"><FaArrowUp /></button>       
    </form>
    )
}
export default TextForm