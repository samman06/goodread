import React, {Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import {Provider} from 'react-redux';
import {checkForAdminToken,checkForUserToken} from './actions/authActions';

import store from './store';
import './App.css';

import Footer from "./components/layout/Footer";
import Nav from "./components/layout/Nav";

import AdminLogin from "./components/AdminAuth/AdminLogin"
import AdminControl from "./components/AdminAuth/AdminControl"

import UsrSignUp from "./components/auth/UsrSignUp";
import UsrLogin from "./components/auth/UsrLogin";

import TableContent from "./components/home/TableContent";
import Categories from "./components/category/categories";
import CategoryBooks from "./components/category/categoryBooks";

import Books from "./components/book/books";
import BookProfile from "./components/book/bookprofil";

import Authors from "./components/author/authors";
import AuthorProfile from "./components/author/authorprofile";

// checkForAdminToken();
checkForUserToken()
class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div className="App">
                        <Route path='/' exact component={UsrLogin}/>
                        <Route path='/' exact component={UsrSignUp}/>
                        <Route path='/' exact component={Footer}/>

                        <Route path='/home' exact component={Nav}/>
                        <Route path='/home' exact component={TableContent}/>
                        <Route path='/home' exact component={Footer}/>

                        <Route path='/categories' exact component={Nav}/>
                        <Route path='/categories' exact component={Categories}/>
                        <Route path='/categories' exact component={Footer}/>

                        <Route path='/categories/:id/' exact component={Nav}/>
                        <Route path='/categories/:id/' exact component={CategoryBooks}/>
                        <Route path='/categories/:id/' exact component={Footer}/>

                        <Route path='/books' exact component={Nav}/>
                        <Route path='/books' exact component={Books}/>
                        <Route path='/books' exact component={Footer}/>

                        <Route path='/books/:id' exact component={Nav}/>
                        <Route path='/books/:id' exact component={BookProfile}/>
                        <Route path='/books/:id' exact component={Footer}/>

                        <Route path='/authors' exact component={Nav}/>
                        <Route path='/authors' exact component={Authors}/>
                        <Route path='/authors' exact component={Footer}/>

                        <Route path='/authors/:id' exact component={Nav}/>
                        <Route path='/authors/:id' exact component={AuthorProfile}/>
                        <Route path='/authors/:id' exact component={Footer}/>

                        <Route path="/admin" exact component={AdminLogin}/>
                        <Route path="/admincontrols" exact component={AdminControl}/>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
