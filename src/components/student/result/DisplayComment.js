import React, {useEffect,useState} from 'react';
import {HOST_URL} from '../../../config'
import moment from 'moment'

function DisplayComment({id,result,termStart,section}) {
  console.log(section,"Result")
  const [stdSection,setStdSection] = useState("")

useEffect(() => {
  setStdSection(section)
}, [section])

 
  return (
    <div className='displayComment'>
        <table className="table table-bordered"  id="dataTable"  cellSpacing="0">
           <tbody>
              <tr>
                  <th >Teacher's Remark</th>
                   <td >{result.teacherComment?.comment} </td> 
              </tr>
              <tr>
                  <th >Teacher’s Name:</th>
                  <td >{result.teacherComment?.teacherName}</td> 
              </tr>
              <tr>
                  <th >{(section && (stdSection ==="Secondary"|| stdSection ==="Senior-Secondary"))? "Principal's":"Head Teacher’s"} Remark:</th>
                   <td >{result.hmComment?.comment} </td> 
              </tr>
              <tr>
                  <th >{(section && (section==="Secondary"|| stdSection==="Senior-Secondary"))? "Principal's":"Head Teacher’s"} Name:</th>
                  <td >{result.hmComment?.hmName}</td> 
              </tr>
              <tr>
                  <th >Next Term Begins:</th>
                   <td >{moment(termStart).format('MMMM Do YYYY')}.</td> 
              </tr>
              </tbody>
        </table>
    </div>
  );
}

export default DisplayComment;
