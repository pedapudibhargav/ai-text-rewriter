import React, { useState, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Button
} from "@mui/material";

export default function NewBoardItem(props) {
    const [cardData, setCardData] = useState(props.cardData);

    const handleContentChange = (event) => {
        setCardData({
            ...props.cardData,
            content: event.target.value
        });
    };

    const handleSave = () => {
        props.handleSave(cardData);
    }

    return (
        <>
            <Dialog open={props.open} onClose={props.handleClose} fullWidth>
                <DialogContent>
                    <TextField
                        label="Ticket Descriiption"
                        multiline
                        rows={6}
                        fullWidth
                        defaultValue={props.cardData.content ? props.cardData.content : ''}
                        onChange={(e) => handleContentChange(e)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
