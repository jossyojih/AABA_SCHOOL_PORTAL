import React, {useState,useEffect} from 'react';
import InputBook from './InputBook'
import './Books.css'
import ConfirmBookList from './ConfirmBookList'
import Loader from 'react-loader-spinner'
import UpdateBookList from './UpdateBookList';
import {useHistory} from 'react-router-dom' 

function CreateBookList() { 
  const history = useHistory()
  const [inputFields, setInputFields] = useState(1)
  const [book, setBook] = useState([])
  const [bookClass, setBookClass] = useState('')
  const [author, setAuthor] = useState([])
  const [title, setTitle] = useState([])
  const [price, setPrice] = useState([])
  const [step, setStep] =  useState(1)
  const [total, setTotal]= useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [id,setId] = useState('')
  const [update,setUpdate]= useState(false)
  const [done,setDone] = useState(false)

  useEffect(() => {
    if(!bookClass){
      return
    }
    setIsLoading(true)
    fetch(`http://localhost:5000/booklist/${bookClass}`,{
      headers:{
       "Authorization":"Bearer "+ localStorage.getItem("jwt")
      }
  }).then(res=>res.json())
  .then(data=>{
    console.log(data.book[0])
    if(!data.book[0]){
      setStep(1)
      setIsLoading(false)
    }else{
      console.log(data.book[0].list)
      setId(data.book[0]._id)
      setStep(3)
      setUpdate(true)
      setBook(data.book[0].list)
    
      setIsLoading(false)
    }
    

  }).catch(err=>{
      console.log(err)
  })


  }, [bookClass])

  useEffect(() => {
    if(step===3 && update){
      return
    
      }else{
        const ba = []
        for (let i=0; i <inputFields; i++){
          ba.push({
            author:author[i],
            title:title[i],
            price:price[i]
          })
        }
        setBook(ba)
      }
    
   
  }, [inputFields,step])


const saveBook = () =>{

  fetch('http://localhost:5000/newbooklist',{
    method:'post',
    headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+ localStorage.getItem("jwt")
    },
    body:JSON.stringify({
        bookClass,
        book, 
        total
    })
  }).then(res=>res.json())
  .then(data=>{
    console.log(data)
    alert('Book List Saved Succesfully')
    history.push('/adminportal/admin')
  }).catch(err=>{
    console.log(err)
})
}
const updateBookList = () =>{

  fetch(`http://localhost:5000/booklist/${id}`,{
    method:'put',
    headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+ localStorage.getItem("jwt")
    },
    body:JSON.stringify({
        bookClass,
        book, 
        total
    })
  }).then(res=>res.json())
  .then(data=>{
    console.log(data)
    alert('Book List Updated Succesfully')
    history.push('/adminportal/admin')
  }).catch(err=>{
    console.log(err)
})
}

  const addBook = (e) => {
    e.preventDefault();
    if(update){
      setBook(prev=>[...prev,{author:'',title:'',price:''}])
     setDone(false)
    }else{
      setInputFields(inputFields=> inputFields + 1 )
    }
    
   
  };


  return isLoading ?  <Loader className='loader' type="TailSpin" color="#00BFFF" height={80} width={80} style={{marginleft:'600px',marginTop:'200px'}}/>:(
    <div className='bookList'>
      <h3>Create List Of Books For Each Class</h3>
       <div className="form-group">
          <div className="form-group-display">
              <label htmlFor="class">Select Class</label>
                            
              <select className="form-control" name="class" id="class" onChange={(e) => {
                    setBookClass(e.target.value);
                               
                    }} value={bookClass}>
                    <option value="">Select Class</option>
                    <option value="Nursery1">Nursery 1</option>
                    <option value="Nursery2">Nursery 2</option>
                    <option value="Nursery2">Nursery 3</option>
                    <option value="Primary1">Primary 1</option>
                    <option value="Primary2">Primary 2</option>
                    <option value="Primary3">Primary 3</option>
                    <option value="Primary4">Primary 4</option>
                    <option value="Primary5">Primary 5</option>
                    <option value="Primary6">Primary 6</option>
              </select>
            </div> 
                      
          </div>
          {
             bookClass &&
             <>
                {
          step===1?<div>
             {
              book.map((boo,i)=><InputBook
                key={i}
                i={i}
                title={title}
                setTitle={setTitle}
                author = {author}
                setAuthor={setAuthor}
                price={price}
                setPrice = {setPrice}
                />  
              )
            }
          </div>:step===2?<ConfirmBookList
                  book={book} 
                  setTotal={setTotal}
                  total={total}
                  step={step}/>:
                  <div>
                     {
              book.map((boo,i)=><UpdateBookList
                key={i}
                i={i}
                book={book}
                setBook={setBook}
                total={total}
                setTotal={setTotal}
                done={done}
                setDone={setDone}
                />  
              )
            }
                  </div>
          }

          <div className='bookList_btn'>
               {step===1 ? <><button className="btn btn-primary btn-block" onClick={addBook}> Add another book  </button>
               <button className="btn btn-primary btn-block" onClick={()=>setStep(2)}> Done  </button>
               </>:step===2?
                <><button onClick={()=>setStep(1)} className="btn btn-primary btn-block">Back</button>
                 <button onClick={saveBook} className="btn btn-primary btn-block">Save Book List</button>
                 </>: <>
                 <button className="btn btn-primary btn-block" onClick={addBook}> Add another book  </button>
                 {done?<button onClick={updateBookList} className="btn btn-primary btn-block">Save</button>:
                 <button onClick={()=>setDone(true)} className="btn btn-primary btn-block">Done</button>
                }
                 </>
                }
            </div>
             </>
           } 
          
           
           
        
           
          
    </div>
  );
}

export default CreateBookList;
