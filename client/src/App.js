import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            hello from client
        </div>
        </BrowserRouter>
      </Provider>

    );
  }
}

export default App;
