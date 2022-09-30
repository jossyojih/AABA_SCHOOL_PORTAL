import React,{useEffect} from 'react'

function ConfirmAnswers({questions,nextStep,prevStep,userAnswer}) {
  
    return (
        <div>
            {questions?.map((question,i)=>{
                return(
                    <div key={i}>
                        <div>
                            <p>{i+1}) {question.que}</p>
                        </div>  
                        <div>
                             <p>Your answer: {userAnswer[i]}</p>
                        </div>  
                    </div>        
                        )
            })}
        <div className='bookList_btn'>
                {<button className="btn btn-primary" onClick={prevStep}>Previous</button>}
                <button className="btn btn-primary" onClick={nextStep}>Submit</button>
           </div>
        </div>
    )
}

export default ConfirmAnswers
