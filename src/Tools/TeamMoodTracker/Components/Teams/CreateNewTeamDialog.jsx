import React, { useState } from 'react';
import {
    Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from "@mui/material";

export default function CreateNewTeamDialog(props) {
    const [newTeam, setNewTeam] = useState({description: ''});
    const handleCreateTeam = () => {
        newTeam['id'] = Date.now();
        console.log('Create new team: ', newTeam);
        props.handleSave(newTeam);
        props.handleClose();
    }

    const handleInputChange = (e) => {        
        const target = e.target;
        const name = target.name;
        const value = target.value;
        newTeam[name] = value;
        setNewTeam(newTeam);
    }

    return (
        <>
            <Dialog open={props.open} onClose={props.handleClose}>
                <DialogTitle>Create New team</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleCreateTeam}>
                        <TextField
                            name='name'
                            label="Enter team name"
                            variant="outlined"
                            autoComplete='off'
                            sx={{ my: 1 }}
                            fullWidth
                            required
                            onChange={handleInputChange}
                        />
                        <TextField
                            name="description"
                            label="Description"
                            multiline
                            fullWidth
                            rows={4}
                            sx={{ my: 1 }}
                            defaultValue=""
                            onChange={handleInputChange}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleCreateTeam}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
