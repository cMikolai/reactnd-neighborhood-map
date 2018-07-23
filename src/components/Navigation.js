import React, { Component } from 'react';
import Sidebar from './Sidebar';
import '../App.css';

class Navigation extends Component {
  state = {
    locations: []
  }

  render() {
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
                locations={this.state.locations} />
              </ul>
            </div>
          </nav>
        </header>
      </div>
    )
  }
}

export default Navigation;
