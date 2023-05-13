import React from 'react'
import Board from './components/Board'
import { useParams } from "react-router-dom";
import RegisterUserDialog from '../CommonComponents/RegisterUserDialog';
import { GetUserDetails } from '../Services/UserRegistrationService';

export default function RetroTool() {
  const { roomId } = useParams();

  return (
    <Board roomId={roomId} />
  )
}