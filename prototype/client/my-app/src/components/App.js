import React, { Component } from 'react';
import '../css/App.css';
import RestaurantSearch from './RestaurantSearch';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Restaurant Search</h2>
          <RestaurantSearch />
        </div>
      </div>
    );
  }
}

export default App;