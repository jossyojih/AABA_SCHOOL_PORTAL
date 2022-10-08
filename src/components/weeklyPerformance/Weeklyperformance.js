import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { HOST_URL } from '../../config'
import { useQuery } from 'react-query'
import { useStateValue } from '../../StateProvider';
import AffectiveDomain from '../student/result/AffectiveDomain';
import './performance.css'
import SubjectPerformance from './SubjectPerformance';
import PsychomotoPerformance from './PsychomotoPerformance';
import WeeklyGradeScale from './WeeklyGradeScale';


const fetchStudentWeekPerformance = async (key, id) => {
    const res = await fetch(`${HOST_URL}/api/users/weeklyperformancereport/${id}`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
    })
    return res.json();
}
function Weeklyperformance() {
    const [{ user }, dispatch] = useStateValue()
    const [stdDetails, setStdDetails] = useState({})
    const [subjectPerformance, setSubjectPerformance] = useState()
    const [psychomotoPerformance, setPsychomotoPerformance] = useState()
    const [teacherComment, setTeacherComment] = useState()
    const [calendar, setCalendar] = useState()
    const { id } = useParams()
    const history = useHistory()
    const [result, setResult] = useState()

    // React query fecth data
    const { data, status } = useQuery(['StudentWeekPerformance', id], fetchStudentWeekPerformance)

    useEffect(() => {

        if (!data) return

        setStdDetails(data.weeklyPerformance.studentDetails)
        setCalendar(data.calendar)
        setSubjectPerformance(data.weeklyPerformance.academicPerformance)
        setPsychomotoPerformance(data.weeklyPerformance.psychomoto)
        setTeacherComment(data.weeklyPerformance.teacherComment)

    }, [data])

    return (
        <div className='weekly_performance'>
            <h3>Student Performance Report For week {calendar?.week}</h3>
            {/* {stdDetails?.term === 1 ? '1st' : stdDetails?.term === 2 ? '2nd' : stdDetails.term === 3 ? '3rd' : ''} term {stdDetails?.year - 1}/{stdDetails?.year} Session </h3> */}
            <h5><span>Student Name:</span> {stdDetails.firstname} {stdDetails.middlename} {stdDetails.lastname}</h5>
            <h5><span>Student Section:</span> {stdDetails.section}</h5>
            <h5><span>Student Class:</span> {stdDetails.stdClass}</h5>


            <div className='performance_data'>
                <SubjectPerformance
                    data={subjectPerformance}
                />
                <PsychomotoPerformance
                    data={psychomotoPerformance}
                />
                <WeeklyGradeScale />
            </div>

            <div className='displayComment'>
                <table className="table table-bordered" id="dataTable" cellSpacing="0">
                    <tbody>
                        <tr>
                            <th >Teacher's Remark</th>
                            <td >{teacherComment?.comment} </td>
                        </tr>
                        <tr>
                            <th >Teacher’s Name:</th>
                            <td >{teacherComment?.teacherName}</td>
                        </tr>

                    </tbody>
                </table>
            </div>
            {
                user?.role === 'staff' &&
                <div className='bookList_btn'>
                    <button className="btn btn-primary btn-block" onClick={() => history.push(`/staffportal/editsubjectperformance/${id}?section=${stdDetails.section}`)}> Edit Subject Performance  </button>
                    <button className="btn btn-primary btn-block" onClick={() => history.push(`/staffportal/editweeklypsychomoto/${id}?section=${stdDetails.section}`)} >Edit Psychomoto</button>
                    <button className="btn btn-primary btn-block" onClick={() => history.push(`/staffportal/editweeklyteachercomment/${id}?section=${stdDetails.section}`)} >Edit teacher remark</button>



                </div>
            }

        </div>
    )
}

export default Weeklyperformance