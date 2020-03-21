import React, {Component} from 'react';

class SideBar extends Component {
    render() {
        return (
            <ul className="nav flex-column">
                <li className="nav-item mt-5 mb-4">
                    <button className="btn btn-success" onClick={this.props.all}>all</button>
                </li>
                <li className="nav-item mb-4">
                    <button className="btn btn-success" onClick={this.props.read}>Read</button>
                </li>
                <li className="nav-item mb-4">
                    <button className="btn btn-success" onClick={this.props.currentlyRead}>Currently Reading</button>
                </li>
                <li className="nav-item mb-4">
                    <button className="btn btn-success" onClick={this.props.wantToRead}>Want to Read</button>
                </li>
            </ul>
        );
    }
}

export default SideBar;
