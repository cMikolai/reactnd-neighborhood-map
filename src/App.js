import React, { Component } from 'react';
import Map from './components/Map';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">My Neighborhood</h1>
        </header>

        <div className="Map-container">
          <Map />
        </div>
      </div>
    );
  }
}

export default App;
