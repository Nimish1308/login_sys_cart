import React from 'react'
import Navigation from './Navigation'


const Dashboard = () => {
  
  const user = JSON.parse(localStorage.getItem('user'));
  
  return (
    <div>
      
      <h1>Welcome {user?.name} To Dashboard</h1>
    </div>
  )
}

export default Dashboard
