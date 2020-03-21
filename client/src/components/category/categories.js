import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {getCategories} from "../../actions/categoryActions";


class Categories extends Component {

    componentDidMount = async () => await this.props.getCategories();

    render() {
        const {categories} = this.props.category;
        let allCategories;
        if (categories) {
            allCategories = categories.map(({name, _id}) =>
                <tr key={_id}>
                    <th><Link to={`/categories/${_id}/`}>{name}</Link></th>
                </tr>
            )
        }
        return (
            <div style={{textAlign: "center"}}>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Category name</th>
                    </tr>
                    </thead>
                    <thead>
                    {allCategories}
                    </thead>
                </table>
            </div>
        );
    }
}

Categories.protoTypes = {
    getCategories: PropTypes.func.isRequired,
    category: PropTypes.object.isRequired,
};
const mapStateToProps = ({category}) => ({category});
export default connect(mapStateToProps, {getCategories})(Categories);
