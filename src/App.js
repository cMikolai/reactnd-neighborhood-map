import React, { Component } from 'react';
import MapContainer from './components/Map';
import Navigation from './components/Navigation';
import escapeRegExp from 'escape-string-regexp';
import Locations from './Locations.json';
import './App.css';

class App extends Component {
  /*state = {
    //locations: [],
    //markers: [],
    //query: ''
  }*/

  constructor(props) {
    super(props);
      this.state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
      };
    }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

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
      //markers: marker[i].firstChild.click();
      //marker[i].push(this.state.markers)
      console.log(marker[i])
      break;
    }

    /* if (sidebarLinks[i] === marker[i]) {

    } else {
      console.log('No match!')
    } */
  }

  /*componentDidMount() {
    window.addEventListener('load', this.onSidebarLinkClick);
  }*/

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
        onSidebarLinkClick={this.onSidebarLinkClick}
        onMarkerClick={this.onMarkerClick}
        onMapClicked={this.onMapClicked}
        selectedPlace={this.state.selectedPlace}
        showingInfoWindow={this.state.showingInfoWindow}
        activeMarker={this.state.activeMarker}
        />

      </div>
    );
  }
}

export default App;
