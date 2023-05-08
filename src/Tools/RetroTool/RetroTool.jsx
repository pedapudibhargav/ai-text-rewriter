import React from 'react'
import Board from './components/Board'
import RegisterUserDialog from '../CommonComponents/RegisterUserDialog'

export default function RetroTool() {
  return (
    <div>
      <RegisterUserDialog open={true}/>
      <Board/>
    </div>
  )
}
