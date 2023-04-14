import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

export default function MoodTestResults() {
    let { testId } = useParams();
    const [testResults, setTestResults] = useState([]);
    const BE_URL = process.env.REACT_APP_BACKEND_HOST;

    useEffect(() => {
        getTestResults();
    }, []);

    const getTestResults = async () => {
        const RESULTS_API = `${BE_URL}/api/v1/moodtest/results?gameId=${testId}`;
        const response = await fetch(RESULTS_API);
        const results = await response.json();
        setTestResults(results['results']);
    };

    return (
        <>
            <div>TestResults</div>
            <div>Results:{ JSON.stringify(testResults)}</div>
        </>
    )
}