import React, { Component } from "react";
import './Dashboard.css'

class Dashboard extends Component {
    render() {
      return (
      <div className='dashboardBody'>
        <div className='dashboardTittle'>
          <h1>Estadisticas</h1>
        </div>
        <div className='stadisticsView'>
          <h2>Supervisores activos</h2>
          <p className='supervisors'>6</p>
          <br/>
          <h2>Horas asignadas hoy</h2>
          <p className='hoursToday'>17</p>
          <br/>
          <h2>Bokings asignados en la semana</h2>
          <p className='bokings'>123</p>
          <br/>
          <h2>Supervisores activos en la semana</h2>
          <p className='activeSupervisors'>16</p>
          <br/>
        </div>
      </div>
    )
  }
}

export default Dashboard;
