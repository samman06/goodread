import React, {Component} from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {getCategories, addCategory, editCategory, deleteCategory} from "../../actions/categoryActions";
import CategoryItem from "./CategoryItem"
import AddCategoryModal from "./addCategoryModal"
import EditCategoryModal from "./editCategoryModal";

class CategoryOperations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addModal: false, editModal: false,
            name: "", categoryId: "",
        };
    }

    componentDidMount = async () => await this.props.getCategories();

    onChange = ({target}) => this.setState({[target.name]: target.value});
    openAddModal = () => {
        const addModal = !this.state.addModal;
        this.setState({addModal});
    };
    parseCategoryData = async (target) => {
        if (target.name === "edit") {
            const {name, _id} = await JSON.parse(target.value);
            this.setState({name, categoryId: _id});
        }
    };
    addCategory = async () => {
        const {payload} = await this.props.addCategory({name: this.state.name});
        if (payload._id) this.setState({addModal: false,})
    };
    openEditModal = async (target) => {
        await this.parseCategoryData(target);
        const editModal = !this.state.editModal;
        this.setState({editModal});
    };
    editCategory = async () => {
        const {name, categoryId} = this.state;
        const {message} = await this.props.editCategory(categoryId, {name});
        if (message) this.setState({name: "", editModal: false});
    };
    deleteCategory = async (id) => await this.props.deleteCategory(id);

    render() {
        const {name, addModal, editModal} = this.state;
        const {categories} = this.props.category;
        const {errors} = this.props;
        return (
            <div className="col-sm-12">
                <AddCategoryModal
                    isOpen={addModal} errors={errors}
                    onChange={this.onChange}
                    openAddModal={this.openAddModal}
                    addCategory={this.addCategory}
                />
                <EditCategoryModal
                    name={name} errors={errors}
                    isOpen={editModal}
                    onChange={this.onChange}
                    openEditModal={this.openEditModal}
                    editCategory={this.editCategory}
                />
                <CategoryItem
                    categories={categories}
                    deleteCategory={this.deleteCategory}
                    openEditModal={this.openEditModal}
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
