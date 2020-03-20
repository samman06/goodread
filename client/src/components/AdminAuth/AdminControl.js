import React, {Component} from 'react';
import {TabContent, TabPane} from "reactstrap";
import AdminNavItem from "./AdminNavItem"

class AdminControl extends Component {
    constructor(props) {
        super(props);
        this.state = {activeTab: '1'};
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
                <div className="col-lg-12">
                    <AdminNavItem activeTab={activeTab} onClick={this.toggle}/>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1" className="row">
                            <div>catefgory section</div>
                        </TabPane>
                        <TabPane tabId="2" className="row">
                            <div>book section</div>
                        </TabPane>
                        <TabPane tabId="3" className="row">
                        <div>author section</div>
                        </TabPane>
                    </TabContent>
                </div>
            </div>
        );
    }
}

export default AdminControl;
// 96
