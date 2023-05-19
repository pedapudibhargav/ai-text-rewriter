import React from 'react'
import {
    Grid, Paper, Typography, Card, CardContent
    , CardActions, Button, CardMedia, CardActionArea, Container
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GetRandomNumberFromPSTTime } from './Tools/Services/RandomNumber';
import moodTrackerCardImage from './images/moodtracker_card.jpg';
import retroToolCardImage from './images/retro_card.jpg';
import teamsurveyToolCardImage from './images/teamsurvey.jpg';


export default function Home() {
    const navigate = useNavigate();
    // add :randomNum to replace it with random number.
    const apps = [
        {
            name: 'Team Mood Tracker',
            description: "Gain real-time insights into your team's sentiment, enhance collaboration, and make informed decisions for optimized sprints.",
            link: '/moodchecker',
            active: false,
            imagePath: moodTrackerCardImage
        },
        {
            name: 'Retro Tool',
            description: "Streamline retrospectives, capture valuable feedback, and drive actionable improvements with our intuitive Retro Tool.",
            link: '/retrotool/:randomNum',
            active: true,
            imagePath: retroToolCardImage
        },
        {
            name: 'Team Suvery - Coming Soon',
            description: "Know what your team is thinking and feeling with our Team Survey tool. Ask the right questions, get the right answers.",
            link: '/teamsurvey',
            active: false,
            imagePath: teamsurveyToolCardImage
        }
    ];

    const handleRandomNumInLinks = (linkIn) => {
        return linkIn.replace(':randomNum', GetRandomNumberFromPSTTime());
    };

    const handleCTAClick = (link) => {
        link = handleRandomNumInLinks(link);
        navigate(link, { state: { from: `/home` } });
    }

    const clipDescription = (description) => {
        const maxDescriptionLength = 100;
        return description.length > maxDescriptionLength ? description.substring(0, maxDescriptionLength) + '...' : description;
    }

    return (
        <>
            <Container fixed sx={{ mt: 4 }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {apps.filter(app => app.active).map((app, index) => {
                        return (
                            <Grid item xs={4} key={index}>
                                <Paper elevation={1}>
                                    <Card>
                                        <CardActionArea onClick={() => handleCTAClick(app.link)}>
                                            <CardMedia
                                                component="img"
                                                height="240"
                                                image={app.imagePath}
                                                alt="green iguana"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {app.name}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {clipDescription(app.description)}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button size="small" color="primary" onClick={() => handleCTAClick(app.link)}>
                                                Get Started
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </>
    )
}
