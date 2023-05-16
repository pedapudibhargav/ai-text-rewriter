import React from 'react'
import Board from './components/Board'
import { useParams } from "react-router-dom";

export default function RetroTool(props) {
  const { roomId } = useParams();

  return (
    <>
      {
        props.currentUserDetails ?
          <Board roomId={roomId} currentUserDetails={props.currentUserDetails} /> :
          null
      }
    </>
  )
}