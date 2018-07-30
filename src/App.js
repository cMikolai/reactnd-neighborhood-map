import React, { Component } from 'react';
import MapContainer from './components/Map';
import Navigation from './components/Navigation';
import escapeRegExp from 'escape-string-regexp';
//import Locations from './Locations.json';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
      this.state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        items: []
      };
    }

  componentDidMount() {
    var foursquare = require('react-foursquare')({
      clientID: 'AU4JNRCBGSTSHHAKB0KU3WIA5ZNTPV2DYD1QUEE5DZMRCXTF',
      clientSecret: 'VA0YLV21BIMVDZCSWATVUSX2D2Q2RSVUFYS5VCZQO0ZXEBXE'
    });

    var params = {
      "near": "New York, NY",
      "query": 'food',
      "radius": '500'
    };

    foursquare.venues.getVenues(params)
      .then(res=> {
        this.setState({ items: res.response.venues });
      });
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

  onSidebarLinkClick = (e) => {
    [...document.querySelectorAll('.gmnoprint map area')].find(m => m.title === e).click()
  }

  render() {
    const { query } = this.state

    let filterLocations
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      filterLocations = this.state.items.filter((item) => match.test(item.name))
    } else {
      filterLocations = this.state.items
    }

    return (
      <div className="App">

        <Navigation
        filterLocations={filterLocations}
        updateQuery={this.updateQuery}
        onSidebarLinkClick={this.onSidebarLinkClick}
        items={this.state.items}
        />

        <MapContainer
        filterLocations={filterLocations}
        onSidebarLinkClick={this.onSidebarLinkClick}
        onMarkerClick={this.onMarkerClick}
        onMapClicked={this.onMapClicked}
        selectedPlace={this.state.selectedPlace}
        showingInfoWindow={this.state.showingInfoWindow}
        activeMarker={this.state.activeMarker}
        items={this.state.items}
        />

      </div>
    );
  }
}

export default App;
