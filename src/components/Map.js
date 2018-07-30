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
    activeMarker: PropTypes.object.isRequired,
    showingInfoWindow: PropTypes.bool.isRequired
  }

  render() {

    const { filterLocations, onMarkerClick, onMapClicked, selectedPlace, activeMarker, showingInfoWindow } = this.props

    return (
      <div className="Map-container">
        <Map google={this.props.google}
            onClick={onMapClicked}
            style={{width: '100%', height: '100%', position: 'relative', float: 'right' }}
            styles={MapStyle}
            initialCenter={{
              lat: 40.742513,
              lng: -73.99188}}
            zoom={16}
            disableDefaultUI= {true}>


          {filterLocations.map((item) => {
            return (
              <Marker
                title={item.name} // used for filtering markers
                //foo={(()=>console.log(item.location.lat))()}
                key={item.id}
                id={item.id}
                onClick={onMarkerClick}
                name={item.name}
                animation={this.props.google.maps.Animation.DROP}
                position={{
                  lat: item.location.lat,
                  lng: item.location.lng
                }}
                address={item.location.address}/>
            )
          })
          }

          <InfoWindow
            marker={activeMarker}
            visible={showingInfoWindow}>
              <div>
                <h1>{selectedPlace.name}</h1>
                <p>{selectedPlace.address}</p>
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
