import React, { useState } from 'react'
import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle, Grid, TextField, Avatar, Typography, Alert, Box
} from "@mui/material";
import { registerNewuser } from "../Services/UserRegistrationService";


const colorPallets = [
    ['#0D8BD9', '#0FB2F2', '#41C0F2', '#77CFF2', '#BDE3F2'],
    ['#F24182', '#010440', '#0F7CBF', '#1FBF84', '#F2BA52'],
    ['#261519', '#7D5EBF', '#907ABF', '#533CA6', '#593434'],
    ['#05DBF2', '#05F258', '#F27405', '#F22E2E', '#F2F2F2'],
    ['#7988D9', '#38A6A6', '#56BF7B', '#F2E7AE', '#F2561D'],
    ['#368DD9', '#A2D4F2', '#F28705', '#F25C05', '#8C3503'],
    ['#124673', '#307CBF', '#3BD98F', '#F2E205', '#F2EB8D'],
]

// get color pallette from string's length from colorPallets
// in this format 0D8BD9,0FB2F2,41C0F2,77CFF2,BDE3F2
const GetColorPalletteFromString = (inputString) => {
    const colorPalletteIndex = inputString.length % (colorPallets.length);
    // remove '#' from string and join them with ','
    return colorPallets[colorPalletteIndex].map((code) => code.replace('#', '')).join(',');
};

const GetAvatarFromName = (userName) => {
    let colorPallette = GetColorPalletteFromString('');
    if (userName)
        colorPallette = GetColorPalletteFromString(userName);
    else
        userName = ' ';
    return `https://source.boringavatars.com/beam/600/${userName}?&colors=${colorPallette}`;
};

function RegisterUserDialog(props) {
    const [formData, setFormData] = useState({});
    const [avatar, setAvatar] = useState('');
    const [isFormValid, setIsFormValid] = useState(null);

    // useEffect(() => {

    // }, [formData]);

    const isFormDataValid = () => {
        // if (!formData.firstName || formData.firstName.trim().length === 0)
        //     return false;
        // if (!formData.lastName || formData.lastName.trim().length === 0)
        //     return false;
        if (!formData.userName || formData.userName.trim().length === 0)
            return false;
        // if (!formData.email || formData.email.trim().length === 0)
        //     return false;
        return true;
    };

    const handleSubmit = (e) => {
        if (!isFormDataValid()) {
            setIsFormValid(false);
            return;
        }
        const updatedFormData = { ...formData, 'avatar': avatar };
        registerNewuser(updatedFormData);
        props.registrationCallback(updatedFormData);
        props.handleClose();
        setIsFormValid(true);
    };

    const handleInputChange = (e) => {
        // const inputName = e.target.name;
        let inputValue = e.target.value;

        if (e.target.name === 'userName' && e.target.value.length > 0) {
            // remove all spaces            
            inputValue = inputValue.replace(/\s/g, '').trim();
            setAvatar(GetAvatarFromName(inputValue));
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
                        <Box sx={{ flexGrow: 1 }}>Your Nickname</Box>
                        <Avatar alt="Remy Sharp" sx={{ width: 90, height: 90, marginBottom: -20 }} src={avatar} />
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography variant="p" gutterBottom>
                            So that your teammates can recognize you.
                        </Typography>
                        {
                            (isFormValid !== null && isFormValid === false) ?
                                <Alert severity="error">Please fill out the mandator fields: first name, last name, email and username</Alert> : null
                        }
                    </DialogContentText>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sx={{ mt: 3 }}>
                                <TextField autoFocus margin="dense" label="Your Nickname" required
                                    type="text" fullWidth variant="standard" name='userName' onChange={handleInputChange}
                                />
                            </Grid>
                            {/* <Grid item xs={12}>
                                <TextField autoFocus margin="dense"
                                    label="Email Address"
                                    type="email"
                                    fullWidth
                                    required
                                    variant="standard"
                                    name='email' onChange={handleInputChange}
                                />
                            </Grid> */}
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
                    {/* <Button onClick={props.handleClose}>Cancel</Button> */}
                    <Button onClick={handleSubmit} variant="contained">Get Started 🏁</Button>
                </DialogActions>
            </Dialog >
        </>
    )
}

export { RegisterUserDialog, GetAvatarFromName };