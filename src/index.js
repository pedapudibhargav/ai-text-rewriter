import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import PasswordStrengthCheckerApp from './Tools/PasswordStrengthMeter/PasswordStrengthMeter';
import reportWebVitals from './reportWebVitals';
import { Container } from "@mui/material";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AppRoutes from './AppRoutes';

const AI_rewriterRoot = document.querySelector('#ai-rewriter-app');
const PasswordStrengthChecker = document.querySelector('#password-strength-checker-app');
const TeamMoodTrackerDOM = document.querySelector('#team-mood-tracker-app');
let root = null;

root = ReactDOM.createRoot(TeamMoodTrackerDOM);
root.render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);
// comment
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
