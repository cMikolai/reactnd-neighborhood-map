import React, { Component } from 'react';
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp';
import logo from '../logo.svg';
import '../App.css';

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
      filterLocations = locations.filter((location) => match.test(location.name))
    } else {
      filterLocations = locations
    }

    return (
      <div className="Sidebar">

        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">My Neighborhood</h1>
        <br />
        <input
          className='filter-locations'
          type='text'
          placeholder='Filter locations'
          value={query}
          onChange={(event) => this.updateQuery(event.target.value)}
        />

        <ol className='location-list'>
          {filterLocations.map((location) => (
            <li key={location.name} className='locations-list-item'>
            </li>
          ))}
        </ol>

      </div>
    )
  }
}

Sidebar.PropTypes = {
  locations: PropTypes.array.isRequired
}

export default Sidebar;
