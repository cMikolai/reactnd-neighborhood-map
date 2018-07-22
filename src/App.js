import React, { Component } from 'react';
import Map from './components/Map';
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';
import './App.css';

class App extends Component {
  state = {
    locations: []
  }

  render() {

    return (
      <div className="App">

        <Navigation />

        <Sidebar
        locations={this.state.locations}
        />

        <Map />

      </div>
    );
  }
}

export default App;
