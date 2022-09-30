import React, { useState, useEffect } from 'react'
import { HOST_URL } from '../../config'
import ConfirmQuizQue from './ConfirmQuizQue'
import './quiz.css'
import QuizInformation from './QuizInformation'
import SetQuestions from './SetQuestions'


function NewQuiz() {
    const [deadline, setDeadline] = useState()
    const [numberOfQuestions, setNumberOfQuestions] = useState(10)
    const [questions, setQuestions] = useState([])
    const [stdClass, setStdClass] = useState('')
    const [subject, setSubject] = useState('')
    const [step, setStep] = useState(1)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const staff = JSON.parse(localStorage.getItem("staff"))
        setStdClass(staff.classTeacher)
        // setStudentDetails(student)
    }, [])



    const saveQuiz = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        if(!window.confirm("Are you sure you want to save this assignment?")) return setIsLoading(false)

        const response = await fetch(`${HOST_URL}/api/staff/new-quiz`, {
            method: 'post',
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
                    />
                </>

            }
            {
                step === 2 &&
                <>
                    <h5>Assignment For {stdClass}</h5>
                    <div className="form-group-display">
                        <label htmlFor="class">Enter Number of Questions</label>
                        <input type="number" value={numberOfQuestions} className="form-control" placeholder="Enter username" onChange={(e) => { setNumberOfQuestions(e.target.value) }} />
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

export default NewQuiz
