import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useStateValue } from '../../../StateProvider';
import ConfirmAnswers from './ConfirmAnswers'
import SuccessPage from './SuccessPage'
import { HOST_URL } from '../../../config'
import { useQuery } from 'react-query'
import QuizQuestions from './QuizQuestions';

const fetchQuiz = async (key, id) => {

  if (!id) return

  const res = await fetch(`${HOST_URL}/api/users/tackle-quiz/${id}`, {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("jwt")
    }
  })
  return res.json();
}

function QuizPage() {
  const [{ user }, dispatch] = useStateValue()
  const { id } = useParams()
  const [step, setStep] = useState(1)
  const [userAnswer, setUserAnswer] = useState([])
  const [score, setScore] = useState(0)
  const [stdDetails, setStdDetails] = useState({})
  const [quizDetails, setQuizDetails] = useState({})
  const [questions, setQuestions] = useState([])

  // React query fecth data
  const { data, status } = useQuery(['quiz', id], fetchQuiz)

  useEffect(() => {
    if (!data) return
    const student = JSON.parse(localStorage.getItem("student"))
    setStdDetails(student)
    setQuizDetails(data.quiz)
    setQuestions(data.quiz.questions)
  }, [data])


  // Proceed to next step
  const nextStep = () => {
    setStep(step => step + 1)
  };

  // Go back to prev step
  const prevStep = () => {

    setStep(step => step - 1)
  };

  return (
    <div>
      <>
        <h3>Student Name: {stdDetails?.firstname} {stdDetails?.lastname}</h3>
        <h4>Class: {stdDetails?.stdClass}</h4>
        <h4>Subject: {quizDetails?.subject}</h4>
      </>
      {
        step === 1 &&
        <>
          <p>Instruction: Attemp all Question within The stipulated time. The test will be automatically submitted at the end of the time</p>
          <button onClick={nextStep} className="btn btn-primary" disabled={!data}>Start Test</button>
        </>

      }
      {
        step === 2 &&
        <QuizQuestions
          nextStep={nextStep}
          prevStep={prevStep}
          questions={questions}
          userAnswer={userAnswer}

        />
      }

      {
        step === 3 &&
        <>
          <h5>Instruction: Double Check your answers</h5>
          <ConfirmAnswers
            userAnswer={userAnswer}
            prevStep={prevStep}
            nextStep={nextStep}
            questions={questions}

          />
        </>
      }
      {
        step === 4 &&
        <SuccessPage
          userAnswer={userAnswer}
          score={score}
          setScore={setScore}
          questions={questions}
          id={id}

        />
      }

    </div>
  )
}

export default QuizPage
