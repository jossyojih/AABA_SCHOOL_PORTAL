import React, { useState, useEffect } from 'react'
import InputQuiz from './InputQuiz'

function SetQuestions({ numberOfQuestions,prevStep, nextStep,questions,setQuestions,update}) {
    const [questionNumber, setQuestionNumber] = useState(0)


    useEffect(() => {
        let que = []
        if(update) return
        for (let i = 0; i < numberOfQuestions; i++) {
            
            que.push(
                { que: "", ans: "", options: ["", "", ""] }
            )

        }
        setQuestions(que)
    }, [numberOfQuestions])

    // Proceed to next question
    const nextQuestion = () => {
        setQuestionNumber(question => question + 1)
        if(questionNumber === numberOfQuestions - 1){
           
           nextStep()
        }
        
    };

    // Go back to prev question
    const prevQuestion = () => {
        if(questionNumber===0){
           return prevStep()
        }
        setQuestionNumber(question => question - 1)
    };

    return (
        questions?.map((quest, i) => {
            return ((questionNumber === i) && (<InputQuiz
                key={i}
                quest={quest}
                question={questions}
                setQuestion={setQuestions}
                i={i}
                questionNumber={questionNumber}
                nextQuestion={nextQuestion}
                prevQuestion={prevQuestion}


            />)
            )
        }
        )
    )
}

export default SetQuestions