import React, { useEffect, useState } from 'react'
import { HOST_URL } from '../../config'
import { useQuery } from 'react-query'
import { Link, useHistory } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';

const fetchSchoolEvents = async (key) => {
  const res = await fetch(`${HOST_URL}/api/admin/school-event-calendar`, {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("jwt")
    }
  })
  return res.json();
}

function SchoolEvents() {
  const [{ user }, dispatch] = useStateValue()
  const history = useHistory()
  const [events, setEvents] = useState([])
  const [session, setSession] = useState()
  const [term, setTerm] = useState()

  // React query fecth data
  const { data, status } = useQuery(['StudentSchoolEvent'], fetchSchoolEvents)

  useEffect(() => {
    if (!data) return
    if (!data.event && user.role === 'student') {
      alert('No Event calendar for this term yet. please contact School Management')
      history.goBack()

    } else if (!data.event) {
      return
    } else {
      setSession(data.event.year)
      setTerm(data.event.term)
      setEvents(data.event.events)
    }

  }, [data])
  return (
    <div className='studentbooklist'>

      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">CALENDAR OF EVENT FOR {term || ''}{term === 1 ? 'st' : term === 2 ? 'nd' : 'rd'} TERM {session - 1||''}/{session} SESSION</h6>

          {user?.role === 'admin' &&
            <Link to={'/adminportal/updateschoolevents'}>
              <h6 className="m-0 font-weight-bold text-primary">Edit</h6>
            </Link>
          }

        </div>
        <div className="card-body">
          <div className="table-responsive"></div>
          <table className="table table-bordered" id="dataTable" width="80%" cellSpacing="0">
            <thead>
              <tr>
                <th>WEEK</th><th>DATE</th><th>Activity</th>
              </tr>

            </thead>
            <tbody>
              {events?.map((event, i) => {
                return (
                  <tr>
                    <td>{event.week}</td><td>{event.date}</td><td>{event.activity}</td>
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

export default SchoolEvents