import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import { HOST_URL } from '../../../config'
import { useQuery } from 'react-query'
import Loader from 'react-loader-spinner'

const fetchQuizes = async (key, stdClass) => {
    if (!stdClass) return

    const res = await fetch(`${HOST_URL}/api/users/take-quiz/${stdClass}`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
    })
    return res.json();
}

function TakeQuiz() {
    const history = useHistory()
    const [quizes, setQuiz] = useState([])
    const today = new Date()
    const [student, setStudent] = useState('')
    const [stdClass, setStdClass] = useState()


    // React query fecth data
    const { data, status } = useQuery(['quiz', stdClass], fetchQuizes)

    useEffect(() => {
        const student = JSON.parse(localStorage.getItem("student"))
        if (!student) return history.goBack()
        setStudent(student)
        setStdClass(student.stdClass)

    }, [])


    useEffect(() => {

        if (!data) return
        if(data.quiz.length===0) return alert("No Assignment For this week.")
        setQuiz(data.quiz)

    }, [data])


    return (
        <div>
            {status === 'loading' &&
                <div className="alert alert-primary" role="alert" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Loader type="TailSpin" color="#FFF" height={20} width={20} /> <span style={{ marginLeft: '1rem' }}> Loading... Please wait</span>
                </div>
            }
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

                    {quizes?.map((quiz, i) => {
                        return (
                            <tr key={quiz._id}>
                                {(new Date(quiz.deadline) < today || quiz.submissionInfo.filter(q => (student._id === q.submittedBy._id))[0]) ? <td>{quiz.subject}</td> :
                                    <td style={{ cursor: 'pointer' }} onClick={() => history.push(`/quiz/${quiz._id}`)}>{quiz.subject}</td>}
                                <td>{quiz.stdClass}</td>
                                <td>{quiz.week}</td>
                                <td>{moment(quiz.deadline).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                {(new Date(quiz.deadline) < today && !(quiz.submissionInfo.filter(q => (student._id._id === q.submittedBy._id))[0])) ? <td className='text-danger'>Deadline Exceeded</td> : quiz.submissionInfo.filter(q => (student?._id === q.submittedBy._id))[0] ?
                                    <td className='text-success'>Quiz Taken. Score:{quiz.submissionInfo.filter(q => (student._id === q.submittedBy._id))[0].score}%</td> :
                                    <td className='text-danger' style={{ cursor: 'pointer' }} onClick={() => history.push(`/studentportal/tacklequiz/${quiz._id}`)}>Takcle Quiz</td>}


                            </tr>

                        )
                    })}

                </tbody>
            </table>
        </div>
    )
}

export default TakeQuiz
