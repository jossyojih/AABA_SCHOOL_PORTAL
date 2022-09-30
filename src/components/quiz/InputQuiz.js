import React, {useState,useEffect} from 'react'
import './quiz.css'


function InputQuiz({i,nextQuestion,prevQuestion,question,setQuestion,quest,questionNumber}) {
    const [que,setQue] = useState(quest.que)
    const [answer,setAnswer]  = useState(quest.ans)
    const [option1,setOption1] =useState(quest.options[0])
    const [option2,setOption2] = useState(quest.options[1])
    const [option3,setOption3] = useState(quest.options[2])

   const next = ()=>{
       const set = question
       set[i].que = que
       set[i].ans = answer
       set[i].options[0] = option1
       set[i].options[1] = option2
       set[i].options[2] = option3
       setQuestion(set)
       nextQuestion()

   }
 

    return (
        <div className="inputquiz">      
           
                <div className="form-group">
                    <label>Question {i+1}</label>
                    <textarea className="form-control" name="comment" value={que} placeholder="Enter Question" onChange={(e) => setQue(e.target.value)}
                        rows="3" required wrap='hard'></textarea>
                
                </div>
               
                <div className="form-group">
                    <label>Correct Answer</label>
                    <input type="text" value={answer} className="form-control" name="answer" placeholder="Enter Correct Answer" onChange={(e) => setAnswer(e.target.value)} required/>
                  
                </div>
                <div className="form-group">
                    <label>Other options</label>
                    <div className='options'>
                        <input type="text" value={option1} className="form-control" name="option1" placeholder="Option 1" onChange={(e) => setOption1(e.target.value)} required/>
                        <input type="text" value={option2} className="form-control" name="option2" placeholder="Option 2" onChange={(e) => setOption2(e.target.value)} required/>
                        <input type="text" value={option3} className="form-control" name="option3" placeholder="Option 3" onChange={(e) => setOption3(e.target.value)} required/>
                    </div>   
                </div>
               
               
                <div className="bookList_btn">
                <button onClick={prevQuestion} className="btn btn-block btn-primary">Back</button>
                <button onClick={next} className="btn btn-block btn-primary">Next</button>
                </div>
           
    
    </div>

    )
}

export default InputQuiz
