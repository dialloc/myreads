import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';


class BooksApp extends React.Component {
  state = {
    showSearchPage: false
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks />
        )}/>
        <Route exact path='/search' render={({ history }) => (
          <SearchBooks
            onSearch={() => {
              history.push('/')
            }}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
