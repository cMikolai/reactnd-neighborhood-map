import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import PropTypes from 'prop-types'
import '../App.css';
//Style made by https://snazzymaps.com/style/38/shades-of-grey
import MapStyle from '../MapStyle.json';

export class MapContainer extends Component {
  static propTypes = {
    filterLocations: PropTypes.array.isRequired,
    onSidebarLinkClick: PropTypes.func.isRequired,
    onMarkerClick: PropTypes.func.isRequired,
    onMapClicked: PropTypes.func.isRequired,
    selectedPlace: PropTypes.object.isRequired,
    showingInfoWindow: PropTypes.bool.isRequired
  }

  render() {
    const { filterLocations, onMapClicked, onMarkerClick, selectedPlace, activeMarker, showingInfoWindow } = this.props

    var markers = filterLocations.map((item) => {
      // filters locations and creates a marker for them
      return (
        <Marker
          title={item.name} // needed for filtering markers
          //foo={(()=>console.log(location.id))()}
          key={item.id}
          id={item.id}
          onClick={onMarkerClick}
          name={item.name}
          icon={{
            path: this.props.google.maps.SymbolPath.CIRCLE,
            scale: 8
          }}
          animation={activeMarker ?
            (item.name == activeMarker.title ? '1' : '0') : '0'}
          position={{
          lat: item.location.lat,
          lng: item.location.lng }}
          address={item.location.address}
         />
      )
    })

    return (
      <div className="Map-container" role="application">
        <Map google={this.props.google}
            className={'Map'}
            onClick={onMapClicked}
            style={{width: '100%', height: '100%', position: 'relative', float: 'right' }}
            styles={MapStyle}
            initialCenter={{
              lat: 51.509,
              lng: -0.127}}
            zoom={16}
            disableDefaultUI={true}>

          {markers.length ? markers : <p>No locations available</p>}

          <InfoWindow
            marker={activeMarker}
            visible={showingInfoWindow}>
              <div
                style={{color: '#000'}}>
                <h1
                  tabIndex={'0'}>{selectedPlace.name}</h1>
                <p
                  tabIndex={'0'}>{selectedPlace.address}</p>
                <p className="App-src"
                  tabIndex={'0'}>Informations by
                  <a href="https://foursquare.com"
                  tabIndex={"-1"}> Foursquare.com</a></p>
              </div>
          </InfoWindow>

        </Map>
      </div>
    )
  }
}

Map.PropTypes = {
  locations: PropTypes.array.isRequired
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDsZEO7Dc8lob_6KKaF6inDyMBkUBIf0HQ"
}) (MapContainer)
