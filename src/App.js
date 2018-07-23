import React, { Component } from 'react';
import MapContainer from './components/Map';
import Navigation from './components/Navigation';
import './App.css';

class App extends Component {
  state = {
    locations: [],
    markers: []
  }

  render() {

    return (
      <div className="App">

        <Navigation />

        <MapContainer />

      </div>
    );
  }
}

export default App;
