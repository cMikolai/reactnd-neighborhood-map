import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Sidebar from './Sidebar';
import '../App.css';

class Navigation extends Component {
  static propTypes = {
    filterLocations: PropTypes.array.isRequired
  }

  render() {
    const { filterLocations } = this.props

    return (
      <div>
        <header className="App-header">
          <nav className="App-navigation navigation">
            <div id="menuToggle">
            <input type="checkbox" className="nav-input"/>
              <span></span>
              <span></span>
              <span></span>

              <ul id="menu">
                <Sidebar
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
