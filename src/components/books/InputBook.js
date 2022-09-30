import React, {useState} from 'react'
import './Books.css'
function InputBook({i,author,setAuthor,title,setTitle,books,setBooks}) {
    
const [dAuthor, setdAuthor] = useState(author[i]||'')
const [dTitle, setdTitle] = useState(title[i]||'')

const getTitle=()=>{
    let a = title
    a[i] = dTitle
    setTitle(a)
    a = books
    a[i].title = dTitle
    setBooks(a)
}

const getAuthor=()=>{
    let a = author
    a[i] = dAuthor
    setAuthor(a)
    a = books
    a[i].author = dAuthor
    setBooks(a)

}

    return (
        
            <div className='inputBookList'>
                <input type='text' placeholder='title' value={dTitle} onBlur={getTitle} onChange={(e)=>setdTitle(e.target.value)}/>
                <input type='text' placeholder='author' value={dAuthor} onBlur={getAuthor} onChange={(e)=>setdAuthor(e.target.value)}/>
            </div>
        
    )
}

export default InputBook
