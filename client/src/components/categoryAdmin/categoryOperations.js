import React, {Component} from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {getCategories, addCategory, editCategory, deleteCategory} from "../../actions/categoryActions";
import CategoryItem from "./CategoryItem"

class CategoryOperations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "", categoryId: "",
        };
    }

    componentDidMount = async () => await this.props.getCategories();

    render() {
        const {categories} = this.props.category;
        const {errors} = this.props;
        console.log(errors);
        return (
            <div className="col-sm-12">
                
                <CategoryItem
                    categories={categories}
                />
            </div>
        );
    }
}

CategoryOperations.protoTypes = {
    getCategories: PropTypes.func.isRequired,
    addCategory: PropTypes.func.isRequired,
    editCategory: PropTypes.func.isRequired,
    deleteCategory: PropTypes.func.isRequired,
    category: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};
const mapStateToProps = ({auth, errors, category}) => ({auth, errors, category});
export default connect(mapStateToProps, {getCategories, addCategory, editCategory, deleteCategory})(CategoryOperations);