import React, {useEffect} from 'react';

function ConfirmBookList({books}) {
useEffect(() => {
  console.log(books)
}, [books])


  return (

    <div>
        <h1>Please Confirm the Data</h1>
          <table className="table table-bordered"  id="dataTable" width="100%" cellSpacing="0">
            <thead>
              <tr>
                <td>title</td><td>Author</td>
              </tr>
                  
            </thead>
            <tbody>
                {books?.map((book,i)=>{
                    return (
                      <tr key={i}>
                        <td>{book.title}</td><td>{book.author}</td>
                      </tr>
                    )}
                  )}
            </tbody>
          </table>
              
    </div>
  );
}

export default ConfirmBookList;
