import React, {useState} from 'react'
import ConfirmDisplay from './ConfirmDisplay'
import Loader from 'react-loader-spinner'

function ConfirmQuizQue({prevStep,question,saveQuiz,isLoading}) {
   

    return (
        <>
       
            {
                question?.map((que,i)=><ConfirmDisplay
                key={i}
                i={i}
                que={que}
                />
                )}
       
       <div className="bookList_btn">
            Do you want to save The Quiz?
            <button onClick={prevStep} className="btn btn-primary" disabled={isLoading}>Back</button>
            {isLoading ? <button className="btn btn-primary btn-block"><Loader type="TailSpin" color="#FFF" height={20} width={20} /></button> :
                    <button className='btn btn-block btn-primary' onClick={saveQuiz} disabled={isLoading?true:false}>Save Quiz</button>
                }
        </div>
        </>
    )
}

export default ConfirmQuizQue
