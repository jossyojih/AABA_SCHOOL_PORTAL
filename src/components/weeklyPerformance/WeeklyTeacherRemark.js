import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import { HOST_URL } from '../../config'
import Loader from 'react-loader-spinner'
import { useQuery } from 'react-query'
import './performance.css'

const fetchStudentWeekPerformance = async (key, id) => {
    const res = await fetch(`${HOST_URL}/api/users/weeklyperformancereport/${id}`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
    })
    return res.json();
}


function WeeklyTeacherRemark() {
    const [stdDetails, setStdDetails] = useState({})
    const [calendar, setCalendar] = useState()
    const [teacherRemark, setTeacherRemark] = useState()
    const { id } = useParams()
    const history = useHistory()
    const [isLoading, setIsLoading] = useState()


    // React query fecth data
    const { data, status } = useQuery(['StudentWeekPerformance', id], fetchStudentWeekPerformance)

    useEffect(() => {

        if (!data) return

        setStdDetails(data.weeklyPerformance.studentDetails)
        setCalendar(data.calendar)
        setTeacherRemark(data.weeklyPerformance.teacherComment?.comment)


    }, [data])

    // useEffect(() => {
    //     if(!result?.teacherComment) return
    //     setTeacherComment(result.teacherComment?.comment)
    // }, [result])


    async function onSubmit(e) {
        e.preventDefault()
        const staff = JSON.parse(localStorage.getItem("staff"))
        if (!staff) return alert('Un-Authorized')

        let teacherComment = {
            teacherName: `${staff.firstname} ${staff.lastname}`,
            comment: teacherRemark
        }
        if (!teacherRemark) return alert('Please Enter a comment')
        if (window.confirm("Do you want to update teacher remarks")) {
            setIsLoading(true)
            const response = await fetch(`${HOST_URL}/api/staff/weekly-teacher-remark`, {
                method: 'put',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    studentDetails: id,
                    teacherComment
                })
            })
            const data = await response.json()
            console.log(data)

            if (data.error) {
                setIsLoading(false)

                alert(data.error)
            } else {

                setIsLoading(false)
                alert(data.message)
                history.goBack()

            }
        }

    }


    return (
        <div className="form-box">

            <h3>Enter Teacher Comment About This Student Performance For week {calendar?.week}</h3>
            <h5><span>Student Name:</span> {stdDetails.firstname} {stdDetails.middlename} {stdDetails.lastname}</h5>
            <h5><span>Student Section:</span> {stdDetails.section}</h5>
            <h5><span>Student Class:</span> {stdDetails.stdClass}</h5>

                <div className="form-group">
                    <div className="form-group-display">
                        <label>Teacher's Remark</label>
                        <textarea className="form-control" name="teacher's comment" value={teacherRemark} placeholder="Enter Teacher's comment" onChange={(e) => setTeacherRemark(e.target.value)}
                            rows="3" required wrap='hard'></textarea>
                    </div>

                </div>
                <div className='bookList_btn'>
                    <button onClick={() => history.goBack()} className='btn btn-primary btn-block'>Go Back</button>
                    {isLoading ?

                        <button className='btn btn-primary btn-block'>
                            <Loader type="TailSpin" color="#FFF" height={20} width={20} />
                        </button>
                        :
                        <button onClick={onSubmit} className='btn btn-primary btn-block'>Submit</button>
                    }

                </div>
        </div>
    );
}

export default WeeklyTeacherRemark;
