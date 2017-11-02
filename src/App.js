import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';


class BooksApp extends React.Component {
  state = {
    showSearchPage: false
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooks />
        ) : (
          <ListBooks />
        )}
      </div>
    )
  }
}

export default BooksApp
