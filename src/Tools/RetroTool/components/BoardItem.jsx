import React, { useState } from 'react'
import {
    Card, CardContent, Typography, CardActions, Button, BottomNavigation, BottomNavigationAction, Menu, MenuItem, Paper,
    Badge, Box
} from "@mui/material";
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './BoardItem.css';

export default function BoardItem(props) {
    let boardItem = props.card;
    const [enableBottomNav, setEnableBottomNav] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const votingOptions = ['👍', '👎', '🤐', '🤔'];
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const onMouseEnter = () => {
        setEnableBottomNav(true);
    }

    const onMouseLeave = () => {
        setEnableBottomNav(false);
    }

    const handleVoteSelection = (vote) => {
        props.handleVoteClick(vote);
        handleClose();
    }

    const getVotings = () => {
        // default votes
        const votesObj = {
            '👍': 0,
            '👎': 0,
            '🤐': 0,
            '🤔': 0
        }
        // get all votes from the current card
        const votersIn = boardItem.votes ? boardItem.votes : [];
        // count the votes from votersIn array
        votersIn.forEach((vote) => {
            votesObj[vote.vote]++;
        });

        // Build Badges and return them
        return (
            Object.entries(votesObj).map(([key, value]) => {
                return (
                    value ?
                        <Badge badgeContent={value} key={key} color="primary" sx={{ mx: 0.5 }}>
                            <span style={{ fontSize: '1.25rem' }}>{key}</span>
                        </Badge> : null
                )
            })
        )

    }

    return (
        <>
            <Card sx={{ minWidth: 275 }} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} >
                <CardContent>
                    <Typography variant="body2">
                        {boardItem.content}
                    </Typography>
                    <Box sx={{ width: '100%', mt: 2 }}>
                        {getVotings()}
                    </Box>
                </CardContent>
                <CardActions sx={{ position: 'relative' }}>
                    <Paper sx={{ position: 'absolute', zIndex: 2, bottom: 0, left: 0, right: 0, opacity: enableBottomNav ? 1 : 0 }} elevation={3}>
                        <BottomNavigation showlabels o sx={{ width: '100%' }}>
                            <BottomNavigationAction id="btn-vote" label="Vote" icon={<ThumbsUpDownIcon />}
                                aria-controls={open ? 'basic-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick} />
                            <Menu className="vote-menu" anchorEl={anchorEl} open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'btn-vote',
                                }}
                            >
                                {
                                    votingOptions.map((option, index) => {
                                        return (
                                            <MenuItem key={index} onClick={() => handleVoteSelection(option)}>
                                                {
                                                    props.userVote && props.userVote === option ?
                                                        <Badge badgeContent={'✓'} color="success">
                                                            <span>{option}</span>
                                                        </Badge> :
                                                        option
                                                }
                                            </MenuItem>
                                        )
                                    })
                                }
                            </Menu>
                            <BottomNavigationAction label="Delete" onClick={props.handleDelete} icon={<DeleteIcon />} />
                            <BottomNavigationAction label="Edit" icon={<EditIcon />} onClick={props.handleEdit} />
                        </BottomNavigation>
                    </Paper>
                </CardActions>
            </Card>
        </>
    )
}
