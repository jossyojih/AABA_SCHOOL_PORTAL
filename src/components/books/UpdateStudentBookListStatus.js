import React, { useState, useEffect } from 'react';
// import './Student.css'

function UpdateBookListStatus({ book, books, setBooks, i }) {

    const [condition, setCondition] = useState(books[i].condition)

    useEffect(() => {
   console.log(condition)
    }, [])
    

    const getCondition = () => {
        const a = books
         console.log(a[i])
        a[i].condition = condition
        setBooks(a)
    }

    return (
        <tr>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>

          
            <div className="form-group-display">
                <select className="form-control" name="class" id="class" onChange={(e) => {
                    setCondition(e.target.value) }} onBlur={getCondition} value={condition}>

                    <option value="">Select Current Book Condition</option>
                    <option value="New">New</option>
                    <option value="Good">Good</option>
                    <option value="Rough">Rough</option>
                    <option value="Torn">Torn</option>
                                        
                </select>
            </div> 
                       
        
            </td>

        </tr>

    );
}

export default UpdateBookListStatus;
