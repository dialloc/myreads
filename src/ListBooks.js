import React , {Component} from 'react';
import BookShelf from './BookShelf';
import { Link } from 'react-router-dom';
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
      if(shelf !== 'none'){
        BooksAPI.update(book,shelf);
      //  const listBooks=this.state.books;
      //  listBooks.filter((b) => b.id === book.id).map((b)=>b.shelf=shelf);
        BooksAPI.getAll().then((books) => {
          this.setState({books});
        });
      }
    }
  render(){
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookShelf title="Currently Reading" shelf="currentlyReading" books={this.state.books} onMoveBook={this.moveBook}/>
          <BookShelf title="Want to Read" shelf="wantToRead" books={this.state.books} onMoveBook={this.moveBook}/>
          <BookShelf title="Read" shelf="read" books={this.state.books} onMoveBook={this.moveBook}/>
        </div>
        <div className="open-search">
        <Link to='/search' onClick={() => this.setState({ showSearchPage: true })}>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks;
