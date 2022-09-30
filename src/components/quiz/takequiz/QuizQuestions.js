import React, { useState, useEffect } from 'react'
import DisplayQuestions from './DisplayQuestions'

function QuizQuestions({prevStep, nextStep,userAnswer,questions,setQuestions}) {
    const [questionNumber, setQuestionNumber] = useState(0)

    // Proceed to next question
    const nextQuestion = () => {
        setQuestionNumber(question => question + 1)
    
        if(questionNumber === questions.length - 1){        
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
            return ((questionNumber === i) && (<DisplayQuestions
                key={i}
                question={questions}
                setQuestion={setQuestions}
                i={i}
                questionNumber={questionNumber}
                nextQuestion={nextQuestion}
                prevQuestion={prevQuestion}
                userAnswer={userAnswer}


            />)
            )
        }
        )
    )
}

export default QuizQuestions