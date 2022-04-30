import React, { Component } from 'react';
import '../css/App.css';
import RestaurantSearch from './RestaurantSearch';
import LoginButton from './LoginButton';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Restaurant Search</h2>
          <LoginButton />
          <RestaurantSearch />
        </div>
      </div>
    );
  }
}

export default App;