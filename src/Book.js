import React, {Component} from 'react';

class Book extends Component{

  render(){
    const book=this.props.book;
    const options=[{value:"currentlyReading",
                    label:"Currently Reading"},
                   {value:"wantToRead",
                    label:"Want to Read"},
                   {value:"read",
                    label:"Read"},
                    {value:"none",
                     label:"None"}];
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url(${book.imageLinks.smallThumbnail})` }}></div>
          <div className="book-shelf-changer">

            <select defaultValue={book.shelf} onChange={(event) => this.props.onMoveBook(book,event.target.value)}>
              <option value="none" disabled>Move to...</option>
              {
                options.map( (opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))
              }
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    )


  }
}
export default Book;
