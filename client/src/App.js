import React, {Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import {Provider} from 'react-redux';
import {checkForAdminToken} from './actions/authActions';

import store from './store';
import './App.css';

import Footer from "./components/layout/Footer";
import Nav from "./components/layout/Nav";

import AdminLogin from "./components/AdminAuth/AdminLogin"
import AdminControl from "./components/AdminAuth/AdminControl"

import UsrSignUp from "./components/auth/UsrSignUp";
import UsrLogin from "./components/auth/UsrLogin";

import TableContent from "./components/home/TableContent";


checkForAdminToken()

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div className="App">
                        <Route path='/' exact component={UsrLogin}/>
                        <Route path='/' exact component={UsrSignUp}/>

                        <Route path='/home' exact component={Nav}/>
                        <Route path='/home' exact component={TableContent}/>
                        <Route path='/home' exact component={Footer}/>

                        <Route path='/' exact component={Footer}/>
                        <Route path="/admin" exact component={AdminLogin}/>
                        <Route path="/admincontrols" exact component={AdminControl}/>
                    </div>
                </BrowserRouter>
            </Provider>

        );
    }
}

export default App;
