import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, TextField, Button, Paper, Container, Box, Avatar } from "@mui/material";
import { pink, purple, deepPurple, indigo, cyan, teal, green, lime, amber, orange, brown } from '@mui/material/colors';
import { GetUserDetails, registerNewuser } from "../Services/UserRegistrationService";
import { GetAvatarFromName } from "../CommonComponents/RegisterUserDialog";

function UserProfile(props) {
    const [formData, setFormData] = React.useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
    });
    const [avatar, setAvatar] = React.useState("");
    const [isFormValid, setIsFormValid] = React.useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const userDetails = GetUserDetails();
        if (userDetails) {
            setFormData(userDetails);
            setAvatar(GetAvatarFromName(userDetails.userName));
        }
    }, []);

    const getUserInitials = () => {
        const { firstName, lastName } = formData;
        const firstInitial = firstName ? firstName.charAt(0) : '-';
        const lastInitial = lastName ? lastName.charAt(0) : '-';
        return `${firstInitial}${lastInitial}`;
    };

    const isFormDataValid = () => {
        const { firstName, lastName, userName, email } = formData;

        if (!firstName || !lastName || !userName || !email) {
            return false;
        }

        // Check if email is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return false;
        }

        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isFormDataValid()) {
            setIsFormValid(false);
            return;
        }
        const updatedFormData = { ...formData, avatar };
        registerNewuser(updatedFormData);
        setIsFormValid(true);
        navigate(-1);
    };

    // Get color from username
    const GetColorPalletteFromString = () => {
        const { userName } = formData;
        const colorPallette = [pink, purple, deepPurple, indigo, cyan, teal, green, lime, amber, orange, brown];
        let colorPalletteString = '';
        let colorIndex = 0;
        for (let i = 0; i < userName.length; i++) {
            colorIndex = (colorIndex + userName.charCodeAt(i)) % colorPallette.length;
            colorPalletteString = colorPallette[colorIndex][500];
        }
        return colorPalletteString;
    }

    const handleInputChange = (e) => {
        let inputValue = e.target.value;

        if (e.target.name === "userName" && e.target.value.length > 0) {
            inputValue = inputValue.replace(/\s/g, "").trim();
            setAvatar(GetAvatarFromName(inputValue));
        }

        setFormData({
            ...formData,
            [e.target.name]: inputValue,
        });
    };

    const handleHomeButtonClick = () => {
        navigate('/', { state: { from: `/profile` } });
    }

    return (
        <Container maxWidth="sm">
            <Paper>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 1, m: 1, mt: 8 }}>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Avatar sx={{ width: 100, height: 100, bgcolor: GetColorPalletteFromString() }}>{getUserInitials()}</Avatar>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="First Name"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    label="Last Name"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Username"
                                    name="userName"
                                    value={formData.userName}
                                    onChange={handleInputChange}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button type="submit" variant="outlined" color="primary" size="large"
                                    onClick={() => handleHomeButtonClick()} style={{ width: "45%", margin: "2.5%" }}
                                >
                                    Home
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    style={{ width: "45%", margin: "2.5%" }}
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Paper>
        </Container>
    );
}

export default UserProfile;