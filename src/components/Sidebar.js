import React, { Component } from 'react';
import PropTypes from 'prop-types'
import '../App.css';

class Sidebar extends Component {
  static propTypes = {
    filterLocations: PropTypes.array.isRequired
  }

  render() {
    const { filterLocations, tabIndex } = this.props

    var sidebarListElements = filterLocations.map((item) => {
      // uses same function as Map.js to match results
      return (
        <li
          tabIndex={tabIndex}
          className='Sidebar-location'
          id={item.id}
          role="link"
          onClick={e => this.props.onClick(item.name)}
          key={item.name}
          >
          {item.name}
        </li>
      )
    })

    return (
      <div className='App-sidebar'>

        <h1 className='App-title'>My Neighborhood</h1>
        <br />
        <div className='filter' id="filter-input">
        <input
          role='searchbox'
          tabIndex='0'
          className='filter-locations'
          type='text'
          placeholder='Filter locations'
          value={this.props.query}
          onChange={e => this.props.onChange(e.target.value)}
        />
        </div>

        <div
          className='Sidebar-locations'>
        {sidebarListElements.length ? sidebarListElements : <p>No locations available</p>}
      </div>

      </div>
    )
  }
}

Sidebar.propTypes = {
  filterLocations: PropTypes.array.isRequired
}

export default Sidebar;
