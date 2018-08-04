import React, { Component } from 'react';
import MapContainer from './components/Map';
import Navigation from './components/Navigation';
import escapeRegExp from 'escape-string-regexp';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
      this.state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        animation: false,
        items: []
      };
  }

  componentDidMount = () => {
    this.getLocations()
    this.ifAppIsOffline()
    this.toggleNavigation()
    this.handleTabIndex()
  }

  componentDidUpdate= () => {
    this.handleTabIndex()
  }

// Fetching Foursquare API
  getLocations = () => {
    fetch('https://api.foursquare.com/v2/venues/search?near=London&query=food&v=20180323&limit=10&intent=browse&radius=500&client_id=AU4JNRCBGSTSHHAKB0KU3WIA5ZNTPV2DYD1QUEE5DZMRCXTF&client_secret=VA0YLV21BIMVDZCSWATVUSX2D2Q2RSVUFYS5VCZQO0ZXEBXE')
    .then(res => res.json())
    .then(items => {
        this.setState({ items: items.response.venues });
      });
  }

// Changing the default "Loading..." - message to display a connection error
  ifAppIsOffline = () => {
    var appIsOffline = document.querySelector('.App').lastElementChild
    appIsOffline.className += 'App-offline'
    appIsOffline.innerHTML = 'The map could not be loaded. Please try again later.'
    //console.log(appIsOffline)
  }

// toggles Navigation
  toggleNavigation = (e) => {
    var navClass = document.querySelector('.nav-input')
    var sidebarList = document.querySelector('#menu')

    navClass.click(function() {
      sidebarList.toggle()
    })
  }

// adds enter event to tabbing
  onKeyPressed = (e) => {
    if (e.keyCode === 13) {
      document.activeElement.click()
    }
  }

// Handles tab index for Foursquare links
  handleTabIndex = (i) => {
    var mapLinks = document.querySelectorAll('a')
    //console.log(mapLinks)

    for (i; i < mapLinks.length; i++) {
      mapLinks[i].tabIndex = "-1";
    }

    [...document.querySelectorAll('.gmnoprint')].tabIndex=[1]
  }

// Handles marker click-states
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      animation: true
    });

// Handles Map click-states
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        animation: false
      })
    }
  };

// query-functions are required for search
  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

// Having clicks on sidebar-links showing their markers info-windows
  onSidebarLinkClick = (e) => {
    [...document.querySelectorAll('.gmnoprint')].find(m => m.title === e).click(
      console.log('I am a fancy marker'),
      this.setState({ animation: true })
    )
  }

  render() {
    const { query, items, animation } = this.state

    // Search (passed down to both Map and Sidebar)
    let filterLocations
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      // filtering the items array
      filterLocations = items.filter((item) => match.test(item.name))
    } else {
      filterLocations = items
    }

    return (
      <div className="App">

        <Navigation
        filterLocations={filterLocations}
        updateQuery={this.updateQuery}
        onSidebarLinkClick={this.onSidebarLinkClick}
        onKeyPressed={this.onKeyPressed}
        />

        <MapContainer
        // foo={(()=>console.log(this.state.animation))()}
        filterLocations={filterLocations}
        onSidebarLinkClick={this.onSidebarLinkClick}
        onMarkerClick={this.onMarkerClick}
        onMapClicked={this.onMapClicked}
        selectedPlace={this.state.selectedPlace}
        showingInfoWindow={this.state.showingInfoWindow}
        activeMarker={this.state.activeMarker}
        animation={animation}
        />

      </div>
    );
  }
}

export default App;
