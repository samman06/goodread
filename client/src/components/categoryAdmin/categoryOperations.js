import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getCategories, addCategory, editCategory, deleteCategory } from "../../actions/categoryActions";
import CategoryItem from "./CategoryItem";
import AddCategoryModal from "./addCategoryModal";

class CategoryOperations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addModal: false,
            name: "", categoryId: "",
        };
    }

    componentDidMount = async () => await this.props.getCategories();
    onChange = ({ target }) => this.setState({ [target.name]: target.value });
    openAddModal = () => {
        const addModal = !this.state.addModal;
        this.setState({ addModal });
    };
    addCategory = async () => {
        const {payload} = await this.props.addCategory({name: this.state.name});
        if (payload._id) this.setState({addModal: false,})
    };
    deleteCategory = async (id) => await this.props.deleteCategory(id);
    render() {
        const { addModal } = this.state;
        const { categories } = this.props.category;
        const { errors } = this.props;
        console.log(errors);
        return (
            <div className="col-sm-12">
                <AddCategoryModal
                    isOpen={addModal} errors={errors}
                    onChange={this.onChange}
                    openAddModal={this.openAddModal}
                    addCategory={this.addCategory}
                />
                <CategoryItem
                    categories={categories}
                    deleteCategory={this.deleteCategory}
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
const mapStateToProps = ({ auth, errors, category }) => ({ auth, errors, category });
export default connect(mapStateToProps, { getCategories, addCategory, editCategory, deleteCategory })(CategoryOperations);