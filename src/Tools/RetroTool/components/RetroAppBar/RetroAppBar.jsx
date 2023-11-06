import React, { useState } from 'react'
import { Paper, Box, Avatar, Button, Typography } from '@mui/material';
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

    const getInitialsFromName = (name) => {
        const nameArray = name.split(' ');
        let initials = '';
        if (nameArray.length > 1) {
            initials = nameArray[0].charAt(0) + nameArray[nameArray.length - 1].charAt(0);
        }
        else {
            initials = nameArray[0].charAt(0);
        }
        return initials.toUpperCase();
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
                                    <Button variant="contained" color="secondary" sx={{ marginLeft: 'auto' }} onClick={handleShareButtonClick} endIcon={<CheckCircleIcon />}>
                                        Copied!
                                    </Button> :
                                    <Button variant="contained" color="primary" sx={{ marginLeft: 'auto', textTransform: 'capitalize' }} onClick={handleShareButtonClick} endIcon={<GroupAddIcon />}>
                                        Copy Invite
                                    </Button>
                            }

                        </Paper>
                        <Box sx={{ position: 'fixed', left: '2rem', top: '20%', textAlign: 'center' }}>
                            <Paper elevation={1} sx={{p: 2}}>
                                <Typography variant="h6" gutterBottom>
                                    Users
                                </Typography>
                                {
                                    props.participants.map((participant, index) => {
                                        return (
                                            <Box sx={{
                                                display: 'flex', flexDirection: 'row', p: 1, m: 0,
                                                bgcolor: 'background.paper',
                                                borderRadius: 1,
                                            }}
                                            >
                                                <Avatar sx={{ mt: 1 }} key={index} alt={participant.username} src={GetAvatarFromName(participant.username)} />
                                                <p style={{ marginLeft: '10px', marginBottom: '10px', textTransform: 'capitalize' }}>{participant.userName}</p>
                                            </Box>

                                        )
                                    })
                                }
                            </Paper>
                        </Box>

                    </>
                    :
                    <p>App bar</p>
            }
        </div>
    )
}
