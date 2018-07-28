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

  onSidebarLinkClick = (e) => {
    let markers = document.querySelectorAll('area')
    let i

    for (i = 0; i < markers.length; i++) {
      markers[i].click();

      //console.log(markers[i]);
    }
  }

  render() {
    const { query } = this.state

    let filterLocations
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      filterLocations = Locations.filter((location) => match.test(location.name))
    } else {
      filterLocations = Locations
      //console.log('all Locations visible on map')
    }

    return (
      <div className="App">

        <Navigation
        filterLocations={filterLocations}
        updateQuery={this.updateQuery}
        onSidebarLinkClick={this.onSidebarLinkClick}
        />

        <MapContainer
        filterLocations={filterLocations}
        />

      </div>
    );
  }
}

export default App;
