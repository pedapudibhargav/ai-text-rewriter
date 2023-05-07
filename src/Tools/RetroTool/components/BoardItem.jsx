import React from 'react'
import {
    Card, CardContent, Typography, CardActions, Button
} from "@mui/material";

export default function BoardItem(props) {
    let boardItem = props.card;
    return (
        <>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="body2">
                       {boardItem.content}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Edit</Button>
                </CardActions>
            </Card>
        </>
    )
}
