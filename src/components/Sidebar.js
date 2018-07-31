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

        <h1 className='App-title'>Places in London</h1>
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

        <div
          className='Sidebar-locations'>

        { filterLocations.map(item=> {
          return (
            <li
              key={item.id}
              className='Sidebar-location'
              id={item.id}
              onClick={e => this.props.onClick(item.name)}
              >
              {item.name}</li>
          )
        })
        }

      </div>

      </div>
    )
  }
}

Sidebar.PropTypes = {
  locations: PropTypes.array.isRequired
}

export default Sidebar;
