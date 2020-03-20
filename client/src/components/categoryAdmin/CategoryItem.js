import React, {Component} from 'react';
import {Table} from "reactstrap";

class CategoryItem extends Component {

    render() {
        const {categories} = this.props;
        let allCategories;
        if (categories) {
            allCategories = categories.map((category, index) =>
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td key={index}>
                        {category.name}
                    </td>
                    <td>
                        <button value={JSON.stringify(category)} type="button"
                                name="edit" className="btn btn-info"
                        >Edit
                        </button>
                        {" "}
                        <button value={index} type="button" className="btn btn-danger">Delete
                        </button>
                    </td>
                </tr>);
        }
        return (
            <Table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Category name</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {allCategories}
                </tbody>
            </Table>
        );
    }
}


export default CategoryItem;
