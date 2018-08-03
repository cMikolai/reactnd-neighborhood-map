import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Sidebar from './Sidebar';
import '../App.css';

class Navigation extends Component {
  static propTypes = {
    filterLocations: PropTypes.array.isRequired,
    onKeyPressed: PropTypes.func.isRequired
  }

  render() {
    const { filterLocations, onKeyPressed } = this.props

    return (
      <div>
        <header className="App-header">
          <nav className="App-navigation navigation">
            <div id="menuToggle" tabIndex="0" onKeyDown={(e) => onKeyPressed(e)}>
              <input type="checkbox" className="nav-input"/>
              <span></span>
              <span></span>
              <span></span>

              <ul id="menu">
                <Sidebar
                  // Navigation is mainly used as a container, passing functions down to Sidebar
                filterLocations={filterLocations}
                onChange={this.props.updateQuery}
                onClick={this.props.onSidebarLinkClick}
              />
              </ul>
            </div>
          </nav>
        </header>
      </div>
    )
  }
}

export default Navigation;
