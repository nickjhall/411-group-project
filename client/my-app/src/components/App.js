import React, { Component } from 'react';
import '../css/App.css';
import RestaurantSearch from './RestaurantSearch';
import LoginButton from './LoginButton';
import Planner from './Planner';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Restaurant Search</h2>
          <LoginButton />
          <RestaurantSearch />
          <Planner />
        </div>
      </div>
    );
  }
}

export default App;