import React, { useEffect } from 'react'
import Board from './components/Board'
import { useNavigate, useParams } from "react-router-dom";
import { GetRandomNumberFromPSTTime } from '../Services/RandomNumber';
import { GetUserDetails } from '../Services/UserRegistrationService';

export default function RetroTool(props) {
  const { roomId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
      const userDetails = GetUserDetails();
      if(userDetails) {
        console.log('current user:', userDetails);
      } else 
        navigate('/profile', { state: { from: `/` } });
  }, []);

  const getRoomId = () => {
    if (roomId === undefined || roomId === null || roomId === '' || roomId === '0') {
      return GetRandomNumberFromPSTTime();
    }
    return roomId;
  };

  return (
    <>
      {
        GetUserDetails() ?
          <Board roomId={getRoomId()} currentUserDetails={props.currentUserDetails} /> :
          null
      }
    </>
  )
}