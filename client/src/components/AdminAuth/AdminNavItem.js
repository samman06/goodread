import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";

class AdminNavItem extends Component {
    render() {
        const { activeTab, onClick } = this.props;
        return (
            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '1' })}
                            onClick={() => { onClick('1') }}
                        >
                            Categories
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => { onClick('2') }}
                        >
                            Books
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: activeTab === '3' })}
                            onClick={() => { onClick('3') }}
                        >
                            Authors
                        </NavLink>
                    </NavItem>
                </Nav>
            </div>
        );
    }
}

export default AdminNavItem
