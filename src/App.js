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

  onSidebarLinkClick = (e, i, Location) => {
    let marker = document.querySelectorAll('.gmnoprint map')
    //marker = marker.firstChild
    //let marker = document.querySelectorAll('area')
    let sidebarLinks = document.querySelectorAll('li.Sidebar-location')

    /* for (i = 0; i < sidebarLinks.length; i++) {
      marker[i].click();
      console.log(sidebarLinks[i])
    } */

    for (i = 0; i < marker.length; i++) {
      marker[i].firstChild.click();
      //marker[i].push(this.state.markers)
      console.log(marker[i])
    }

    /* if (sidebarLinks[i] === marker[i]) {

    } else {
      console.log('No match!')
    } */
  }

  componentDidMount() {
    window.addEventListener('load', this.onSidebarLinkClick);
    //this.onSidebarLinkClick();
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
