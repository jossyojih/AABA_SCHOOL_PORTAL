import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useStateValue } from '../../StateProvider';
import { HOST_URL } from '../../config'
import { useQuery } from 'react-query'
import StdPortalNav from '../navbar/StdPortalNav';
import './Books.css'

const fetchStudentBook = async (key, id) => {
  const res = await fetch(`${HOST_URL}/api/users/studentbook/${id}`, {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("jwt")
    }
  })
  return res.json();
}

function BookList() {
  const [{ user }, dispatch] = useStateValue()
  const { id } = useParams()
  const [books, setBooks] = useState([])
  const [dataError, setDataError] = useState()
  const history = useHistory()

  // React query fecth data
  const { data, status } = useQuery(['StudentBook', id], fetchStudentBook)


  useEffect(() => {

    if (!data) return

    if (data.error) {
      setDataError(true)
      alert(data.error)
      localStorage.setItem("route", `/studentportal/studentbook/${id}`)
      const student = JSON.parse(localStorage.getItem("student"))
      if (student) return history.push(`/studentportal/studentprofile/${id}`)

    }
    setBooks(data.bookList?.list)

  }, [data])

  //  useEffect(() => {
    // const abortController = new AbortController()
    // const signal = abortController.signal
  //     fetch(`http://localhost:5000/studentbook/${id}`,{

  //          headers:{
  //           "Authorization":"Bearer "+ localStorage.getItem("jwt")
  //          },
  //         signal:signal
  //      }).then(res=>res.json())
  //      .then(result=>{
  //        if(result.error){
  //          alert(result.error)
  //        }
  //          console.log(result)
  //         setData(result.student)
  //         //setSubject(result.subjects)

  //      }).catch(err=>{
  //          console.log(err)
  //      }) 
        //  return () => {
        //  abortController.abort()
        // };
  //  }, [])

  return (
    <div className='studentbooklist'>

      <StdPortalNav id={id} />

      <h3>Student Book Status</h3>
      <h5>Name Of Student: {data?.firstname} {data?.middlename} {data?.lastname}</h5>
      <h5>Section: {data?.section}</h5>
      <h5>Class: {data?.stdClass}</h5>

      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">List Of Books</h6>

          {/* Admin Edit BookList */}
          {user?.role === 'admin' &&
            <>
              {dataError ?
                <h6 className="m-0 font-weight-bold text-primary ml-auto" onClick={() => history.goBack()} style={{ cursor: 'pointer' }}>Back</h6> :
                <h6 className="m-0 font-weight-bold text-primary ml-auto" onClick={() => history.push(`/adminportal/studentbookupdate/${data?._id}`)} style={{ cursor: 'pointer' }}>Edit</h6>}
            </>}
          {/* Class teacher Edit BookList */}
          {user?.role === 'staff' &&
            <>
              {dataError ?
                <h6 className="m-0 font-weight-bold text-primary ml-auto" onClick={() => history.goBack()} style={{ cursor: 'pointer' }}>Back</h6> :
                <h6 className="m-0 font-weight-bold text-primary ml-auto" onClick={() => history.push(`/staffportal/studentbookupdate/${data?._id}`)} style={{ cursor: 'pointer' }}>Edit</h6>}
            </>}
        </div>
        <div className="card-body">
          <div className="table-responsive"></div>
          <table className="table table-bordered" id="dataTable" width="80%" cellSpacing="0">
            <thead>
              <tr>
                <th>Title</th><th>Author</th><th>Book Condition</th>
              </tr>

            </thead>
            <tbody>
              {books?.map((book, i) => {
                return (
                  <tr key={i}>
                    <td>{book.title}</td><td>{book.author}</td><td>{book.condition}</td>
                  </tr>
                )
              }
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default BookList
