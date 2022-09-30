import React, { useEffect, useState } from 'react'
import { useParams, useHistory,useLocation } from 'react-router-dom'
import { HOST_URL } from '../../config'
import { useQuery } from 'react-query'

const fetchStudentSubjects = async (key, section) => {
  const res = await fetch(`${HOST_URL}/api/users/studentsubjects/${section}`, {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("jwt")
    }
  })
  return res.json();
}

function StudentSubjects() {
  const { section } = useParams()
  const [subjects, setSubjects] = useState([])

  // React query fecth data
  const { data, status } = useQuery(['StudentSubjects', section], fetchStudentSubjects)

  useEffect(() => {
  
    if (!data) return
    setSubjects(data.subjects)


  }, [data])

  return (
    <div>
      <h3>Student Subjects For {data?.section} </h3>
        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
          <thead>
            <tr>
              <th>S/N</th>
              <th colSpan={2}>Subjects</th>
            </tr>
          </thead>

          <tbody>
            <>
              {subjects?.map((data, i) => {
                // First iteration to Get the week Data
                return (
                  <tr key={i}>
                    <td style={{ color: 'blue', fontWeight: 'bolder' }}>{i + 1}</td>
                    <td colSpan={2} >{data}</td>

                  </tr>

                )
              })}
         
            </>
          </tbody>
        </table>

      </div>
      )
}

      export default StudentSubjects