import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Sidebar from './Sidebar';
import '../App.css';

class Navigation extends Component {
  static propTypes = {
    filterLocations: PropTypes.array.isRequired,
    onKeyPressed: PropTypes.func.isRequired,
    toggleNavigation: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired
  }

  render() {
    const { filterLocations, onKeyPressed, toggleNavigation, active } = this.props

    return (
      <div>
        <div className="App-nav-container">
          <nav className="App-navigation navigation">

              <div id="menuToggle"
                className="button"
                role="button"
                tabIndex="0"
                onKeyDown={(e) => onKeyPressed(e)}
                onClick={toggleNavigation}>
                <span></span>
                <span></span>
                <span></span>
                </div>

              <ul id="menu"
                className={active ? 'hidden' : 'visible'}
                onKeyDown={(e) => onKeyPressed(e)}
                >
                <Sidebar
                  // Navigation is mainly used as a container, passing functions down to Sidebar
                filterLocations={filterLocations}
                onChange={this.props.updateQuery}
                onClick={this.props.onSidebarLinkClick}
                tabIndex={this.props.tabIndex}
              />
              </ul>

          </nav>
        </div>
      </div>
    )
  }
}

export default Navigation;
