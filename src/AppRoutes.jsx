import * as React from 'react';
import { Container } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RetroTool from './Tools/RetroTool/RetroTool'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './Home';
import TeamSurvey from './Tools/TeamSurvey/TeamSurvey';
import ResponsiveAppBar from './Tools/CommonComponents/ResponsiveAppBar/ResponsiveAppBar';
import { RegisterUserDialog } from './Tools/CommonComponents/RegisterUserDialog';
import { GetUserDetails } from './Tools/Services/UserRegistrationService';
import Moodsurvey from './Tools/Moodsurvey/Moodsurvey';

export default function AppRoutes() {
    const [currentTheme, setCurrentTheme] = React.useState('light');
    const [currentUserDetails, setCurrentUserDetails] = React.useState(GetUserDetails());
    const [enableDialog, setEnableDialog] = React.useState(!currentUserDetails);
    const darkTheme = createTheme({
        palette: {
            mode: currentTheme,
        },
    });

    const toggleTheme = () => {
        setCurrentTheme(currentTheme === 'dark' ? 'light' : 'dark');
    }

    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <ResponsiveAppBar onThemeChange={toggleTheme} isCurrentThemeDark={currentTheme === 'dark'} currentUserDetails={currentUserDetails} />
                <Container maxWidth="lg">
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/moodsurvey/:roomId" element={<Moodsurvey currentUserDetails={currentUserDetails} />}></Route>
                            <Route path="/retrotool/:roomId" element={<RetroTool currentUserDetails={currentUserDetails} />} />
                            <Route path="/teamsurvey" element={<TeamSurvey />} />
                        </Routes>
                    </BrowserRouter>
                </Container>
                <RegisterUserDialog open={enableDialog} handleClose={() => setEnableDialog(false)} registrationCallback={setCurrentUserDetails} />
            </ThemeProvider>
        </>
    )
}
