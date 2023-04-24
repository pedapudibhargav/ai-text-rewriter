import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, Button, CardActions } from "@mui/material";
import { RadarChart } from './Results/RadarChart';
import './MoodTestResults.css';

export default function MoodTestResults() {
    let { testId } = useParams();
    const [testResults, setTestResults] = useState([]);
    const [chartDataset, setChartDataset] = useState(null);
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
        const userFeelingData = testResults;
        const moodCount = { 'great': 0, 'ok': 0, 'not ok': 0, 'bad': 0 };
        for (const key in userFeelingData) {
            const mood = userFeelingData[key].mood;
            if (!moodCount[mood])
                moodCount[mood] = 0;
            moodCount[mood]++;
        }
        const labels = Object.keys(moodCount).sort();
        const data = labels.map(mood => moodCount[mood]);
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

                </CardContent>
                <CardActions className='test-results-actions'>
                    <Button variant="outlined" size="large" onClick={handleBackToTest}>Back</Button>
                    <Button variant="contained" size="large" onClick={handleCreateNewTest}>Create New Test</Button>
                </CardActions>
            </Card>
        </>
    )
}