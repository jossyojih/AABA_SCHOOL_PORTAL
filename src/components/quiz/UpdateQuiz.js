import React, { useState, useEffect } from 'react'
import { HOST_URL } from '../../config'
import { useParams } from 'react-router-dom'
import ConfirmQuizQue from './ConfirmQuizQue'
import './quiz.css'
import QuizInformation from './QuizInformation'
import SetQuestions from './SetQuestions'
import { useQuery } from 'react-query'
import './quiz.css'

const fetchQuiz = async (key, id) => {

    if (!id) return

    const res = await fetch(`${HOST_URL}/api/users/tackle-quiz/${id}`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
    })
    return res.json();
}


function UpdateQuiz() {
    const { id } = useParams()
    const [deadline, setDeadline] = useState()
    const [numberOfQuestions, setNumberOfQuestions] = useState(10)
    const [questions, setQuestions] = useState([])
    const [stdClass, setStdClass] = useState('')
    const [subject, setSubject] = useState('')
    const [step, setStep] = useState(1)
    const [isLoading, setIsLoading] = useState(false)

    // React query fecth data
    const { data, status } = useQuery(['quiz', id], fetchQuiz)

    useEffect(() => {
        const staff = JSON.parse(localStorage.getItem("staff"))
        setStdClass(staff.classTeacher)
        // setStudentDetails(student)
    }, [])

    useEffect(() => {

        if (!data) return
        setSubject(data.quiz.subject)
        setDeadline(new Date(data.quiz.deadline))
        setNumberOfQuestions(data.quiz.questions.length)
        setQuestions(data.quiz.questions)
    }, [data])


    const saveQuiz = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        if (!window.confirm("Are you sure you want to update this assignment?")) return setIsLoading(false)

        const response = await fetch(`${HOST_URL}/api/staff/update-quiz`, {
            method: 'put',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                stdClass,
                deadline,
                questions,
                subject,

            })
        })
        const result = await response.json()
        if (result.error) {
            setIsLoading(false)
            return alert(result.error)
        }
        alert(result.message)
        setIsLoading(false)
        setSubject('')
        setQuestions([])
        setDeadline(null)
        setStep(1)
    }

    // Proceed to next step
    const nextStep = () => {

        setStep(step => step + 1)
    };

    // Go back to prev step
    const prevStep = () => {

        setStep(step => step - 1)
    };


    return (
        <div className='newquiz'>
            {
                step === 1 &&
                <>
                    <h5>Set Assignment For {stdClass}</h5>
                    <QuizInformation
                        subject={subject}
                        setSubject={setSubject}
                        deadline={deadline}
                        setDeadline={setDeadline}
                        nextStep={nextStep}
                        disabled={true}
                    />
                </>

            }
            {
                step === 2 &&
                <>
                    <h5>Assignment For {stdClass}</h5>
                    <div className="form-group-display">
                        <label htmlFor="class">Enter Number of Questions</label>
                        <input type="number" value={numberOfQuestions} className="form-control" placeholder="Enter username" onChange={(e) => { setNumberOfQuestions(e.target.value) }} disabled/>
                    </div>
                    <div className='bookList_btn'>
                        <button onClick={prevStep} className="btn btn-primary btn-block"> Back </button>
                        <button onClick={() => nextStep()} className="btn btn-primary btn-block">Next</button>
                    </div>
                </>
            }

            {
                step === 3 &&
                <SetQuestions
                    numberOfQuestions={numberOfQuestions}
                    nextStep={nextStep}
                    prevStep={prevStep}
                    questions={questions}
                    setQuestions={setQuestions}
                    update={true}
                />
            }
            {
                step === 4 &&
                <ConfirmQuizQue
                    question={questions}
                    isLoading={isLoading}
                    saveQuiz={saveQuiz}
                    prevStep={prevStep}
                    nextStep={nextStep}

                />
            }
        </div>
    )
}

export default UpdateQuiz
