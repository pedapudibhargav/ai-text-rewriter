import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AIRewriterApp from './Tools/AI_Rewriter/AI_RewriterApp';
import PasswordStrengthCheckerApp from './Tools/PasswordStrengthMeter/PasswordStrengthMeter';
import TeamMoodTracker from './Tools/TeamMoodTracker/TeamMoodTracker';
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
// if (AI_rewriterRoot) {
//   root = ReactDOM.createRoot(AI_rewriterRoot);
//   root.render(
//     <React.StrictMode>
//       <Container maxWidth="sm">
//         <AIRewriterApp />
//       </Container>
//     </React.StrictMode>
//   );
// }

// if (PasswordStrengthChecker) {
//   root = ReactDOM.createRoot(PasswordStrengthChecker);
//   root.render(
//     <React.StrictMode>
//       <Container maxWidth="md">
//         <PasswordStrengthCheckerApp />
//       </Container>
//     </React.StrictMode>
//   );
// }

// if (TeamMoodTrackerDOM) {
//   root = ReactDOM.createRoot(TeamMoodTrackerDOM);
//   root.render(
//     <React.StrictMode>
//       <TeamMoodTracker />
//     </React.StrictMode>
//   );
// }
root = ReactDOM.createRoot(TeamMoodTrackerDOM);
root.render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
