import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import ReportSheetSummary from './ReportSheetSummary';
// import StudentAttendanceSummary from './StudentAttendanceRegister/StudentAttendanceSummary';
import SchoolHeader from '../../Reuseables/SchoolHeader'
import moment from 'moment'
import GradeAnalysis from './GradeAnalysis';
// import GradeScale from './Result/GradeScale';
// import AffectiveDomain from '../Result/AffectiveDomain';
import { useStateValue } from '../../../StateProvider';
import { HOST_URL } from '../../../config'
import { useQuery, usePaginatedQuery } from 'react-query'
import AffectiveDomain from './AffectiveDomain';
import GradeScale from './GradeScale';
import StudentAttendanceSummary from './StudentAttendanceSummary';
import DisplayComment from './DisplayComment';

const fetchStudentResult = async (key, id) => {
    const res = await fetch(`${HOST_URL}/api/users/student-result/${id}`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
    })
    return res.json();
}

function StudentResult() {
    const [{ user }, dispatch] = useStateValue()
    const history = useHistory()
    const { id } = useParams()
    const [result, setResult] = useState({})
    const [scores, setScores] = useState([])
    const [studentDetails, setStudentDetails] = useState({})
    const year = new Date().getFullYear()
    const [preview, setPreview] = useState(false)
    const [termStart,setTermStart] = useState(new Date())

    // React query fecth data
    const { data, status } = useQuery(['StudentResult', id], fetchStudentResult)

    useEffect(async () => {
        const res = await fetch(`${HOST_URL}/api/users/student-result/${id}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
        const data = await res.json();

        console.log(data)
        if (!data?.result) {
            alert('This student has no result for this term yet')

            if (user.role === 'super-admin' || user.role === 'admin') {
                history.push(`/adminportal/studentprofile/${id}`)
            } else if (user.role === 'staff') {
                history.push(`/staffportal/studentprofile/${id}`)
            } else {
                history.push(`/studentportal/studentprofile/${id}`)
            }

        }

        setResult(data.result)
        setScores(data.result?.scores)
        setStudentDetails(data.stdDetails)
        setTermStart(data?.termStart.termStart)
        
        console.log(data)
    }, [])

    // useEffect(() => {

    //     if (!data) return

    //     console.log(data)
    //     if (!data?.result) {
    //         alert('This student has no result for this term yet')

    //         if (user.role === 'super-admin' || user.role === 'admin') {
    //             history.push(`/adminportal/studentprofile/${id}`)
    //         } else if (user.role === 'staff') {
    //             history.push(`/staffportal/studentprofile/${id}`)
    //         } else {
    //             history.push(`/studentportal/studentprofile/${id}`)
    //         }

    //     }

    //     setResult(data.result)
    //     setScores(data.result?.scores)
    //     setStudentDetails(data.stdDetails)
    //     setTermStart(data?.termStart.termStart)

    // }, [data])




    return (
        <div className={`studentResult`}>
            <SchoolHeader
                data={studentDetails} />
            <h5>{result?.term === 1 ? 'First' : result?.term === 2 ? 'Second' : 'Third'} Term Student's Report Sheet</h5>
            <div className='studentInfo'>
                <div className='studentName'>
                    <h4>Name: {studentDetails.firstname || ''} {studentDetails.lastname || ''} {studentDetails.middlename || ''}</h4>
                    <h4>Reg. No: {studentDetails.user?.username.toUpperCase()}</h4>
                </div>
                <div className='studentAcad'>
                    <h4>DOB: {moment(studentDetails.DOB).format('MMMM Do YYYY')}</h4>
                    <h4 className='center2'>Gender: {studentDetails?.sex}</h4>
                    <h4 className='center2'>Age: {(year - (studentDetails.DOB?.substring(0, 4)))}</h4>
                    {/* <h4>Weight: 25kg</h4> */}

                </div>
                <div className='studentData'>
                    <h4>Academic year: {`${result?.year - 1}/${result?.year}`}</h4>
                    <h4 className='center3'>Section: {studentDetails.section}</h4>
                    <h4>Class: {studentDetails.stdClass}</h4>
                </div>

            </div>
            <div className='studentResult_displayResult'>
                <div className='studentResult_displayResult_left'>

                    <table className="table table-bordered left" id="dataTable" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Subject</th>
                                {/* {studentDetails.section === 'Secondary' && <th>Assignment</th>} */}
                                <th>Test</th>
                                {/* <th>Project</th> */}
                                <th>exam</th>
                                <th>Total</th>
                                <th>grade</th>
                                <th>Remarks</th>
                                <th>Subject Position</th>
                                <th>Class Average</th>
                            </tr>

                        </thead>
                        <tbody>
                            {scores.map((score, i) => {
                                return (
                                    <>
                                        {(score.total !== 0) &&
                                            <tr key={i}>
                                                <td>{score.subject}</td>
                                                {/* {studentDetails.section === 'Secondary' && <td>{score.assignment.total}</td>} */}
                                                <td>{score.CA.total}</td>
                                                {/* <td>{score.project}</td> */}
                                                <td>{score.exam}</td>
                                                <td>{score.total}</td>
                                                <td>{score.grade}</td>
                                                <td>{score.remark}</td>
                                                <td>{score.total === 100 ? 1 : score.subjectPosition}{(score.subjectPosition === 1) || (score.total === 100) ? 'st' : score.subjectPosition === 2 ? 'nd' : score.subjectPosition === 3 ? 'rd' : 'th'}</td>
                                                <td>{score.classAverage}</td>
                                            </tr>
                                        }
                                    </>
                                )
                            }
                            )}
                        </tbody>
                    </table>
                    <div className='resultSummary'>
                        <ReportSheetSummary
                            scores={result?.scores}
                            total={result?.total}
                            average={result?.average}
                            grade={result?.grade}
                            scale={result?.scale}
                        />
                        <GradeAnalysis
                            scores={result?.scores}
                            total={result?.total}
                            average={result?.average}
                            grade={result?.grade}
                            scale={result?.scale}
                        />

                    </div>

                </div>
                <div className='studentResult_displayResult_right'>
                    <div className='attendanceSummary'>
                        {/* <StudentAttendanceSummary
                            result={result}
                            id={id}
                        /> */}
                        <AffectiveDomain
                            result={result}
                        />
                    </div>

                    <GradeScale 
                    studentDetails={studentDetails}
                    />
                </div>

            </div>
            <div>
                <DisplayComment
                    result={result}
                    termStart={termStart}
                    id={id} />
            </div>
            {((user?.role !== 'student') && preview === false) &&
                <>
                    <button className="btn btn-primary" style={{ marginLeft: '20px' }} onClick={(e) => history.push(`/${studentDetails.section === 'Secondary' ? 'editsecresult' : 'editresult'}/${id}`)}>Edit Scores</button>
                    {((user?.role === 'admin' || user?.role === 'super-admin') && preview === false) && <button className="btn btn-primary" style={{ marginLeft: '20px' }} onClick={(e) => history.push(`/adminportal/head_teacher_remarks/${id}`)}>HM Remarks</button>}
                    <button className="btn btn-primary" style={{ marginLeft: '20px' }} onClick={(e) => history.push(`/staffportal/teachercomment/${id}`)}>Edit Remarks</button>
                    <button className="btn btn-primary" style={{ marginLeft: '20px' }} onClick={(e) => history.push(`/staffportal/affective_domain/${id}`)}>Edit AffectiveDomain</button>
                    {/* <button className="btn btn-primary" style={{ marginLeft: '20px' }} onClick={(e) => history.push(`/staffportal/computestdattendance/${id}`)}>Edit Attendance</button> */}
                    <button className="btn btn-primary" style={{ marginLeft: '20px' }} onClick={(e) => history.push(`/${user?.role === 'staff' ? 'staffportal' : 'adminportal'}/stdlist`)}>Done</button>
                    <button className="btn btn-primary" style={{ marginLeft: '20px' }} onClick={(e) => setPreview(true)}>Preview</button>
                </>
            }
        </div>
    );
}

export default StudentResult;
