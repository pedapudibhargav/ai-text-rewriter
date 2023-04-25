import React, { useState, useEffect } from 'react'
import { TextField, Button, Card, CardContent, CardActions, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import './NewUser.css';

export default function NewUser() {
    const [name, setName] = useState("");
    const [touched, setTouched] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedName = localStorage.getItem("username");
        if (storedName) {
            setName(storedName);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("username", name);
        console.log('usename saved 2:', name);
        navigate(-2);
    };

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setName(inputValue)
        setTouched(true);
        setIsValid(validateUsername(inputValue));
    }

    // Validate user name
    function validateUsername(username) {
        const regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        return regex.test(username.trim());
    }

    return (
        <>
            <Card className='new-user-card'>
                <CardContent>
                    <h2>Let's get to know each other</h2>
                    <p>
                        Hey, there! What's your name so we can make your visit more enjoyable?
                    </p>
                    {touched && !isValid && (
                        <Alert className="userinput-alert" severity="warning" >Must contain only letters, numbers, or underscores
                            Must be between 3 and 20 characters long</Alert>
                    )}
                    <form onSubmit={handleSubmit}>
                        <TextField
                            className='new-user-name-input'
                            label="Enter your name"
                            variant="outlined"
                            value={name}
                            autoComplete='off'
                            onChange={(e) => handleInputChange(e)}
                        />
                        {/* <Button type="submit" variant="contained" color="primary">
                            Save
                        </Button> */}
                    </form>
                </CardContent>
                <CardActions>
                    {touched && isValid && (
                        <Button size="medium" className='btn-create-user' variant="contained" color="primary" onClick={handleSubmit}>Let's Go</Button>
                    )}                    
                </CardActions>
            </Card>
        </>
    )
}
