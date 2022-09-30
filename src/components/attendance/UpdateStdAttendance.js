import React, { useState, useEffect } from 'react'
import { RadioGroup, Radio } from 'react-radio-group'
import { useParams, useHistory } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import { HOST_URL } from '../../config'
import { useQuery } from 'react-query'
import { useStateValue } from '../../StateProvider';

const fetchUpdateStudentAttendance = async (key, id) => {
    const res = await fetch(`${HOST_URL}/api/staff/updatestudentattendance/${id}`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
    })
    return res.json();
}


function UpdateStdAttendance() {
    const [{ user }, dispatch] = useStateValue()
    const history = useHistory()
    const { id } = useParams()
    const [week, setWeek] = useState('')
    const [Monday, setMonday] = useState()
    const [Tuesday, setTuesday] = useState()
    const [Wednesday, setWednesday] = useState()
    const [Thursday, setThursday] = useState()
    const [Friday, setFriday] = useState()
    const [isLoading, setIsLoading] = useState()

    const [attendance, setAttendance] = useState([])
    const [stdDetails, setStdDetails] = useState({})
    const [calendar, setCalendar] = useState()

    // React query fecth data
    const { data, status } = useQuery(['UpdateStudentAttendance', id], fetchUpdateStudentAttendance)


    useEffect(() => {

        if (!data) return

        setAttendance(data.studentAttendance.attendance)
        setStdDetails(data.studentAttendance)
        setCalendar(data.calendar)
        setWeek(data.calendar.week)



    }, [data])

    useEffect(() => {

        const attend = attendance.filter(item => item.week === week)

        if (!attend[0]) {
            setMonday(null)
            setTuesday(null)
            setWednesday(null)
            setThursday(null)
            setFriday(null)
        }
        attend[0]?.attendance.map(item => {

            switch (item.day) {
                case 'Monday':

                    setMonday(item.value)
                    break;

                case 'Tuesday':
                    setTuesday(item.value)
                    break;

                case 'Wednesday':
                    setWednesday(item.value)
                    break;

                case 'Thursday':
                    setThursday(item.value)
                    break;

                case 'Friday':
                    setFriday(item.value)
                    break;

                default:
                    return
            }

        })

    }, [week])


    const onSubmit = async (e) => {
        e.preventDefault();

        if (!Monday || !Tuesday || !Wednesday || !Thursday || !Friday) return alert('Please Select a value for all field')

        setIsLoading(true)
        const response = await fetch(`${HOST_URL}/api/staff/student-weekly-attendance`, {
            method: 'put',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                id,
                week,
                attendance: [
                    { day: 'Monday', value: Monday },
                    { day: 'Tuesday', value: Tuesday },
                    { day: 'Wednesday', value: Wednesday },
                    { day: 'Thursday', value: Thursday },
                    { day: 'Friday', value: Friday }
                ]


            })
        })
        const data = await response.json()
        
        if (data.error) {
            setIsLoading(false)

            alert(data.error)
        } else {

            setIsLoading(false)
            alert(data.message)
            history.goBack()

        }

    }

    function changeWeekAction(e) {
        setWeek(e.target.value)

    }

    return (
        <div>
            <h3>Update Student Attendance For {stdDetails?.term === 1 ? '1st' : stdDetails?.term === 2 ? '2nd' : stdDetails.term === 3 ? '3rd' : ''} term {stdDetails?.year - 1}/{stdDetails?.year} Session </h3>
            <h5><span>Student Name:</span> {stdDetails.studentDetails?.firstname}  {stdDetails.studentDetails?.lastname}</h5>
            <h5><span>Student Class:</span> {stdDetails.studentDetails?.stdClass} </h5>
            <div className="form-group">
                <div className="form-group-display">
                    <label htmlFor="week">Current Week</label>


                    <select className="form-control" name="week" id="week" onChange={(e) => changeWeekAction(e)} value={week} disabled={user?.role !== "admin" && true}>

                        <option value="One">Week 1</option>
                        <option value="Two">week 2</option>
                        <option value="Three">week 3</option>
                        <option value="Four">week 4</option>
                        <option value="Five">week 5</option>
                        <option value="Six">week 6</option>
                        <option value="Seven">week 7</option>
                        <option value="Eight">week 8</option>
                        <option value="Nine">week 9</option>
                        <option value="Ten">week 10</option>
                        <option value="Eleven">week 11</option>
                        <option value="Twelve">week 12</option>
                        <option value="Thirteen">week 13</option>
                        <option value="Fourteen">week 14</option>
                        <option value="Holiday">Holiday</option>

                    </select>

                </div>

            </div>

            <form onSubmit={onSubmit} encType="multipart/form-data">

                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }} >
                    <div className="form-radio" >
                        <label >Monday </label>
                        <RadioGroup className='radio-group' name="attentiveness" selectedValue={Monday} onChange={(value) => setMonday(value)}>
                            <Radio value="Present" className='ml-4 mr-1' />Present
                            <Radio value="Absent" className='ml-4 mr-1' />Absent
                            <Radio value="Mid Term Break" className='ml-4 mr-1' />Mid Term Break
                            <Radio value="Public Holiday" className='ml-4 mr-1' />Public Holiday

                        </RadioGroup>
                    </div>

                    <div className="form-radio" >
                        <label >Tuesday </label>
                        <RadioGroup className='radio-group' name="honesty" selectedValue={Tuesday} onChange={(value) => setTuesday(value)}>
                            <Radio value="Present" className='ml-4 mr-1' />Present
                            <Radio value="Absent" className='ml-4 mr-1' />Absent
                            <Radio value="Mid Term Break" className='ml-4 mr-1' />Mid Term Break
                            <Radio value="Public Holiday" className='ml-4 mr-1' />Public Holiday
                        </RadioGroup>
                    </div>
                    <div className="form-radio" >
                        <label >Wednesday</label>
                        <RadioGroup className='radio-group' name="politeness" selectedValue={Wednesday} onChange={(value) => setWednesday(value)}>
                            <Radio value="Present" className='ml-4 mr-1' />Present
                            <Radio value="Absent" className='ml-4 mr-1' />Absent
                            <Radio value="Mid Term Break" className='ml-4 mr-1' />Mid Term Break
                            <Radio value="Public Holiday" className='ml-4 mr-1' />Public Holiday
                        </RadioGroup>
                    </div>
                    <div className="form-radio" >
                        <label >Thursday </label>
                        <RadioGroup className='radio-group' name="neatness" selectedValue={Thursday} onChange={(value) => setThursday(value)}>
                            <Radio value="Present" className='ml-4 mr-1' />Present
                            <Radio value="Absent" className='ml-4 mr-1' />Absent
                            <Radio value="Mid Term Break" className='ml-4 mr-1' />Mid Term Break
                            <Radio value="Public Holiday" className='ml-4 mr-1' />Public Holiday
                        </RadioGroup>
                    </div>
                    <div className="form-radio" >
                        <label >Friday </label>
                        <RadioGroup className='radio-group' name="punctuality" selectedValue={Friday} onChange={(value) => setFriday(value)}>
                            <Radio value="Present" className='ml-4 mr-1' />Present
                            <Radio value="Absent" className='ml-4 mr-1' />Absent
                            <Radio value="Mid Term Break" className='ml-4 mr-1' />Mid Term Break
                            <Radio value="Public Holiday" className='ml-4 mr-1' />Public Holiday
                        </RadioGroup>
                    </div>


                </div>

                {isLoading ?
                    <button className='btn btn-primary btn-block'>
                        <Loader type="TailSpin" color="#FFF" height={20} width={20} />
                    </button>
                    :
                    <button type='submit' className='btn btn-primary btn-block'>Submit</button>
                }

            </form>
        </div>
    )
}

export default UpdateStdAttendance