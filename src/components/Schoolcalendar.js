import React, { useState, useEffect } from 'react';
import { HOST_URL } from '../config'
import { useQuery, usePaginatedQuery } from 'react-query'
import Loader from 'react-loader-spinner'

const fetchSchoolCalendar = async (key) => {
    const res = await fetch(`${HOST_URL}/api/admin/school-calendar`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
    })
    return res.json();
}


function SchoolCalendar() {
    const [term, setTerm] = useState(0)
    const [week, setWeek] = useState('One')
    const [year, setYear] = useState()
    const [active, setActive] = useState(false)
 


    // React query fecth data
    const { data, status } = useQuery(['Calendar'], fetchSchoolCalendar)

    useEffect(() => {
        if (!data) return
console.log(data)
        setActive(data.active)
        setYear(data.year)
        setTerm(data.term)
        setWeek(data.week)
    }, [data])


    return (
        <div className='schoolCalendar'>

            <h3 className="text-center mb-3">School Calendar</h3>

            <div className="form-group">
                <div className="form-group-display">
                    <label htmlFor="term">Status</label>
                    <span>{active ? 'Active' : 'Inactive'}
                        {/* {!active &&
                       
                        <span style={{ cursor: 'pointer' }} className='text-primary ml-5' onClick={() => setChangeTerm(true)}>Activate</span>
                    } */}
                    </span>


                </div>
            </div>
            <div className="form-group">
                <div className="form-group-display">
                    <label htmlFor="year">School Session</label>
                    <span>{`${year}/${year + 1}`}  </span>
                </div>

            </div>
            <div className="form-group">
                <div className="form-group-display">
                    <label htmlFor="term">Term</label>
                    <span>{term === 1 ? 'First Term' : term === 2 ? 'Second Term' : 'Third Term'} </span>

                </div>
            </div>
            <div className="form-group">
                <div className="form-group-display">
                    <label htmlFor="week">Current Week</label>
                    <span>{week} </span>
                </div>

            </div>


        </div>

    );
}

export default SchoolCalendar;
