import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'
// import SchoolHeader from '../../Reuseables/SchoolHeader'
import moment from 'moment'
import { useStateValue } from '../../../StateProvider';
import { HOST_URL } from '../../../config'
import { useQuery, usePaginatedQuery } from 'react-query'


import './Result.css'
import SchoolHeader from './resultUploadComponent/SchoolHeader';
import ReportSheetSummary from './resultUploadComponent/ReportSheetSummary';
import GradeAnalysis from './resultUploadComponent/GradeAnalysis';
import StudentAttendanceSummary from './resultUploadComponent/StudentAttendanceSummary';
import AffectiveDomain from './resultUploadComponent/AffectiveDomain';
import GradeScale from './resultUploadComponent/GradeScale';
import DisplayComment from './resultUploadComponent/DisplayComment';



const fetchStudentResult = async (key, id) => {
    console.log(id)
    const res = await fetch(`${HOST_URL}/api/users/student-result/${id}`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
    })
    return res.json();
}

function ResultData({ id, setIsDone }) {

    const [{ user }, dispatch] = useStateValue()
    const history = useHistory()
    const [result, setResult] = useState({})
    const [scores, setScores] = useState([])
    const [studentDetails, setStudentDetails] = useState({})
    const year = new Date().getFullYear()
    const [preview, setPreview] = useState(false)
    const [termStart, setTermStart] = useState(new Date())

    // for modal
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState('')

    const handleClose = () => {
        setShow(false);
        return
    }
    const handleShow = () => setShow(true);

    // React query fecth data
    const { data, status } = useQuery(['StudentResult', id], fetchStudentResult)

    useEffect(() => {
        if (!data) return
        // Store the current Route to prevent page refreshing to '/'
        localStorage.setItem("route", `/studentportal/result/${id}`)
        setResult(data.result)
        setScores(data.result?.scores)
        setStudentDetails(data.stdDetails)
        setTermStart(data.termStart?.termStart)
        setIsDone(true)

    }, [data])

    return (

        <div className={`studentResultUpload`}>
            <SchoolHeader
                data={studentDetails} />
            <h5>{result?.term === 1 ? 'First' : result?.term === 2 ? 'Second' : 'Third'} Term Student's Report Sheet</h5>
            <div className='studentInfo'>
                <div className='studentName'>
                    <h4>Name: {studentDetails?.firstname || ''} {studentDetails?.lastname || ''} {studentDetails?.middlename || ''}</h4>
                    <h4>Reg. No: {studentDetails?.user?.username.toUpperCase()}</h4>
                </div>
                <div className='studentAcad'>
                    <h4>DOB: {moment(studentDetails?.DOB).format('MMMM Do YYYY')}</h4>
                    <h4 className='center2'>Gender: {studentDetails?.sex}</h4>
                    <h4 className='center2'>Age: {(year - (studentDetails?.DOB?.substring(0, 4)))}</h4>
                    {/* <h4>Weight: 25kg</h4> */}

                </div>
                <div className='studentData'>
                    <h4>Academic year: {`${result?.year - 1}/${result?.year}`}</h4>
                    <h4 className='center3'>Section: {studentDetails?.section}</h4>
                    <h4>Class: {studentDetails?.stdClass}</h4>
                </div>

            </div>
            <div className='studentResult_displayResult'>
                <div className='studentResult_displayResult_left'>

                    <table className="studentResultUploadTable table-bordered left" id="dataTable" cellSpacing="0">
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
                                <th>Class High</th>
                                <th>Class Low</th>
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
                                                {/* If a student scores 100 make also first position inthat subject */}
                                                <td>{score.total === 100 ? 1 : score.subjectPosition}
                                                    {/* Add st for numbers ending with 1
                                                        Add "nd" for numbers ending with 2
                                                        Add "3rd" for numbers ending with 3
                                                        */}
                                                    {(score.subjectPosition === 1) || (score.total === 100) || (score.subjectPosition === 21) || (score.subjectPosition === 31) || (score.subjectPosition === 41) ? 'st' :
                                                        score.subjectPosition === 2 || score.subjectPosition === 22 || score.subjectPosition === 32 || score.subjectPosition === 42 ? 'nd' :
                                                            score.subjectPosition === 3 || score.subjectPosition === 23 || score.subjectPosition === 33 || score.subjectPosition === 43 ? 'rd' : 'th'}</td>
                                                <td>{score.classAverage}</td>
                                                <td>{score.classHigh}</td>
                                                <td>{score.classLow}</td>
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
                            classHigh={result?.class_highest_average}
                            classLow={result?.class_lowest_average}
                        />

                        {//this is for Display purpose only. PDF format to 1 page.
                            (studentDetails.section === "Nursery" || studentDetails.section == "Pre-Nursery") ?

                                <GradeAnalysis
                                    scores={result?.scores}
                                    total={result?.total}
                                    average={result?.average}
                                    grade={result?.grade}
                                    scale={result?.scale}
                                /> :
                                <GradeScale
                                    studentDetails={studentDetails}
                                />
                        }
                    </div>

                </div>
                <div className='studentResult_displayResult_right'>
                    <div className='attendanceSummary'>
                        <StudentAttendanceSummary
                            result={result}
                            id={id}
                        />
                        <AffectiveDomain
                            result={result}
                        />
                        {//this is for Display purpose only. PDF format to 1 page.
                            (studentDetails.section === "Nursery" || studentDetails.section === "Pre-Nursery") ?
                                <GradeScale
                                    studentDetails={studentDetails}
                                /> :
                                <GradeAnalysis
                                    scores={result?.scores}
                                    total={result?.total}
                                    average={result?.average}
                                    grade={result?.grade}
                                    scale={result?.scale}
                                />
                        }

                    </div>



                </div>

            </div>
            <div>
                <DisplayComment
                    result={result}
                    termStart={termStart}
                    id={id} />
            </div>


        </div>
    );
}

export default ResultData;
