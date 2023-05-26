import React, { useState } from 'react'
import { Paper, AvatarGroup, Box, Avatar, Tooltip, Button } from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { GetAvatarFromName } from '../../../CommonComponents/RegisterUserDialog';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

export default function RetroAppBar(props) {
    const [isCopied, setIsCopied] = useState(false);
    const navigate = useNavigate();

    const handleShareButtonClick = () => {
        const fullPath = window.location.href;
        navigator.clipboard.writeText(fullPath)
            .then(() => {
                console.log('Path copied to clipboard:', fullPath);
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 2000);
                // Optionally, you can show a success message to the user
            })
            .catch((error) => {
                console.error('Failed to copy path to clipboard:', error);
                // Optionally, you can show an error message to the user
            });
    }

    const handleHomeButtonClick = () => {
        navigate(`/`, { state: { from: `/retroAppBar` } });
    }

    return (
        <div>
            {
                (props && props.participants) ?
                    <>
                        <Paper elevation={1} sx={{ p: 1, mt: 1, display: 'flex' }}>
                            <Button variant="outlined" onClick={handleHomeButtonClick} endIcon={<ArrowBackIcon />}>
                                Back to Home
                            </Button>
                            {
                                isCopied ?
                                    <Button variant="contained" color="secondary" sx={{marginLeft:'auto'}} onClick={handleShareButtonClick} endIcon={<CheckCircleIcon />}>
                                        Copied!
                                    </Button> :
                                    <Button variant="contained" color="primary" sx={{marginLeft:'auto', textTransform:'capitalize'}} onClick={handleShareButtonClick} endIcon={<GroupAddIcon />}>
                                        Copy Invite  
                                    </Button>
                            }

                        </Paper>
                        <Box sx={{ position: 'fixed', right: '6rem', top: '20%' }}>
                            <AvatarGroup max={props.participants.length > 1 ? props.participants.length : 2} sx={{ writingMode: 'vertical-rl' }}>
                                {
                                    props.participants.map((participant, index) => {
                                        return (
                                            <Tooltip key={index} title={participant.username} placement="left" >
                                                <Avatar key={index} alt={participant.username} src={GetAvatarFromName(participant.username)} />
                                            </Tooltip>
                                        )
                                    })
                                }
                            </AvatarGroup>
                        </Box>

                    </>
                    :
                    <p>App bar</p>
            }
        </div>
    )
}
