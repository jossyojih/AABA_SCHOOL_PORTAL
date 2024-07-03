import React, {useState,useEffect} from 'react'
import shuffle from './utilities'
import {RadioGroup, Radio} from 'react-radio-group';
import '../quiz.css'

function DisplayQuestions({ question,nextQuestion, prevQuestion,questionNumber, userAnswer,setUserAnswer,i}) {
    const [options,setOptions] = useState([...question[i]?.options, question[i]?.ans])
    const [show, setShow] = useState(false)
    const [selectedAns,setSelectedAns]= useState(userAnswer[i]||'')
    

    useEffect(() => {
 
        setShow(false)
        shuffle(options)
        setShow(true)
     
      }, [questionNumber,options])


    const handleRadioChange = (value) => {
      setSelectedAns(value)
      userAnswer[i] = value
    
      };

   
    return (show) && (
        <>
    
            <div>
                <p>{i+1}) {question[i]?.que}</p>
            </div>
            
          
            <RadioGroup
                name="fruit"
                selectedValue={selectedAns}
                onChange={handleRadioChange}
                className='displayOptionsRadio'
            >
              <label>A. 
                  <Radio value={options[0]} />{options[0]} 
              </label>
              <label>B.
                  <Radio value={options[1]} />{options[1]} 
              </label>
              <label>C.
                  <Radio value={options[2]} />{options[2]} 
              </label>
              <label>D.
                  <Radio value={options[3]} />{options[3]} 
              </label>
            </RadioGroup> 
        
            <div className='bookList_btn'>
                {(i>0) && (<button className="btn btn-primary" onClick={prevQuestion}>Previous</button>)}
                <button className="btn btn-primary" onClick={nextQuestion}>Next</button>
          </div>
   
         
        </> 
    )
}

export default DisplayQuestions
