import React, { useState, useEffect } from 'react'
import Toast from 'react-bootstrap/Toast'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import { HOST_URL } from '../../../config'
import { useQuery } from 'react-query'
import '../quiz.css'

const fetchQuizes = async (key, stdClass, week) => {
    if (!stdClass || !week) return
    const res = await fetch(`${HOST_URL}/api/staff/display-quiz/${stdClass}?week=${week}`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
    })
    return res.json();
}

function QuizDisplay() {
    const history = useHistory()
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('')
    const [term, setTerm] = useState('')
    const [stdClass, setStdClass] = useState('')
    const [quizReport, setQuizReport] = useState([])
    const [quizInfo, setQuizInfo] = useState([])
    const [week, setWeek] = useState('')
    const [step, setStep] = useState(1)
    const [subject, setSubject] = useState('')

    // React query fecth data
    const { data, status } = useQuery(['quiz', stdClass, week], fetchQuizes)

    useEffect(() => {
        const staff = JSON.parse(localStorage.getItem("staff"))
        if (!staff) return history.goBack()
        setStdClass(staff.classTeacher)

    }, [])

    useEffect(() => {
        if(!data) return
        setQuizReport(data.quizData)
    }, [data])



    useEffect(() => {
        if (!quizInfo[0]) {
            return
        }
        // console.log(quizInfo)
    }, [quizInfo])

    const getScores = (Id, subject) => {
        setSubject(subject)
        const set = quizReport.filter(dat => dat._id === Id)
     
        setQuizInfo(set[0].submissionInfo)
 
    }

    return (
        <div className='adminQuizDisplay'>
            <div className='adminQuizDisplay_display'>
                <div className='adminQuizDisplay_display_left'>

                    <div className="form-group">
                        <div className="form-group-display">
                            <label htmlFor="term">Week</label>
                            <select className="form-control" name="week" id="week" onChange={(e) => {
                                setWeek(e.target.value);
                            }} value={week}>

                                <option value="">Select Week</option>
                                <option value='One'>Week 1</option>
                                <option value='Two'>Week 2</option>
                                <option value='Three'>Week 3</option>
                                <option value='Four'>Week 4</option>
                                <option value='Five'>Week 5</option>
                                <option value='Six'>Week 6</option>
                                <option value='Seven'>Week 7</option>
                                <option value='Eight'>Week 8</option>
                                <option value='Nine'>Week 9</option>
                                <option value='Ten'>Week 10</option>
                                <option value='Eleven'>Week 11</option>
                                <option value='Twelve'>Week 12</option>
                                <option value='Holiday'>Holiday</option>
                            </select>
                        </div>

                    </div>

                </div>
                <button onClick={() => history.push(`/staffportal/newquiz`)} className="btn btn-success">Set New Quiz</button>

            </div>

            {
                step === 1 ?
                    <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>Subject</th>
                                <th>Class</th>
                                <th>Week</th>
                                <th>Deadline</th>
                                <th>Remark</th>
                            </tr>
                        </thead>

                        <tbody>
                            {quizReport?.map((quiz, i) => {
                                return (
                                    <tr key={quiz._id}>

                                        <td style={{ cursor: 'pointer' }}>{quiz.subject}</td>
                                        <td>{quiz.stdClass}</td>
                                        <td>{quiz.week}</td>
                                        <td>{moment(quiz.deadline).format('MMMM Do, YYYY')}</td>
                                        {/* onClick={() => history.push(`/updatequiz/${quiz._id}`)} */}
                                        <td><span  style={{ cursor: 'pointer' }} className='text-primary'>edit </span>
                                            | <span style={{ cursor: 'pointer' }} className='text-success' onClick={() => {
                                                getScores(quiz._id, quiz.subject)
                                                setStep(2)
                                            }
                                            }>See Scores</span></td>
                                    </tr>

                                )
                            })}

                        </tbody>
                    </table> :
                    <>
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>Student Name</th>
                                    <th>Subject</th>
                                    <th>Score</th>
                                    <th>Completion Date</th>
                                </tr>
                            </thead>

                            <tbody>
                                {quizInfo?.map((quiz, i) => {
                                    return (
                                        <tr key={quiz._id}>

                                            <td style={{ cursor: 'pointer' }} >{quiz.submittedBy.firstname} {quiz.submittedBy.lastname}</td>
                                            <td>{subject}</td>
                                            <td>{quiz.score}%</td>
                                            <td>{moment(quiz.timestamp).format('MMMM Do, YYYY, h:mm:ss a')}</td>

                                        </tr>

                                    )
                                })}

                            </tbody>
                        </table>
                        <button onClick={() => setStep(1)} className="btn btn-primary">Back</button>
                    </>
            }


            <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>

                <Toast.Body>{message}</Toast.Body>
            </Toast>
        </div>
    )
}

export default QuizDisplay
