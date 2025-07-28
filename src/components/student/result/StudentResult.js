import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import ReportSheetSummary from './ReportSheetSummary';
import SchoolHeader from '../../Reuseables/SchoolHeader'
import moment from 'moment'
import GradeAnalysis from './GradeAnalysis';
import { useStateValue } from '../../../StateProvider';
import { HOST_URL } from '../../../config'
import { useQuery, usePaginatedQuery } from 'react-query'
import AffectiveDomain from './AffectiveDomain';
import GradeScale from './GradeScale';
import StudentAttendanceSummary from './StudentAttendanceSummary';
import DisplayComment from './DisplayComment';
import Loader from 'react-loader-spinner'
import Modal from '../../../components/Modal';
import './Result.css'


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
    const [firstTerm, setFirstTerm] = useState([])
    const [secondTerm, setSecondTerm] = useState([])
    const [studentDetails, setStudentDetails] = useState({})
    const year = new Date().getFullYear()
    const [preview, setPreview] = useState(false)
    const [termStart, setTermStart] = useState(new Date())
    const [image, setImage] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [actionType, setActionType] = useState('');
    const [itemId, setItemId] = useState()

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

        if (!data?.result) {

            alert('This student has no result for this term yet')
            setIsLoading(false)

            if (user.role === 'super-admin' || user.role === 'admin') {
                return history.push(`/adminportal/studentprofile/${id}`)
            } else if (user.role === 'staff') {
                return history.push(`/staffportal/studentprofile/${id}`)
            } else {
                return history.push(`/studentportal/studentprofile/${id}`)
            }

        } else if (user?.role !== 'student') {
            setResult(data.result)
            setScores(data.result?.scores)
            setStudentDetails(data.stdDetails)
            setTermStart(data.termStart?.termStart)
            setIsLoading(false)
        } else {
            setResult(data.result)
            setIsLoading(false)
            ////
        }
        if (data?.result.term === 3) {
            setFirstTerm(data.firstTerm?.scores)
            setSecondTerm(data.secondTerm?.scores)
        }

    }, [data])




    const uploadResult = async () => {
        try {
            setIsLoading(true)
            const data = new FormData();
            data.append("file", image);
            data.append("upload_preset", "instaclone")
            data.append("cloud_name", "jossyjoe")
            const res = await fetch("https://api.cloudinary.com/v1_1/jossyjoe/image/upload", {
                method: "post",
                body: data
            })
           
            const cloudData = await res.json()
            const url = cloudData.url
            const newUrl = url.slice(0, -3) + 'png'
          
            const response = await fetch(`${HOST_URL}/api/staff/student-result-image`, {
                method: 'put',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    id: result.studentDetails,
                    resultId: result._id,
                    resultImage: newUrl

                })
            })

            const returnedData = await response.json()
            if (returnedData.error) {
                setIsLoading(false)
                setMessage(returnedData.error)
                setTimeout(() => {
                    handleClose()
                }, 2000);
            } else {
                setIsLoading(false)
                handleClose()
                alert('Result saved Succesfully')
                history.push(`/studentportal/result/${id}`)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!image) return
        handleShow()
        setItemId('')
        setMessage(`Are you sure you want to upload this result`)
        setActionType('Upload Result')

    }, [image])

    const updatePic = (e, file) => {
        e.preventDefault()
        setImage(file)

    }


    return (
        <>
            {user?.role !== 'student' &&
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
                                        {studentDetails.section === 'Secondary' &&
                                            <>
                                                <th>Notebk</th>
                                                <th>Assign.</th>
                                            </>}
                                        <th>1st CA</th>
                                        <th>2nd CA</th>
                                        {/* <th>Project</th> */}
                                        <th>exam</th>
                                        <th>Total</th>
                                        <th>grade</th>
                                        <th>Remarks</th>
                                        <th>Subject Position</th>
                                        <th>Class Avg</th>
                                        {
                                            // For 3rd term
                                            result?.term === 3 ?
                                                <>
                                                    <th>First Term</th>
                                                    <th>Second Term</th>
                                                    <th>Cumm. Average</th>
                                                </> :
                                                <>
                                                    <th>Class High</th>
                                                    <th>Class Low</th>
                                                </>
                                        }

                                    </tr>

                                </thead>

                                <tbody>
                                    {scores.map((score, i) => {
                                        let firstTermScore = firstTerm?.find(item => item.subject == score.subject)?.total || 0
                                        let secondTermScore = secondTerm?.find(item => item.subject == score.subject)?.total || 0
                                        let cummulative;
                                        if (firstTermScore === 0 && secondTermScore === 0) {
                                            cummulative = (score.total).toFixed(1);
                                        } else if (firstTermScore === 0 && secondTermScore !== 0) {
                                            cummulative = ((secondTermScore + score.total) / 2).toFixed(1);
                                        } else if (firstTermScore !== 0 && secondTermScore === 0) {
                                            cummulative = ((firstTermScore + score.total) / 2).toFixed(1);
                                        } else {
                                            cummulative = ((firstTermScore + secondTermScore + score.total) / 3).toFixed(1);
                                        }

                                        return (
                                            <>
                                                {(score.total !== 0) &&
                                                    <tr key={i}>
                                                        <td >{score.subject}</td>
                                                        {(studentDetails.section === 'Secondary' || studentDetails.section === 'Senior-Secondary') &&
                                                            <>
                                                                <td className='text-center'>{score.assignment}</td>
                                                                <td className='text-center'>{score.notebook}</td>
                                                            </>

                                                        }
                                                        {/* <td className='text-center'>{score.CA.total}</td> */}
                                                           <td className='text-center'>{score.CA.first}</td>
                                                              <td className='text-center'>{score.CA.second}</td>
                                                        {/* <td>{score.project}</td> */}
                                                        <td className='text-center'>{score.exam}</td>
                                                        <td className='text-center'>{score.total}</td>
                                                        <td className='text-center'>{score.grade}</td>
                                                        <td className='text-center'>{score.remark}</td>
                                                        {/* If a student scores 100 make also first position inthat subject */}
                                                        <td className='text-center'>{score.total === 100 ? 1 : score.subjectPosition}
                                                            {/* Add st for numbers ending with 1
                                                        Add "nd" for numbers ending with 2
                                                        Add "3rd" for numbers ending with 3
                                                        */}
                                                            {(score.subjectPosition === 1) || (score.total === 100) || (score.subjectPosition === 21) || (score.subjectPosition === 31) || (score.subjectPosition === 41) ? 'st' :
                                                                score.subjectPosition === 2 || score.subjectPosition === 22 || score.subjectPosition === 32 || score.subjectPosition === 42 ? 'nd' :
                                                                    score.subjectPosition === 3 || score.subjectPosition === 23 || score.subjectPosition === 33 || score.subjectPosition === 43 ? 'rd' : 'th'}</td>
                                                        <td className='text-center'>{score.classAverage}</td>

                                                        {
                                                            result?.term === 3 ?
                                                                <>
                                                                    <td className='text-center'>{firstTermScore}</td>
                                                                    <td className='text-center'>{secondTermScore}</td>
                                                                    <td className='text-center'>{cummulative == "NaN" ? "" : cummulative}</td>
                                                                </> : <>
                                                                    <td className='text-center'>{score.classHigh}</td>
                                                                    <td className='text-center'>{score.classLow}</td>
                                                                </>
                                                        }

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
                                    cummulative={data}
                                    scores={result?.scores}
                                    total={result?.total}
                                    average={result?.average}
                                    grade={result?.grade}
                                    scale={result?.scale}
                                    classHigh={result?.class_highest_average}
                                    classLow={result?.class_lowest_average}
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
                                <StudentAttendanceSummary
                                    result={result}
                                    id={id}
                                />
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
                            id={id}
                            section={studentDetails?.section}
                            />
                    </div>
                    {((user?.role !== 'student') && preview === false) &&
                        <>
                            <button className="btn btn-primary" style={{ marginLeft: '15px' }} onClick={(e) => history.push(`/${studentDetails.section === 'Secondary' ? 'editsecresult' : 'editresult'}/${id}`)}>Edit Scores</button>
                            {((user?.role === 'admin' || user?.role === 'super-admin') && preview === false) && <button className="btn btn-primary" style={{ marginLeft: '10px' }} onClick={(e) => history.push(`/adminportal/head_teacher_remarks/${id}`)}>HM Remarks</button>}
                            <button className="btn btn-primary" style={{ marginLeft: '15px' }} onClick={(e) => history.push(`/staffportal/teachercomment/${id}`)}>Edit Remarks</button>
                            <button className="btn btn-primary" style={{ marginLeft: '15px' }} onClick={(e) => history.push(`/staffportal/affective_domain/${id}`)}>Edit AffectiveDomain</button>
                            <button className="btn btn-primary" style={{ marginLeft: '15px' }} onClick={(e) => history.push(`/staffportal/computestdattendance/${id}`)}>Edit Attendance</button>
                            <button className="btn btn-primary" style={{ marginLeft: '15px' }} onClick={(e) => history.push(`/${user?.role === 'staff' ? 'staffportal' : 'adminportal'}/stdlist`)}>Done</button>
                            <button className="btn btn-primary" style={{ marginLeft: '10px' }} onClick={(e) => setPreview(true)}>Preview</button>
                            {(user?.role === 'admin' || user?.role === "staff") &&
                                <>
                                    <input type="file" accept="application/pdf" id="input" onChange={e => updatePic(e, e.target.files[0])} />
                                    <div className="label upload_result_label">
                                        <label className="image-upload" htmlFor="input">
                                            Upload Result
                                            {/* <i className="fas fa-fw fa-camera"></i> */}
                                            {/* <FontAwesomeIcon icon={faCamera} className='addphoto_icon'/> */}
                                        </label>
                                    </div>
                                </>
                            }
                        </>
                    }
                    <Modal
                        show={show}
                        isLoading={isLoading}
                        handleClose={handleClose}
                        message={message}
                        title={actionType}
                        itemId={itemId}
                        action2={uploadResult}
                    />
                </div>
            }
            {user?.role === 'student' &&
                <div className='student_result_image'>
                    {
                        status === 'loading' ?
                            <div className="alert alert-primary" role="alert" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Loader type="TailSpin" color="#FFF" height={20} width={20} /> <span style={{ marginLeft: '1rem' }}> Loading... Please wait</span>
                            </div> :
                            <img src={result.resultImage} alt='student result' />
                    }

                </div>
            }
        </>

    );
}

export default StudentResult;
