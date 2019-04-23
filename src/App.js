import React, { Component } from 'react';
import './App.scss';
import TasksTable from "./components/TasksTable";
import LoginForm from "./components/LoginForm";

class App extends Component {
  render() {
    return (
      <div className="App">
        <LoginForm/>
        <TasksTable/>
      </div>
    );
  }
}

export default App;
