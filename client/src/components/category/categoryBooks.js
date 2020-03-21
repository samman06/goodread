import React, {Component} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {getCategoryBooks} from "../../actions/categoryActions";

class CategoryBooks extends Component {
    constructor(props) {
        super(props);
        this.catId = this.props.match.params.id;
        console.log(this.catId);
    }

    componentDidMount = async () => await this.props.getCategoryBooks(this.catId);

    render() {
        const {category, books} = this.props.category;
        console.log(books);
        let allBooks, categoryName;
        if (category) categoryName = category.name;
        if (books) {
            allBooks =
                <div>
                    {books.map((book, index) =>
                        <div className="thumb" key={index}>
                            <div className="card">
                                <img style={{width: 200, height: 100}}
                                     src={"http://localhost:4000/" + book.photo}
                                     alt="Card image cap"/>
                                <div className="card-body">
                                    <div className="card-title">
                                        <Link to={"/books/" + book._id}>
                                            {book.name}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
        }
        return (
            <div>
                <h1>{categoryName} category name TODO</h1>
                {allBooks}
            </div>
        );
    }
}
CategoryBooks.protoTypes = {
    getCategoryBooks: PropTypes.func.isRequired,
    category: PropTypes.object.isRequired,
};
const mapStateToProps = ({category}) => ({category});
export default connect(mapStateToProps, {getCategoryBooks})(CategoryBooks);
