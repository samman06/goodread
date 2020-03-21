import React, {Component} from 'react';
import {connect} from "react-redux"
import PropTypes from "prop-types"
import {Card, CardTitle, ListGroupItem, ListGroup} from 'reactstrap';
import {getBooks} from "../../actions/bookActions";
import {getCategories} from "../../actions/categoryActions";
import {getAuthors} from "../../actions/authorActions";


class PopularItems extends Component {
    componentDidMount = async () => {
        await this.props.getBooks();
        await this.props.getCategories();
        await this.props.getAuthors();

    };

    render() {
        const {category, book, author} = this.props;
        let popularCategories, popularAuthors, popularBooks;
        if (category.categories)
            popularCategories = category.categories.slice(0, 3).map(({_id, name}) =>
                <ListGroupItem key={_id}>{name}</ListGroupItem>);
        if (book.books)
            popularBooks = book.books.slice(0, 3).map(({_id, name}) =>
                <ListGroupItem key={_id}>{name}</ListGroupItem>);
        if (author.authors)
            popularAuthors = author.authors.slice(0, 3).map(({_id, firstName, lastName}) =>
                <ListGroupItem key={_id}>{firstName + " " + lastName}</ListGroupItem>);
        return (
            <div className='col-lg-7 col-md-7 col-sm-7 col-xs-7 cola '>
                <div className="row">
                    <div className='marg col-6'>
                        <Card body>
                            <CardTitle>Popular Authors</CardTitle>
                            <ListGroup>
                                {popularAuthors}
                            </ListGroup>
                        </Card>
                    </div>
                    <div className="col-6">
                        <Card body>
                            <CardTitle>Popular Books</CardTitle>
                            <ListGroup>
                                {popularBooks}
                            </ListGroup>
                        </Card>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <Card body>
                            <CardTitle>Popular Categories</CardTitle>
                            <ListGroup>
                                {popularCategories}
                            </ListGroup>
                        </Card>
                    </div>
                </div>
            </div>

        );
    }
}

PopularItems.protoTypes = {
    getCategories: PropTypes.func.isRequired,
    getBooks: PropTypes.func.isRequired,
    getAuthors: PropTypes.func.isRequired,
    category: PropTypes.object.isRequired,
    author: PropTypes.object.isRequired,
    book: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
};
const mapStateToProps = ({author, category, book}) => ({author, category, book});

export default connect(mapStateToProps, {getBooks, getAuthors, getCategories})(PopularItems);
//90
