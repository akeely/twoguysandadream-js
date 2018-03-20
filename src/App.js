import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios/index";

class App extends Component {

  getOwner() {
      axios.get(`${process.env.REACT_APP_SERVER}:8080/api/owner/me`)
          .then((response) => this.setState({name: response.name}));
  }

  componentDidMount() {
    this.getOwner();
  }

  render() {

    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to TwoGuysAndADream.com</h2>
        </div>
        <p className="App-intro">
          Welcome ${this.getState().name}.
        </p>
      </div>
    );
  }
}

export default App;
