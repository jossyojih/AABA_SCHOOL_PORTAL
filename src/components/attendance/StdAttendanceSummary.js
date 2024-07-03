import React, {useEffect,useState} from 'react';

function StudentAttendanceSummary({id, data}) {
    const [schoolOpened,setSchoolOpened] = useState(0)
    const [present,setPresent] =useState(0)
   

    useEffect(() => {
        if(!data) return
        let schoolOpenedData = []
        let timesPresent = []
        data.map(result=>{
            return result.attendance.map(item=>{
                if(item.value ==='Present'){
                     schoolOpenedData.push(item.value)
                     timesPresent.push(item.value)
                }
                if(item.value === 'Absent'){
                    schoolOpenedData.push(item.value)
                }else{
                    return
                }
            })
        })
        setSchoolOpened(schoolOpenedData)
        setPresent(timesPresent)
    }, [data])
    
 

  return (
    <div>
        <table className="table table-bordered"  id="dataTable"  cellSpacing="0">
            <thead >
                <tr >
                    <th colSpan='3'>Attendance Summary</th>
                </tr>
            </thead>
            <tbody>
              <tr>
                  <td colSpan='2'>Number of Times School Opened</td>
                  <td >{schoolOpened?.length} </td>
              </tr>
              <tr>
                  <td colSpan='2'>Number Of Times Present</td>
                  <td >{present.length}</td>
              </tr>
              <tr>
                  <td colSpan='2'>Number Of Times Absent</td>
                  <td >{(schoolOpened?.length)-(present?.length)} </td>
              </tr>
              
            </tbody>
        </table>
    </div>
  );
}

export default StudentAttendanceSummary;
