import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';

import * as BooksAPI from './BooksAPI';

class SearchBooks extends Component{
  state = {
    query: '',
    searchResult: [],
    bookShelves: []
  }

  componentDidMount() {
      BooksAPI.getAll().then((books) => {
      let   bookShelves =books.reduce((shelves,book) =>{
        shelves[book.id]=book.shelf;
        return shelves;
      },{});
      this.setState({bookShelves:bookShelves});
      })
    }

  updateQuery = (query) => {
    const q=query.trim();
    if (q) {
      this.setState({ query: query.trim()});
      BooksAPI.search(q,1000).then((books) => {
        if(books){
          let bookResults=books.reduce((res,b)=> {
            let shelf=this.state.bookShelves[b.id];
            if(shelf){
              b.shelf=shelf;
            }else{
              b.shelf='none';
            }
            res.push(b);
            return res;
          },[]);
          this.setState({searchResult: bookResults});
        }else{
          this.setState({ searchResult: []});
        }

      });
    }
  }
  moveBook = (book,shelf) => {
    if(shelf !== 'none'){
      BooksAPI.update(book,shelf);
    }
  }
   render(){
    const { query , searchResult } = this.state
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text"
             placeholder="Search by title or author"
             value={query}
             onChange={(event) => this.updateQuery(event.target.value)}/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchResult
              .map( (book)=>(
                <li key={book.id}>
                  <Book book={book} onMoveBook={this.moveBook}/>
                </li>
              ))
            }
          </ol>
        </div>
      </div>
    )
  }
}
export default SearchBooks;
