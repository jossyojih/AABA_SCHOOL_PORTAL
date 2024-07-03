import React, { useEffect, useState } from 'react'
import './Books.css'

function UpdateBookList({ i, book, books, setBooks, done, setDone }) {

    const [dAuthor, setdAuthor] = useState(book.author)
    const [dTitle, setdTitle] = useState(book.title)

    const getTitle = () => {
        const a = books
        a[i].title = dTitle
        setBooks(a)
    }

    const getAuthor = () => {
        const a = books
        a[i].author = dAuthor
        setBooks(a)
    }

    return (

        <div className='inputBookList'>
            <div className="form-group">
                <label>title</label>
                <input type='text' placeholder='title' value={dTitle} onBlur={getTitle} onChange={(e) => setdTitle(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Author</label>
                <input type='text' placeholder='author' value={dAuthor} onBlur={getAuthor} onChange={(e) => setdAuthor(e.target.value)} />
            </div>
        </div>

    )
}

export default UpdateBookList
