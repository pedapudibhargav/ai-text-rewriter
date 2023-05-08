import React, {useEffect, useState} from 'react'
import {
     Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField, Avatar
} from "@mui/material";
import {registerNewuser} from "../Services/UserRegistrationService";

export default function RegisterUserDialog(props) {
    const [formData, setFormData] = useState({});
    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        const firstname = formData.firstName ? formData.firstName.trim() : '';
        const lastname = formData.lastName ? formData.lastName.trim() : '';
        setAvatar(`https://source.boringavatars.com/beam/600/${firstname}${lastname}?&colors=0D8BD9,0FB2F2,41C0F2,77CFF2,BDE3F2`);
    }, [formData]);

    const handleSubmit = (e) => {
        registerNewuser(formData);
        props.handleClose();
    };
    const handleInputChange = (e) => {
        const inputName = e.target.name;
        const inputValue = e.target.value;
        setFormData((previousObj) => {
            return {
                ...previousObj,
                [e.target.name]: inputValue
            }
        })
    };

    return (
        <>
            <Dialog open={props.open} onClose={props.handleClose}>
                <DialogTitle>Sign Up</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        We just need your email, first name, last name that's it!
                        <Avatar alt="Remy Sharp" src={avatar} />
                    </DialogContentText>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>                        
                            <Grid item xs={6}>
                                <TextField autoFocus margin="dense" label="Firat Name"
                                    type="text" fullWidth variant="standard" name='firstName' onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField autoFocus margin="dense" label="Last Name"
                                    type="text" fullWidth variant="standard" name='lastName' onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField autoFocus margin="dense"
                                    label="Email Address"
                                    type="email"
                                    fullWidth
                                    variant="standard"
                                    name='email' onChange={handleInputChange}
                                />
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Subscribe</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
