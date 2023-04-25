import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, Button, CardActions } from "@mui/material";
import { RadarChart } from './Results/RadarChart';
import './MoodTestResults.css';
import RefreshIcon from '@mui/icons-material/Refresh';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


export default function MoodTestResults() {
    let { testId } = useParams();
    const [testResults, setTestResults] = useState([]);
    const [chartDataset, setChartDataset] = useState(null);
    const [participants, setParticipants] = useState([]);
    const navigate = useNavigate();
    const BE_URL = process.env.REACT_APP_BACKEND_HOST;
    let counter = 0;

    useEffect(() => {
        console.log('useEffect is running');
        getTestResults();
    }, []);;

    useEffect(() => {
        console.log('useEffect is running:', testResults);
        const processedData = processUserFeelingData();
        console.log('processedData', JSON.stringify(processedData));
        setChartDataset(processedData);
    }, [testResults]);

    const getTestResults = async () => {
        const RESULTS_API = `${BE_URL}/api/v1/moodtest/results?gameId=${testId}`;
        fetch(RESULTS_API).then(response => response.json()).then((data) => {
            console.log('response data:', data);
            setParticipants(data['users']);
            setTestResults(data['results']);
        });
    };


    // redicrect to new test page
    const handleCreateNewTest = () => {
        navigate(`/moodchecker`);
    }

    // go back to test screen
    const handleBackToTest = () => {
        navigate(`/moodchecker/${testId}`);
    }


    const processUserFeelingData = () => {
        let moodCount = { 'great': 0, 'ok': 0, 'not ok': 0, 'bad': 0 };
        if(testResults && testResults) 
            moodCount = testResults; 
        const labels = Object.keys(moodCount).sort();   
        const data = labels.map((mood) => {
            return moodCount[mood];
        }); 
        console.log('data', data);       
        return {
            'labels': labels,
            'datasets': [
                {
                    'label': '# of Users',
                    'data': data,
                    'backgroundColor': 'rgba(255, 99, 132, 0.2)',
                    'borderColor': 'rgba(255, 99, 132, 1)',
                    'borderWidth': 1,
                },
            ],
        };
    }

    return (
        <>
            <Card className='results-card'>
                <CardContent>
                    {
                        chartDataset && chartDataset.labels ?
                            <>
                                <h1>Results</h1>
                                <RadarChart dataset={chartDataset} />
                            </> :
                            <p>Loading...</p>
                    }
                <p>Participants:{participants.join(',')}</p>
                </CardContent>
                <CardActions className='test-results-actions'>
                    {/* <Button variant="outlined" size="large" onClick={handleBackToTest}>Back</Button> */}
                    <Button variant="outlined" size="large" onClick={handleBackToTest} startIcon={<ArrowBackIcon />}>
                        Back
                    </Button>
                    <Button variant="contained" size="large" onClick={handleCreateNewTest}>Create New Test</Button>
                    <Button variant="outlined" size="large" onClick={getTestResults} endIcon={<RefreshIcon />}>
                        Refresh
                    </Button>
                </CardActions>
            </Card>
        </>
    )
}