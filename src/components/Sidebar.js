import React, { Component } from 'react';
import PropTypes from 'prop-types'
import '../App.css';

class Sidebar extends Component {
  static propTypes = {
    filterLocations: PropTypes.array.isRequired
  }

  render() {
    const { filterLocations } = this.props

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

        {filterLocations.map((location, index) => {
          return (
            <li
              key={location.name}
              className='Sidebar-locations'
              onClick={e => this.props.onClick(e.target.value)}
              >
              <a href="#"
                >{location.name}
              </a>
            </li>
          )
        })
        }

      </div>
    )
  }
}

//NOTE:
//<a href="#" onClick={this.props.onClick()}>
//onClick={e => this.props.onClick(e.target.value)}

Sidebar.PropTypes = {
  locations: PropTypes.array.isRequired
}

export default Sidebar;
