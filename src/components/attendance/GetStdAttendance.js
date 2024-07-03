import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import StudentAttendanceSummary from './StdAttendanceSummary'
import { HOST_URL } from '../../config'
import { useQuery } from 'react-query'
import "./attendance.css"
import { useStateValue } from '../../StateProvider';
import StdPortalNav from '../navbar/StdPortalNav'

const fetchStudentAttendance = async (key, id) => {
  const res = await fetch(`${HOST_URL}/api/users/studentattendance/${id}`, {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("jwt")
    }
  })
  return res.json();
}

function StudentTermAttendance() {
  const [{ user }, dispatch] = useStateValue()
  const { id } = useParams()
  const history = useHistory()
  const [attendance, setAttendance] = useState([])
  const [attendanceRecord, setAttendanceRecord] = useState([])
  const [stdDetails, setStdDetails] = useState({})
  // React query fecth data
  const { data, status } = useQuery(['StudentAttendance', id], fetchStudentAttendance)


  useEffect(() => {

    if (!data) return

    setAttendance(data.studentAttendance.attendance)

    setStdDetails(data.studentAttendance)


  }, [data])


  // useEffect(() => {
  //   const abortController = new AbortController()
  //   const signal = abortController.signal
  //     fetch(`http://localhost:5000/student/termattendance/${id}`,{
  //         headers:{
  //          "Authorization":"Bearer "+ localStorage.getItem("jwt")
  //         }, 
  //            signal:signal
  //     }).then(res=>res.json())
  //     .then(result=>{
  //      console.log(result)
  //       setData(result.results)



  //     }).catch(err=>{
  //         console.log(err)
  //     }) 
  //      return () => {
  //        abortController.abort()
  //       };
  // }, [])

  return (
    <div className='student_term_attendance'>
      <StdPortalNav id={id} />
      <h3>Student Attendance For {stdDetails?.term === 1 ? '1st' : stdDetails?.term === 2 ? '2nd' : stdDetails.term === 3 ? '3rd' : ''} term {stdDetails?.year - 1}/{stdDetails?.year} Session </h3>
      <h5><span>Student Name:</span> {stdDetails.studentDetails?.firstname}  {stdDetails.studentDetails?.lastname}</h5>
      <h5><span>Student Class:</span> {stdDetails.studentDetails?.stdClass} </h5>
      <div className='termAttendance'>
        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
          <thead>
            <tr>
              <th>Week</th>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
            </tr>
          </thead>

          <tbody>
            <>
              {attendance.map(data => {
                // First iteration to Get the week Data
                return (
                  <tr key={data._id}>

                    <td style={{ color: 'blue', fontWeight: 'bolder' }}>{data.week}</td>
                    {
                      data.attendance.map(item => {
                        // Second Iteration to Get the record for each week
                        return (
                          <td className={item.value !== 'Present' ? 'text-danger' : 'text-success'}>{item.value}</td>
                        )
                      })
                    }

                  </tr>

                )
              })}
              <tr>
                <td colspan="6">
                  {user?.role === 'admin' &&
                    <button className="btn btn-primary btn-block" onClick={() => history.push(`/adminportal/updatestudentattendance/${id}`)}  > Update Student Register  </button>

                  }
                  {user?.role === 'staff' &&
                    <button className="btn btn-primary btn-block" onClick={() => history.push(`/staffportal/updatestudentattendance/${id}`)}  > Update Student Register  </button>

                  }
                </td>
              </tr>
            </>
          </tbody>
        </table>


        <StudentAttendanceSummary id={id} data={attendance} />
      </div>
    </div>

  )
}

export default StudentTermAttendance
