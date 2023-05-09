import * as React from 'react';
import ResponsiveAppBar from './Tools/TeamMoodTracker/ResponsiveAppBar'
import { Container } from '@mui/material'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BeginMoodCheckIn from './Tools/TeamMoodTracker/BeginMoodCheckIn'
import NewUser from './Tools/TeamMoodTracker/NewUser'
import { MoodTest } from './Tools/TeamMoodTracker/TeamMoodTracker'
import MoodTestResults from './Tools/TeamMoodTracker/MoodTestResults'
import ThankYou from './Tools/TeamMoodTracker/Components/ThankYou'
import RetroTool from './Tools/RetroTool/RetroTool'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './Home';
import Teams from './Tools/TeamMoodTracker/Components/Teams/Teams';
import TeamSurvey from './Tools/TeamSurvey/TeamSurvey';

export default function AppRoutes() {
    const [currentTheme, setCurrentTheme] = React.useState('light');
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
                <ResponsiveAppBar onThemeChange={toggleTheme} isCurrentThemeDark={currentTheme === 'dark'}/>
                <Container maxWidth="lg">
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/newuser" element={<NewUser />} />                            
                            <Route path="/moodchecker" element={<BeginMoodCheckIn />} />
                            <Route path="/moodchecker/teams" element={<Teams />} />
                            <Route path="/moodchecker/:testId" element={<MoodTest />} />
                            <Route path="/moodchecker/results/:testId" element={<MoodTestResults />} />
                            <Route path="/moodchecker/thankyou/:testId" element={<ThankYou />} />
                            <Route path="/retrotool/:roomId" element={<RetroTool />} />
                            <Route path="/teamsurvey" element={<TeamSurvey />} />
                        </Routes>
                    </BrowserRouter>
                </Container>
            </ThemeProvider>
        </>
    )
}
