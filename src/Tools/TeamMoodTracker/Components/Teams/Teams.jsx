import React, { useState } from 'react';
import {
    Grid, Paper, Typography, Card, CardContent
    , CardActions, Button, CardMedia, CardActionArea, Container, Box, IconButton
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CreateNewTeamDialog from './CreateNewTeamDialog';

export default function Teams() {
    const navigate = useNavigate();
    const [enableDialog, setEnableDialog] = useState(false);
    const testTeams = [
        {
            id: 1,
            name: 'Default 1',
            description: "This is the default team 1",
        }
    ];
    const [teams, setTeams] = useState(testTeams);

    const handleCTAClick = (link) => {
        navigate('', { state: { from: `/moodchecker/teams` } });
    }

    const clipDescription = (description) => {
        const maxDescriptionLength = 100;
        return description.length > maxDescriptionLength ? description.substring(0, maxDescriptionLength) + '...' : description;
    }

    const newTeamCard = () => {
        return (
            <Grid key={0} item xs={4} sx={{ height: 310 }} >
                <Paper elevation={1} sx={{ height: '100%' }} onClick={toggleDialog}>
                    <Card sx={{ bgcolor: 'primary.light', color: 'primary.contrastText', height: '100%' }}>
                        <CardActionArea sx={{ height: '100%' }}>
                            <CardContent>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: "center", justifyContent: "center" }}>
                                    <AddCircleIcon sx={{ height: 150, width: 150 }} />
                                    <Typography variant="h6" gutterBottom>
                                        Create New Team
                                    </Typography>
                                </Box>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Paper>
            </Grid>
        )
    }

    const toggleDialog = () => {
        setEnableDialog(!enableDialog);
    }

    const sortTeams = (teams) => {
        return teams.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
    }

    const addNewTeam = (newTeam) => {
        console.log('Add new team:', newTeam);
        teams.forEach((team) => {
            if (team.id === newTeam["id"])
                return alert("Team already exists with same id: Please try again");
        });
        setTeams((prevTeams) => sortTeams([...prevTeams, newTeam]));
    }

    return (
        <>
            <Container fixed sx={{ mt: 4 }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 3, sm: 2, md: 3 }} alignItems="stretch">
                    {newTeamCard()}
                    {teams.map((team) => {
                        return (
                            <Grid key={team.id} item xs={4} sx={{ height: 310 }} >
                                {
                                    <Paper elevation={1}>
                                        <Card>
                                            <CardActionArea onClick={() => handleCTAClick(team.id)}>
                                                <CardMedia
                                                    component="img"
                                                    height="160"
                                                    image={`https://source.boringavatars.com/marble/600/` + team.name + `?square=true&colors=0D8BD9,0FB2F2,41C0F2,77CFF2,BDE3F2`}
                                                    alt="green iguana"
                                                />
                                                {/* https://source.boringavatars.com/beam/600/b?colors=264653,2a9d8f,e9c46a,f4a261,e76f51 */}
                                                {/* https://github.com/boringdesigners/boring-avatars */}
                                                {/* https://github.com/boringdesigners/boring-avatars-service/blob/main/README.md */}
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        {team.name}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {clipDescription(team.description)}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                            <CardActions>
                                                <Button size="small" color="primary" onClick={() => handleCTAClick(team.id)}>
                                                    Get Started
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </Paper>

                                }</Grid>
                        )
                    })}
                </Grid>
            </Container>
            <CreateNewTeamDialog open={enableDialog} handleClose={toggleDialog} handleSave={addNewTeam} />
        </>
    )
}
