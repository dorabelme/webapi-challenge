import React from 'react';
import './App.css';
import Project from "./components/Project.js";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Your Projects!</h1>
        <Project />
      </header>
    </div>
  );
}

export default App;
