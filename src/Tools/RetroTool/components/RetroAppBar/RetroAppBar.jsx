import React from 'react'
import { AppBar, AvatarGroup, Avatar, Tooltip } from '@mui/material';

export default function RetroAppBar(props) {
    const getTooltipTitle = () => {
        let returnTitle = '';
        props.participants.forEach((participant) => {
            returnTitle += participant.username + ', '
        });
        return returnTitle;
    }
    return (
        <div>
            {
                (props && props.participants) ?
                    <AppBar sx={{ p: 1 }} position="static" color="transparent">
                        <Tooltip title={getTooltipTitle(props.participants)} placement="bottom-end">
                            <AvatarGroup max={props.participants.length > 1 ? props.participants.length : 2}>
                                {
                                    props.participants.map((participant, index) => {
                                        return <Avatar key={index} alt={participant.username} src={`https://source.boringavatars.com/beam/600/${participant.username}?&colors=0D8BD9,0FB2F2,41C0F2,77CFF2,BDE3F2`} />
                                    })
                                }
                            </AvatarGroup>
                        </Tooltip>
                    </AppBar>
                    :
                    <p>App bar</p>
            }
        </div>
    )
}
