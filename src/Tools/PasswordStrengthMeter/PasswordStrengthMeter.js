import React, { useState } from "react";
import { Box, OutlinedInput, InputAdornment, IconButton, FormControl, LinearProgress, InputLabel, Typography } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import "./PasswordStrengthMeter.css";

function convertSecondsToTime(seconds) {
    const years = Math.floor(seconds / (365 * 24 * 60 * 60));
    const days = Math.floor((seconds % (365 * 24 * 60 * 60)) / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const remainingSeconds = seconds % 60;

    const timeArray = [];
    if (years > 0) {
        timeArray.push(`${years}y`);
    }
    if (days > 0) {
        timeArray.push(`${days}d`);
    }
    if (hours > 0) {
        timeArray.push(`${hours}h`);
    }
    if (minutes > 0) {
        timeArray.push(`${minutes}m`);
    }
    if (remainingSeconds > 0) {
        timeArray.push(`${Math.round(remainingSeconds)}s`);
    }

    return timeArray.join(" ");
}

function checkPassword(password) {
    // Define the password strength rules
    const rules = [
        { regex: /[A-Z]/, message: "Password should contain at least one uppercase letter.", possibleCharacters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ" },
        { regex: /[a-z]/, message: "Password should contain at least one lowercase letter.", possibleCharacters: "abcdefghijklmnopqrstuvwxyz" },
        { regex: /[0-9]/, message: "Password should contain at least one number.", possibleCharacters: "0123456789" },
        { regex: /[\W_]/, message: "Password should contain at least one symbol.", possibleCharacters: "~!@#$%^&*()_+-={}[]\\|:;\"'<>,.?/" },
        { regex: /.{12,}/, message: "Password should be at least 12 characters long.", possibleCharacters: "" }
    ];

    // Check if the password meets the rules and calculate the strength
    let strength = 0;
    let feedback = [];
    let possibleCharacters = "";
    rules.forEach(rule => {
        if (rule.regex.test(password)) {
            possibleCharacters += rule.possibleCharacters;
            strength += 1;
        } else {
            feedback.push(rule.message);
        }
    });

    // Calculate the time required to crack the password using brute force    
    const characters = password.split("");
    let possibilities = 1;
    for (let i = 0; i < characters.length; i++) {
        const index = possibleCharacters.indexOf(characters[i]);
        possibilities *= index !== -1 ? possibleCharacters.length : 1;
    }
    const seconds = possibilities / 1e9;

    // Describe the strength of the password
    let strengthDescription;
    if (strength < 2) {
        strengthDescription = "Very weak";
    } else if (strength < 3) {
        strengthDescription = "Weak";
    } else if (strength < 4) {
        strengthDescription = "Moderate";
    } else if (strength < 5) {
        strengthDescription = "Strong";
    } else {
        strengthDescription = "Very strong";
    }

    // Provide feedback on how to make the password stronger
    if (feedback.length > 0) {
        feedback.push("Consider adding more characters, numbers, symbols, or a mix of uppercase and lowercase letters to make it stronger.");
    }

    // Return an object containing the password strength, feedback, and time required to crack
    return {
        strength: strengthDescription,
        feedback: feedback.join(" "),
        timeToCrack: seconds.toFixed(2),
        possibleCharacters: possibleCharacters,
        strengthPercentage: (100 / 5) * strength
    };
}

const PasswordStrengthChecker = () => {
    const [password, setPassword] = useState("");
    const [passwordCheckerReport, setPasswordCheckerReport]
        = useState({
            'strength': 'No Password',
            'feedback': 'No Password',
            'timeToCrack': 0
        });
    const [showPassword, setShowPassword] = useState(true);

    const handleChange = (event) => {
        setPassword(event.target.value);
        setPasswordCheckerReport(checkPassword(event.target.value));
    };

    const handleToggle = (event) => {
        console.log("handle click event");
        setShowPassword(!showPassword);
    };

    const getPasswordStrength = () => {
        return passwordCheckerReport.strength;
    };

    const getTimeToCrack = () => {
        return (passwordCheckerReport.timeToCrack < 3.154e+10) ?
             convertSecondsToTime(passwordCheckerReport.timeToCrack):
             "1000+ years";
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div className='password-strength-checker'>
            {/* <p>Characters:{passwordCheckerReport.possibleCharacters}</p> */}
            <Typography variant="h4"  gutterBottom>
                Password Strength Checker
            </Typography>
            {/* <TextField
                className='password-input'
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handleChange}
            />
            <FormControlLabel
                control={<Checkbox checked={showPassword} onChange={handleToggle} />}
                label="Show password"
            /> */}

            <Box mb={2} sx={{ width: '100%' }}>
                <FormControl className='password-input' variant="outlined" mb={4}>
                    <InputLabel htmlFor="outlined-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={handleChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleToggle}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
            </Box>
            {password && (
                <div className='feedback'>
                    {/* <Typography variant="caption">Password strength: {getPasswordStrength()}</Typography>
                    <Typography variant="caption">
                        Time to crack password: 
                    </Typography> */}
                    <p>Password Strength: <span className="key-wording">{passwordCheckerReport.strength}</span>, 
                    Time it takes to crack your password:<span className="key-wording">{getTimeToCrack()}</span></p>
                </div>
            )}
            <Box sx={{ width: '100%' }}>
                <LinearProgress variant="determinate" value={passwordCheckerReport.strengthPercentage} />
            </Box>
            {/* <Typography variant="h4" mb={4} gutterBottom> */}
               
            {/* </Typography> */}
        </div>
    );
};

export default PasswordStrengthChecker;