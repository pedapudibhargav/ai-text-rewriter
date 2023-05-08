import React, { useState, useEffect } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TextField, Button
} from "@mui/material";

export default function NewBoardItem(props) {
    const [cardData, setCardData] = useState(props.cardData);

    const handleContentChange = (event) => {
        setCardData(prevCardData => ({
            ...prevCardData,
            content: event.target.value
        }));
    };

    useEffect(() => {
        setCardData(props.cardData);
    }, [props.cardData]);

    const handleSave = () => {
        props.handleSave(cardData);
    }

    return (
        <>
            <Dialog open={props.open} onClose={props.handleClose} fullWidth>
                <DialogContent>
                    <DialogContentText>
                        <TextField
                            label="Content"
                            multiline
                            rows={6}
                            fullWidth
                            defaultValue={cardData.content ? cardData.content : ''}
                            onChange={(e) => handleContentChange(e)}
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
