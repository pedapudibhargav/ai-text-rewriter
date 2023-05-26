import React, { useState } from 'react';
import {
    Dialog, DialogContent, DialogActions, TextField, Button
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
                <DialogActions sx={{ p: 2 }}>
                    <Button variant="outlined" size="medium" sx={{ px: 4, mr: 1 }} onClick={props.handleClose}>Cancel</Button>
                    <Button variant="contained" size="medium" sx={{ px: 4 }} onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
