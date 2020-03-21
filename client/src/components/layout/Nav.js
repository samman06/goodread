import React, {Component} from 'react';
import '../../App.css';
import {Link} from "react-router-dom";

class Nav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
        }
    }

    logout = () => {
        localStorage.removeItem("userToken");
        window.location = "http://localhost:3000/";
    };

    componentDidMount() {
        if (!localStorage.getItem('userToken')) window.location = "http://localhost:3000/";
    }

    updateSearch = (event) => {
        console.log(event.target.value);
        this.setState({
            searchValue: event.target.value,
        })
    };

    searchForResult = (event) => {
        window.location = "http://localhost:3000/search/" + this.state.searchValue;
    };

    render() {
        return (

            <div className='container-fluid navIBack '>
                <nav className="mb-1 navIBack navbar navbar-expand-lg navbar-dark orange lighten-1">
                    <Link to={'/home/'} className="navbar-brand">GoodReads
                    </Link>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent-555">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link to={'/home/'} className="nav-link">Home
                                    <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/categories/'} className="nav-link">Categories

                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/books/'} className="nav-link">Books
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/authors/'} className="nav-link">Authors
                                </Link>
                            </li>
                            <li className="nav-item moveinput" style={{width: 300}}>
                                <input className="form-control" type="text"
                                       placeholder="Search" aria-label="Search"
                                       onChange={this.updateSearch}
                                       value={this.state.searchValue}
                                />
                            </li>
                            <li className="nav-item ">
                                <button style={{background: "none", border: "none"}}
                                        className="nav-link"
                                        onClick={this.searchForResult}
                                >Search
                                </button>
                            </li>
                        </ul>

                        <ul className="navbar-nav ml-auto nav-flex-icons moveAvata">

                            <li className="nav-item avatar">
                                <a className="nav-link p-0" href="#">
                                    <img src="https://mdbootstrap.com/img/Photos/Avatars/avatar-5.jpg"
                                         className="rounded-circle z-depth-0" alt="avatar image" height="35"/>
                                </a>
                            </li>
                            <li className="nav-item ">
                                <a className="nav-link" href="#">
                                    User Name
                                </a>
                            </li>
                            <li className="nav-item " width="25">
                                <button style={{background: "none", border: "none"}}
                                        className="nav-link"
                                        onClick={this.logout}>Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>

        );
    }
}

export default Nav;
