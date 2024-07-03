import React, { useState, useEffect } from 'react';
import { useStateValue } from '../../StateProvider';
import InputBook from './InputBook'
import './Books.css'
import ConfirmBookList from './ConfirmBookList'
import { useQuery } from 'react-query'
import Loader from 'react-loader-spinner'
import UpdateBookList from './UpdateClassBookList';
import { useHistory } from 'react-router-dom'
import { HOST_URL } from '../../config'
import SelectClass from '../SelectClass';

const fetchBookList = async (key, bookClass) => {
  if (!bookClass) return
  const res = await fetch(`${HOST_URL}/api/admin/book-list/${bookClass}`, {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("jwt")
    }
  })
  return res.json();
}


function CreateBookList() {
  const history = useHistory()
  const [{ user }, dispatch] = useStateValue()
  const [inputFields, setInputFields] = useState(1)
  const [books, setBooks] = useState([])
  const [bookClass, setBookClass] = useState('')
  const [author, setAuthor] = useState([])
  const [title, setTitle] = useState([])
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [id, setId] = useState('')
  const [update, setUpdate] = useState(false)
  const [done, setDone] = useState(false)

  // React query fecth data
  const { data, status } = useQuery(['StudentList', bookClass], fetchBookList)

  useEffect(() => {
    const staff = JSON.parse(localStorage.getItem("staff"))
    if (staff) {
      // console.log(staff.classTeacher)
      setBookClass(staff.classTeacher)
    }
  }, [])



  useEffect(() => {
    if (!bookClass) return
    if (!data) return
    // Book list data from query
    // console.log(data[0].list[0])
    if (!data[0]) {
      setStep(1)
      const book = []
      for (let i = 0; i < inputFields; i++) {
        book.push({
          author: '',
          title: '',
        })
      }
      setBooks(book)
      setIsLoading(false)
    } else {
      setId(data[0]._id)
      setBooks(data[0].list)
      setUpdate(true)
      setStep(3)
    }
    // setBooks(data)
  }, [data])


  useEffect(() => {

    const book = []
    for (let i = 0; i < inputFields; i++) {
      book.push({
        author: author[i],
        title: title[i],
      })
    }
    setBooks(book)

  }, [inputFields])

  function handleInputs() {
    console.log(books)
    setStep(2)
  }


  const saveBook = async () => {

    const bookList = books.filter(x => x.author || x.title)

    if (!bookList[0]) return alert("Please Enter Title and Author of a Book.")

    const response = await fetch(`${HOST_URL}/api/admin/newbooklist`, {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        bookClass,
        books: bookList,
      })
    })
    const data = await response.json()
    alert(data.message)
    history.goBack()

  }
  const updateBookList = async () => {

    const bookList = books.filter(books => books.author !== '' || books.title !== '')
    if (!bookList[0]) return alert("Please Enter Title and Author of a Book.")

    const response = await fetch(`${HOST_URL}/api/admin/booklist/${id}`, {
      method: 'put',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        bookClass,
        books: bookList,
      })
    })
    const data = await response.json()
    console.log(data)
    alert('Book List Updated Succesfully')
    history.goBack()

  }

  const addBook = (e) => {
    e.preventDefault();

    if (update) {
      setBooks(prev => [...prev, { author: '', title: '' }])
      setDone(false)
    } else {
      setInputFields(inputFields => inputFields + 1)
    }


  };


  return (
    <div className='bookList'>
      <h3>Create List Of Books For Each Class</h3>
      {
        (step === 1 && user?.role === 'admin') &&
        <div className="form-group">
          <SelectClass
            section={''}
            stdClass={bookClass}
            setStdClass={setBookClass}
          />
        </div>
      }

      {
        (bookClass && step === 1) && <div>
          {
            books?.map((boo, i) => <InputBook
              key={i}
              i={i}
              title={title}
              setTitle={setTitle}
              author={author}
              setAuthor={setAuthor}
              books={books}
              setBooks={setBooks}
            />
            )
          }
        </div>
      }
      {(bookClass && step === 2) && <ConfirmBookList
        books={books}
        step={step} />
      }
      {step === 3 && <div>
        {
          books?.map((book, i) => <UpdateBookList
            key={i}
            i={i}
            book={book}
            books={books}
            setBooks={setBooks}
            done={done}
            setDone={setDone}
          />
          )
        }
      </div>
      }

      <div className='bookList_btn'>
        {step === 1 ? <><button className="btn btn-primary btn-block" onClick={addBook} disabled={!bookClass && true}> Add another book  </button>
          <button className="btn btn-primary btn-block" onClick={() => handleInputs()} disabled={!bookClass && true}> Done  </button>
        </> : step === 2 ?
          <><button onClick={() => setStep(1)} className="btn btn-primary btn-block">Back</button>
            <button onClick={update ? updateBookList : saveBook} className="btn btn-primary btn-block">Save Book List</button>
          </> : <>
            <button className="btn btn-primary btn-block" onClick={addBook} disabled={!bookClass && true}> Add another book  </button>
            {done ? <button onClick={updateBookList} className="btn btn-primary btn-block">Save</button> :
              <button onClick={() => setDone(true)} className="btn btn-primary btn-block">Done</button>
            }
          </>
        }
      </div>
    </div >
  );
}

export default CreateBookList;
