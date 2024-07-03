import React, {useEffect} from 'react'
import './quiz.css'
function ConfirmDisplay({i,que}) {

    useEffect(() => {
     
      console.log(que)
    }, [que]);

    return (
        <div className='confirmDisplay'>
            <p><span className='text-success'>Question {i+1}:</span> {que.que}</p>
            <p><span>Answer: </span> {que.ans}</p>
            <div className='options'>
                <p><span>Option 1:</span> {que.options[0]}</p>
                <p><span>Option 2: </span> {que.options[1]}</p>
                <p><span>Option 3: </span> {que.options[2]}</p>
            </div>
           
        </div>
    )
}

export default ConfirmDisplay
