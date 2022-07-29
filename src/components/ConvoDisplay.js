import { useEffect, useState } from "react";
import React from "react";
import { FaBatteryFull } from 'react-icons/fa'
import { FaUser } from "react-icons/fa";
import { useRef } from "react";


const ConvoDisplay = (props) => {
    const scrollRef = useRef(null)
    let index = 0;
    const scrollToBottom = () => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"})
    }
    useEffect(() => {
        scrollToBottom()
    },[props.messages])
    return (
        <div className="convoDisplay" >
        <div className="spacer"></div>
        <div className="topUserDisplay">
        <input className="recipientCircle"/>
         <div className="userNameDisplay">{props.user}</div>
         <hr className="line"></hr>
         </div>
         
            {props.messages.map((message) => {
                if(message.body?.startsWith('http', 0)) {
                   return message.sender === true ?<div><div class="userCircle"><FaUser style={{paddingTop: '2px'}}/></div><img className="receiver" src={message.body} alt="none"/></div> : <img className="sender" src={message.body} alt="none" />
                }
                index++
                return message.sender === true ? <div style={{display: "flex", flexDirection: "row"}}><FaUser style={{paddingRight: '3px', paddingTop: '6px'}} /><div className="card receiver" key={index}>{message.body}</div></div> : <div className="card sender gray">{message.body}</div>
                
            })}
                <div ref={scrollRef}></div>
        </div>
    )
}

export default ConvoDisplay