import React, { Component } from 'react';
import Map from './components/Map';
import Navigation from './components/Navigation';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">

        <header className="App-header">
          <Navigation />
        </header>

        <div className="Sidebar">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">My Neighborhood</h1>
          <input
          className='' />
        </div>

        <div className="Map-container">
          <Map />
        </div>
      </div>
    );
  }
}

export default App;
