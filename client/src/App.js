import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import {checkForAdminToken} from './actions/authActions';

import store from './store';
import './App.css';
import AdminLogin from "./components/AdminAuth/AdminLogin"


checkForAdminToken()
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
          <Route path="/" exact component={AdminLogin}/>
        </div>
        </BrowserRouter>
      </Provider>

    );
  }
}

export default App;
