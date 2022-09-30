import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { HOST_URL } from '../../config'
import { useQuery } from 'react-query'
import StdPortalNav from '../navbar/StdPortalNav';
import './Books.css'
import UpdateBookListStatus from './UpdateStudentBookListStatus';
import Loader from 'react-loader-spinner'

const fetchStudentBook = async (key, id) => {
    const res = await fetch(`${HOST_URL}/api/users/studentbook/${id}`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
    })
    return res.json();
}

function UpdateStudentBookStatus() {
    const { id } = useParams()
    const [books, setBooks] = useState([])
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(false)

    // React query fecth data
    const { data, status } = useQuery(['StudentBook', id], fetchStudentBook)

    //  useEffect(() => {

    //      localStorage.setItem("route", `/studentportal/studentbook/${id}`)
    //      const student = JSON.parse(localStorage.getItem("student"))
    //  }, [])


    useEffect(() => {

        if (!data) return

        // console.log(data.bookList.list)
        setBooks(data.bookList.list)

    }, [data])



    const updateBook = async () => {
        setIsLoading(true)
        const response = await fetch(`${HOST_URL}/api/admin/studentbooklist/${id}`, {
            method: 'put',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                books,

            })
        })
        const data = await response.json()
        alert('book status updated succesfully')
        setIsLoading(false)
        console.log(data)
        history.goBack()
    }

    return (
        <div className='studentbooklist'>
            <StdPortalNav id={id} />

            <h3>Student Book Status</h3>
            <h5>Name Of Student: {data?.firstname} {data?.middlename} {data?.lastname}</h5>
            <h5>Section: {data?.section}</h5>
            <h5>Class: {data?.stdClass}</h5>

            <table class="table table-bordered" id="dataTable" width="80%" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Author</th><th>Title</th><th>Condition</th>
                    </tr>

                </thead>
                <tbody>
                    {books?.map((book, i) => <UpdateBookListStatus
                        key={i}
                        i={i}
                        book={book}
                        books={books}
                        setBooks={setBooks}
                    />

                    )}
                </tbody>
            </table>
            {isLoading ? <button className="btn btn-primary btn-block"><Loader type="TailSpin" color="#FFF" height={20} width={20} /></button> :
                <button onClick={updateBook} className="btn btn-primary btn-block">Update</button>

            }

        </div>
    )
}
export default UpdateStudentBookStatus;
