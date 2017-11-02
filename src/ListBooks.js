import React , {Component} from 'react';
import BookShelf from './BookShelf';
import * as BooksAPI from './BooksAPI';


class ListBooks extends Component {

  state = {
   books: []
  }

  componentDidMount() {
      BooksAPI.getAll().then((books) => {
        this.setState({books});
      })
    }
    moveBook = (book,shelf) => {
      BooksAPI.update(book,shelf);

      BooksAPI.getAll().then((books) => {
        this.setState({books});
      })
    }
  render(){
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookShelf title="Want to Read" shelf="wantToRead" books={this.state.books} onMoveBook={this.moveBook}/>
          <BookShelf title="Currently Reading" shelf="currentlyReading" books={this.state.books} onMoveBook={this.moveBook}/>
          <BookShelf title="Read" shelf="read" books={this.state.books} onMoveBook={this.moveBook}/>
        </div>
        <div className="open-search">
          <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
        </div>
      </div>
    )
  }
}

export default ListBooks;
