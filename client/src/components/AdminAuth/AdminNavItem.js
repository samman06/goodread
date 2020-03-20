import React, { Component } from 'react';
import { Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";

class AdminNavItem extends Component {
    render() {
        return (
            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink className={classnames({ active: true })} >
                            Categories
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classnames({ active: false })}>
                            Books
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classnames({ active: false })}                        >
                            Authors
                        </NavLink>
                    </NavItem>
                </Nav>
            </div>
        );
    }
}

export default AdminNavItem
