import { Paper } from '@mui/material'
import React from 'react'
import './Dock.css'

export default function Dock() {
  return (
    <div id="app-dock">
        <Paper elevation={4}>
            <div className='paper-body'>
            This is paper
            </div>            
        </Paper>
    </div>
  )
}
