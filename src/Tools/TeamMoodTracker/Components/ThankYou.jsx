import React from 'react'
import { Grid, Card, CardContent, CardActions, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import './ThankYou.css';

export default function ThankYou() {
    const navigate = useNavigate();
    let { testId } = useParams();

    // redicrect to new test page
    const handleCreateNewTest = () => {
        navigate(`/moodchecker`);
    }

    // go back to test screen
    const handleUpdateTest = () => {
        navigate(`/moodchecker/${testId}`);
    }

    return (
        <Grid className="begin-test-container" container direction="row" justifyContent="center" alignItems="center">
            <Card className='new-user-card'>
                <CardContent>
                    <h2>Thank you!</h2>
                    <p>Thanks for using our app to track your emotions and well-being.</p>
                </CardContent>
                <CardActions sx={{justifyContent: "center", mb:4}}>
                    {/* <Button size="large" variant="outlined" onClick={handleCreateNewTest}>Create New Test</Button> */}
                    <Button size="large" variant="outlined" onClick={handleUpdateTest}>Change your choice</Button>
                </CardActions>
            </Card>
        </Grid>
    )
}
