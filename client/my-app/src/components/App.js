import React, { Component } from 'react';
import '../css/App.css';
import { BrowserRouter ,Routes, Route, Link } from 'react-router-dom';
import Home from "./Home"
import LoginButton from './LoginButton';
import Profile from './Profile';
import SelectPlan from './SelectPlan';
import MyPlans from './MyPlans';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <div className="App">
                <div className="App-header">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/login" element={<LoginButton />} />
                        <Route path="/profile" element={<Profile/>} />
                        <Route path="/selectPlan" element={<SelectPlan/>} />
                        <Route path="/myPlans" element={<MyPlans/>} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
  }
}

export default App;