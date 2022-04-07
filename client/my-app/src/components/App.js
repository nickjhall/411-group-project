import React, { Component } from 'react';
import '../css/App.css';
import WeatherSearch from "./WeatherSearch"

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>This is the CS411 project client</h2>
          <WeatherSearch />
        </div>
      </div>
    );
  }
}

export default App;