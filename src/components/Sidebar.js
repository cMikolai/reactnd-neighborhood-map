import React, { Component } from 'react';
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp';
import '../App.css';
import Locations from '../Locations.json';

class Sidebar extends Component {
  static propTypes = {
    locations: PropTypes.array.isRequired,
  }

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  render() {
    const { locations } = this.props
    const { query } = this.state

    let filterLocations
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      filterLocations = Locations.filter((location) => match.test(location.name))
    } else {
      filterLocations = Locations
    }

    return (
      <div className="App-sidebar">

        <h1 className="App-title">My Neighborhood</h1>
        <br />
        <div className="filter">
        <input
          className='filter-locations'
          type='text'
          placeholder='Filter locations'
          value={query}
          onChange={(event) => this.updateQuery(event.target.value)}
        />
        </div>

        {filterLocations.map((location) => {
          return (
            <li
              className="Sidebar-locations"
              onClick=''>
              {location.name} </li>
          )
        })
        }
      </div>
    )
  }
}

Sidebar.PropTypes = {
  locations: PropTypes.array.isRequired
}

export default Sidebar;
