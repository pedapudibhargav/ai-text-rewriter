import React, { useEffect, useState } from 'react'
import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle, Grid, TextField, Avatar, Typography, Alert, Box
} from "@mui/material";
import { registerNewuser } from "../Services/UserRegistrationService";

export default function RegisterUserDialog(props) {
    const [formData, setFormData] = useState({});
    const [avatar, setAvatar] = useState('');
    const [isFormValid, setIsFormValid] = useState(null);

    useEffect(() => {
        setAvatar(`https://source.boringavatars.com/beam/600/${formData['userName']}?&colors=0D8BD9,0FB2F2,41C0F2,77CFF2,BDE3F2`);
    }, [formData]);

    const isFormDataValid = () => {
        // if (!formData.firstName || formData.firstName.trim().length === 0)
        //     return false;
        // if (!formData.lastName || formData.lastName.trim().length === 0)
        //     return false;
        if (!formData.userName || formData.userName.trim().length === 0)
            return false;
        if (!formData.email || formData.email.trim().length === 0)
            return false;
        return true;
    };

    const handleSubmit = (e) => {
        if (!isFormDataValid()) {
            setIsFormValid(false);
            return;
        }
        registerNewuser(formData);
        props.registrationCallback(formData);
        props.handleClose();
        setIsFormValid(true);
    };

    const handleInputChange = (e) => {
        // const inputName = e.target.name;
        let inputValue = e.target.value;

        if (e.target.name === 'userName' && e.target.value.length > 0) {
            // remove all spaces
            inputValue = inputValue.replace(/\s/g, '').trim();
        }

        setFormData((previousObj) => {
            return {
                ...previousObj,
                [e.target.name]: inputValue,
                'avatar': avatar
            }
        })
    };

    return (
        <>
            <Dialog open={props.open} onClose={props.handleClose} fullWidth={true}>
                <DialogTitle>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Box sx={{ flexGrow: 1 }}>Sign Up</Box>
                        <Avatar alt="Remy Sharp" sx={{ width: 90, height: 90, marginBottom: -20 }} src={avatar} />
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography variant="p" gutterBottom>
                            We just need your email, username that's it!
                        </Typography>
                        {
                            (isFormValid !== null && isFormValid === false) ?
                                <Alert severity="error">Please fill out the mandator fields: first name, last name, email and username</Alert> : null
                        }
                    </DialogContentText>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField autoFocus margin="dense" label="User Name" required
                                    type="text" fullWidth variant="standard" name='userName' onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField autoFocus margin="dense"
                                    label="Email Address"
                                    type="email"
                                    fullWidth
                                    required
                                    variant="standard"
                                    name='email' onChange={handleInputChange}
                                />
                            </Grid>
                            {/* <Grid item xs={6}>
                                <TextField autoFocus margin="dense" label="Firat Name" required
                                    type="text" fullWidth variant="standard" name='firstName' onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField autoFocus margin="dense" label="Last Name"
                                    type="text" fullWidth variant="standard" name='lastName' onChange={handleInputChange}
                                />
                            </Grid> */}

                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={props.handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} variant="contained">Get Started 🏁</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
