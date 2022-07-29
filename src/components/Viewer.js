import { makeStyles } from '@mui/material'
import React, { useEffect } from 'react'
import { useRef } from 'react'


export default function Viewer({messages, time}) {
    const viewerRef = useRef(null)
    useEffect(() => {
 
        viewerRef.current.style.background = 'black'
        viewerRef.current.style.overflow = 'scroll'
    },[messages])

  return (
    <div className="viewer" ref={viewerRef} id="viewerRef">
    <header>
        <p>{time}</p>
    </header>
        {messages.map(message => {
            if(message?.body?.startsWith("http")) {
                return <img height="100" width="100" src={message.body} alt="none"/>
            }
            return <div>{message.body}</div>
        })}
    </div>
  )
}
