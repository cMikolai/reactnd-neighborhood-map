import React, { Component } from 'react';
import PropTypes from 'prop-types'
import '../App.css';

class Sidebar extends Component {
  static propTypes = {
    filterLocations: PropTypes.array.isRequired,
    updateQuery: PropTypes.func.isRequired
  }

  render() {
    const { filterLocations, updateQuery } = this.props

    return (
      <div className='App-sidebar'>

        <h1 className='App-title'>My Neighborhood</h1>
        <br />
        <div className='filter'>
        <input
          className='filter-locations'
          type='text'
          placeholder='Filter locations'
          value={this.props.query}
          onChange={e => this.props.onChange(e.target.value)}
        />
        </div>

        {filterLocations.map((location) => {
          return (
            <li
              key={location.name}
              className='Sidebar-locations'>
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
