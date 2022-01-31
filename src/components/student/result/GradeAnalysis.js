import React, {useState, useEffect} from 'react'
function GradeAnalysis({scores,total,average,grade,scale}) {
    const[Aplus,setAplus] = useState()
    const[A,setA] = useState()
    const[Aminus,setAminus] = useState()
    const[Bplus,setBplus] = useState()
    const[B,setB] = useState()
    const[Bminus,setBminus] = useState()
    const[Cplus,setCplus] = useState()
    const[C,setC] = useState()
    const[Cminus,setCminus] = useState()
    const[D,setD] = useState()
    const[F,setF] = useState()
    

    useEffect(() => {
        if(!scores){
            return
        }
     setAplus(scores.filter(x=>x.grade==="A+").length)
     setA(scores.filter(x=>x.grade==="A").length)
     setAminus(scores.filter(x=>x.grade==="A-").length)
     setBplus(scores.filter(x=>x.grade==="B+").length)
     setB(scores.filter(x=>x.grade==="B").length)
     setBminus(scores.filter(x=>x.grade==="B-").length)
     setCplus(scores.filter(x=>x.grade==="C+").length)
     setC(scores.filter(x=>x.grade==="C").length)
     setCminus(scores.filter(x=>x.grade==="C-").length)
     setD(scores.filter(x=>x.grade==="D").length)
     setF(scores.filter(x=>x.grade==="F").length)
  
    }, [scores]);

    return (
        <div>
        <table className="table table-bordered gradeAnalysis"  id="dataTable" cellSpacing="0">
            <thead >
                <tr >
                    <th colSpan='3'>Grade Analysis</th>
                </tr>
            </thead>
            <tbody>
              <tr>
                  <td colSpan='2'>Grade</td>
                  <td > No.</td>
              </tr>
              <tr>
                  <td colSpan='2'>A+</td>
                  <td >  {Aplus}</td>
              </tr>
              <tr>
                  <td colSpan='2'>A</td>
                  <td >  {A}</td>
              </tr>
              <tr>
                  <td colSpan='2'>A-</td>
                  <td >  {Aminus}</td>
              </tr>
              <tr>
                  <td colSpan='2'>B+</td>
                  <td >  {Bplus}</td>
              </tr>
              <tr>
                  <td colSpan='2'>B</td>
                  <td >  {B}</td>
              </tr>
              <tr>
                  <td colSpan='2'>B-</td>
                  <td >  {Bminus}</td>
              </tr>
              <tr>
                  <td colSpan='2'>C+</td>
                  <td >  {Cplus}</td>
              </tr>
              <tr>
                  <td colSpan='2'>C</td>
                  <td >  {C}</td>
              </tr>
              <tr>
                  <td colSpan='2'>C-</td>
                  <td >  {Cminus}</td>
              </tr>
              <tr>
                    <td colSpan='2'> D</td>
                    <td> {D}</td>
              </tr>
              <tr>
                    <td colSpan='2'> F</td>
                    <td >{F}</td>
                 
              </tr>
              <tr>
                    <th colSpan='2'>TOTAL SUBJECTS OFFERED</th>
                    <td>{scores?.length}</td>
              </tr>
            </tbody>
        </table>
        </div>
    )
}

export default GradeAnalysis
