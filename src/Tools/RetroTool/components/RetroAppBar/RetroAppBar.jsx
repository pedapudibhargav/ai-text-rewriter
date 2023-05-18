import React, { useState } from 'react'
import { Paper, AvatarGroup, Box, Avatar, Tooltip, Button } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function RetroAppBar(props) {
    const [isCopied, setIsCopied] = useState(false);

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

    return (
        <div>
            {
                (props && props.participants) ?
                    <>
                        <Paper elevation={1} sx={{ p: 1, mt: 1 }}>
                            {
                                isCopied ?
                                    <Button variant="outlined" onClick={handleShareButtonClick} endIcon={<CheckCircleIcon />}>
                                        Copied! 
                                    </Button> :
                                    <Button variant="outlined" onClick={handleShareButtonClick} endIcon={<ShareIcon />}>
                                        Share
                                    </Button>
                            }

                        </Paper>
                        <Box sx={{ position: 'fixed', right: '6rem', top: '20%' }}>
                            <AvatarGroup max={props.participants.length > 1 ? props.participants.length : 2} sx={{ writingMode: 'vertical-rl' }}>
                                {
                                    props.participants.map((participant, index) => {
                                        return (
                                            <Tooltip title={participant.username} placement="left" >
                                                <Avatar key={index} alt={participant.username} src={`https://source.boringavatars.com/beam/600/${participant.username}?&colors=0D8BD9,0FB2F2,41C0F2,77CFF2,BDE3F2`} />
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
