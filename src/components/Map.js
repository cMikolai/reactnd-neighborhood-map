import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import '../App.css';
import MapStyle from '../MapStyle.json';

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

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

  render() {
    return (
      <div className="Map-container">
        <Map google={this.props.google}
            onClick={this.onMapClicked}
            style={{width: '70%', height: '100vh', position: 'relative', float: 'right', }}
            styles={MapStyle}
            initialCenter={{
              lat: 52.237496,
              lng: 14.53649}}
            zoom={16}
            disableDefaultUI= {true}>
          <Marker onClick={this.onMarkerClick}
                  name={'Current location'}
                  icon= {''}
                />

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
              <div>
                <h1>{this.state.selectedPlace.name}</h1>
                <p>Peace</p>
              </div>
          </InfoWindow>
        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDsZEO7Dc8lob_6KKaF6inDyMBkUBIf0HQ"
}) (MapContainer)
