import React, { useState, useEffect } from 'react'
import Board from './components/Board'
import { useParams } from "react-router-dom";
import RegisterUserDialog from '../CommonComponents/RegisterUserDialog';
import { GetUserDetails } from '../Services/UserRegistrationService';

export default function RetroTool() {
  const { roomId } = useParams();
  const [enableDialog, setEnableDialog] = useState(true);
  const [userDetails, setUserDetails] = useState(GetUserDetails());

  useEffect(() => {
    if (userDetails)
      setEnableDialog(false);
    // setUserDetails(GetUserDetails());
  }, []);

  useEffect(() => {
    userDetails === null || userDetails === undefined ?
      setEnableDialog(true) : setEnableDialog(false);
  }, [userDetails]);

  const registrationCallback = (userDetails) => {
    setUserDetails(userDetails);
  }

  return (
    <div>
      {
        enableDialog ?
          <RegisterUserDialog open={enableDialog} handleClose={() => setEnableDialog(false)} registrationCallback={registrationCallback} /> :
          <Board roomId={roomId} />
      }
    </div>
  )
}