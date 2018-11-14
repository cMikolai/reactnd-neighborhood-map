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
        items: [],
        active: false,
        tabIndex: -1
      };
  }

  componentDidMount = () => {
    this.getLocations()
    this.ifAppIsLoading()
    this.toggleNavigation()
    this.handleTabIndex()
    this.checkMapsLoadingStatus()
    this.changeErrorMessage()
  }

  componentDidUpdate= () => {
    this.handleTabIndex()
    this.checkMapsLoadingStatus()
  }

// Fetching Foursquare API
  getLocations = () => {
    fetch('https://api.foursquare.com/v2/venues/search?near=London&query=food&v=20180323&limit=10&intent=browse&radius=500&client_id=AU4JNRCBGSTSHHAKB0KU3WIA5ZNTPV2DYD1QUEE5DZMRCXTF&client_secret=VA0YLV21BIMVDZCSWATVUSX2D2Q2RSVUFYS5VCZQO0ZXEBXE')
    .then(res => res.json())
    .then(items => {
        this.setState({ items: items.response.venues });
      })
    .catch(error => this.onGetLocationsError('', error));
  }

// Adding an info message for user when Foursquare API can't be fetched
  onGetLocationsError = (e) => {
    var appContainer = document.querySelector('.App')
    var errorInfo = document.createElement('div')
    var errorInfoP = document.createTextNode("Sorry, but the locations can not be loaded.");
    appContainer.append(errorInfo)
    errorInfo.appendChild(errorInfoP)

    errorInfo.className += 'error-info'
  }

// Changing the default "Loading..." - message to display a connection error
  ifAppIsLoading = () => {
    var appIsOffline = document.querySelector('.App').lastElementChild
    appIsOffline.className += 'App-offline'
    appIsOffline.innerHTML = 'App cannot reach Google servers due to firewall.'
  }

// Checking if Map is visible
  checkMapsLoadingStatus = () => {
    var map = document.querySelector('.Map-container')
    var sidebarList = document.querySelector('.Sidebar-locations')
    var gmErrContainer = document.querySelector('.gm-err-container')

    if (map && gmErrContainer) {
      //console.log('failed')
      sidebarList.style.display = 'none';
    } else if (map && !gmErrContainer) {
      //console.log('success')
      sidebarList.style.display = 'block';
    } else {
      //console.log('failed')
      sidebarList.style.display = 'none';
    }
  }

// Google Map is not loading
  changeErrorMessage = () => {
    setTimeout(function(){
      var gmErrMessageIcon = document.querySelector('.gm-err-icon')
      var gmErrMessageTitle = document.querySelector('.gm-err-title')
      var gmErrMessage = document.querySelector('.gm-err-message')

      if (gmErrMessage) {
        gmErrMessageTitle.innerHTML = 'Sorry, Google Maps cannot be loaded. Please try again later.'
        gmErrMessageIcon.style.display = 'none'
        gmErrMessage.style.display = 'none'
      } else {
      }
    }, 1500);
  }


// toggles Navigation && handles tabIndex in Sidebar
  toggleNavigation = () => {
    // toggles navigation
    const currentState = this.state.active;

    this.setState({
      active: !currentState
    })

    // handles tabIndex in Sidebar
    var menuSidebarVisible = document.querySelector('.hidden')
    var menuSidebarHidden = document.querySelector('.visible')

    if (menuSidebarVisible) {
      this.setState({
        tabIndex: 0
      })
    } else if (menuSidebarHidden) {
      this.setState({
        tabIndex: -1
      })
    }
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

    for (i; i < mapLinks.length; i++) {
      mapLinks[i].tabIndex = "-1";
    }

    [...document.querySelectorAll('.gmnoprint')].tabIndex=[0]
  }

// Handles marker click-states
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

// Handles Map click-states
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
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
    let clickedMarker = [...document.querySelectorAll('area')]

    if (document.querySelector('.Map-container')) {
      clickedMarker.find(m => m.title === e).click()
    } else {
      this.onGetLocationsError()
    }
  }

  render() {
    const { query, items } = this.state

    // Search (passed down to both Map and Sidebar)
    let filterLocations
    if (query && items) {
      const match = new RegExp(escapeRegExp(query), 'i')
      // filtering the items array
      filterLocations = items.filter((item) => match.test(item.name))
    } else {
      filterLocations = items ? items : []
    }

    return (
      <div className="App">

        <Navigation
        filterLocations={filterLocations}
        updateQuery={this.updateQuery}
        onSidebarLinkClick={this.onSidebarLinkClick}
        onKeyPressed={this.onKeyPressed}
        toggleNavigation={this.toggleNavigation}
        active={this.state.active}
        tabIndex={this.state.tabIndex}
        />

        <MapContainer
        //foo={(()=>console.log(this.state.activeMarker))()}
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
