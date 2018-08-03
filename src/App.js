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
        animation: '0',
        items: []
      };
  }

  componentDidMount = () => {
    this.getLocations()
    this.ifAppIsOffline()
  }

  getLocations = () => {
    fetch('https://api.foursquare.com/v2/venues/search?near=London&query=food&v=20180323&limit=10&intent=browse&radius=500&client_id=AU4JNRCBGSTSHHAKB0KU3WIA5ZNTPV2DYD1QUEE5DZMRCXTF&client_secret=VA0YLV21BIMVDZCSWATVUSX2D2Q2RSVUFYS5VCZQO0ZXEBXE')
    .then(res => res.json())
    .then(items => {
        this.setState({ items: items.response.venues });
      });
  }

  ifAppIsOffline = () => {
    var appIsOffline = document.querySelector('.App').lastElementChild
    appIsOffline.className += "App-offline"
    appIsOffline.innerHTML = 'No internet connection. Please try again later.'
    //console.log(appIsOffline)
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      animation: '1'
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        animation: '0'
      })
    }
  };

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  onSidebarLinkClick = (e) => {
    [...document.querySelectorAll('.gmnoprint')].find(m => m.title === e).click(
      console.log('I am a fancy marker')
    )
  }

  render() {
    const { query, items } = this.state

    let filterLocations
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
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
        />

        <MapContainer
        //foo={(()=>console.log(this.state.label))()}
        filterLocations={filterLocations}
        onSidebarLinkClick={this.onSidebarLinkClick}
        onMarkerClick={this.onMarkerClick}
        onMapClicked={this.onMapClicked}
        selectedPlace={this.state.selectedPlace}
        showingInfoWindow={this.state.showingInfoWindow}
        activeMarker={this.state.activeMarker}
        animation={this.state.animation}
        />

      </div>
    );
  }
}

export default App;
