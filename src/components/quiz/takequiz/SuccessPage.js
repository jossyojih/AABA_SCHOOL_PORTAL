import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { HOST_URL } from '../../../config'
import Loader from 'react-loader-spinner'

function SuccessPage({ userAnswer, score, setScore, questions, id }) {
    const answers = []
    const [submit, setSubmit] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const history = useHistory()

    useEffect(() => {

        let result = 0;
        questions?.map(answer => answers.push(answer.ans))

        for (let i = 0; i < answers.length; i++) {

            if (answers[i] === userAnswer[i]) result++
        }

        setScore((result / answers.length) * 100)
        setSubmit(true)

    }, [score, questions, userAnswer])

    useEffect(() => {
        if (!submit) return

        const abortController = new AbortController()
        const signal = abortController.signal
        setIsLoading(true)
        async function submitQuiz() {
            const res = await fetch(`${HOST_URL}/api/users/submit-quiz`, {
                method: 'put',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                signal: signal,
                body: JSON.stringify({
                    score,
                    quizId: id
                })
            })
            const result = await res.json();
            if(result.error){
                alert(result.error)
                setIsLoading(false)
            }else{
                setIsLoading(false)
                setSubmitted(true)
                setTimeout(() => {
                    history.push('/studentportal/takequiz')
                }, 2000);
            }
        }
        submitQuiz()

        return () => {
            abortController.abort()
        };
    }, [submit]);

    return (
        <div>
            {
                isLoading &&
                <div className="alert alert-primary" role="alert" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Loader type="TailSpin" color="#FFF" height={20} width={20} /> <span style={{ marginLeft: '1rem' }}> Submiting Result... Please do not close this window</span>
                </div>
            }
            {submitted &&
                <div style={{ padding: '10px' }} className='success'>
                    <h2>Thank You  For Your Submission</h2>
                    <h4>Your Score: {score}%</h4>
                    {/* <p>You will get an email with further instructions.</p> */}
                </div>
            }

        </div>
    )
}

export default SuccessPage
