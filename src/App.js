import React, { Component } from 'react';
import MapContainer from './components/Map';
import Navigation from './components/Navigation';
import escapeRegExp from 'escape-string-regexp';
import Locations from './Locations.json';
import './App.css';

class App extends Component {
  state = {
    locations: [],
    markers: [],
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  render() {
    const {query} = this.state

    let filterLocations
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      filterLocations = Locations.filter((location) => match.test(location.name))
    } else {
      filterLocations = Locations
      console.log('all Locations visible on map')
    }

    return (
      <div className="App">

        <Navigation
        filterLocations={filterLocations}
        query={this.state.query}
        updateQuery={this.updateQuery}
        />

        <MapContainer
        filterLocations={filterLocations}
        />

      </div>
    );
  }
}

export default App;
