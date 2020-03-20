import React, {Component} from 'react';
import {TabContent, TabPane} from "reactstrap";
import '../../Styles/AdminPanel.css';
import AdminNavItem from "./AdminNavItem";
import CategoryOperations from "../categoryAdmin/categoryOperations";
import AuthorOperations from "../authorAdmin/authorOperations";
import BookOperations from "../bookAdmin/bookOperations";

class AdminControl extends Component {
    constructor(props) {
        super(props);
        this.state = {activeTab: '2'};
    };

    toggle = (activeTab) => {
        if (this.state.activeTab !== activeTab) this.setState({activeTab});
    };

    componentDidMount() {
        if (!localStorage.getItem('adminToken')) window.location = "http://localhost:3000/admin";
    };

    render() {
        const {activeTab} = this.state;
        return (
            <div className="row container-fluid">
                <div className="col-lg-12 AdminPanelControls">
                    <AdminNavItem activeTab={activeTab} onClick={this.toggle}/>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1" className="row">
                            <CategoryOperations/>
                        </TabPane>
                        <TabPane tabId="2" className="row">
                            <BookOperations/>
                        </TabPane>
                        <TabPane tabId="3" className="row">
                            <AuthorOperations/>
                        </TabPane>
                    </TabContent>
                </div>
            </div>
        );
    }
}

export default AdminControl;
// 96
