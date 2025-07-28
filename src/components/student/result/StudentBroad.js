import React, { useEffect, useState } from 'react'
import './Result.css'
import { useHistory } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import SelectClass from '../../SelectClass'
import { useStateValue } from '../../../StateProvider';
import { HOST_URL } from '../../../config'

function BroadSheet() {
    const [{ user }, dispatch] = useStateValue()
    const history = useHistory()
    const [result, setResult] = useState([])
    const [stdClass, setStdClass] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [saved, setSaved] = useState(false)

    useEffect(() => {
        if (!stdClass) {
            return
        }

        const staff = JSON.parse(localStorage.getItem("staff"))
        if (staff) {

            if (staff.classTeacher !== stdClass)
                return alert('You dont have permision to view this class')

        }

        fetch(`${HOST_URL}/api/users/studentbroad/${stdClass}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(data => {
                //  console.log(data)
                setResult(data.broad)
            }).catch(err => {
                console.log(err)
            })

    }, [stdClass])

    const broadUpdate = () => {
        if (!stdClass) {
            return alert('No Class Selected')
        }
        
        // Initialize variables to keep track of highest and lowest averages
        let highestAverage = Number.MIN_SAFE_INTEGER;
        let lowestAverage = Number.MAX_SAFE_INTEGER;

        // Calculate highest and lowest averages
        for (const obj of result) {
            const average = obj.average;
            highestAverage = Math.max(highestAverage, average);
            lowestAverage = Math.min(lowestAverage, average);
        }

        setIsLoading(true)
        for (let i = 0; i < result.length; i++) {

            const set = result
            set[i].position = i + 1
            set[i].class_highest_average = highestAverage
            set[i].class_lowest_average = lowestAverage

            fetch(`${HOST_URL}/api/users/student-result-update/${set[i]._id}`, {
                method: 'put',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    data: set[i]

                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        setIsLoading(false)
                        alert(data.error)
                    } else {
                        setIsLoading(false)
                        setSaved(true)

                    }

                })
                .catch(err => console.log(err));

        }
        //   fetch(`http://localhost:5000/studentbroad/${stdClass}`,{
        //     headers:{
        //      "Authorization":"Bearer "+ localStorage.getItem("jwt")
        //     }
        // }).then(res=>res.json())
        // .then(data=>{
        //  console.log(data)
        //  setIsLoading(false)
        // //    setResult(data.results) 
        // }).catch(err=>{
        //     console.log(err)
        // })

    }

    useEffect(() => {

        if (result[0] === undefined) {
            return
        }
        const calc = []
        const scores = []
        const subject = []
        const averages = []

        result[0].scores.map((sub, i) => subject.push(sub.subject))

        for (let i = 0; i < result.length; i++) {
            calc.push(result[i].scores)
        }

        for (let i = 0; i < calc.length; i++) {
            for (let j = 0; j < calc[i].length; j++) {
                scores.push(calc[i][j])
            }

        }
        // Compute class average and add to each student result
        for (let i = 0; i < subject.length; i++) {
            const a = scores.filter((x) => x.subject === subject[i]).map(x => x.total).reduce((acc, x) => acc + x)
            averages.push((a / calc.length).toFixed(1))
        
            calc.map((sub) =>  sub[i] && (sub[i].classAverage = averages[i]))

            //  Compute class High and Low for each student.

            const c = scores.filter((x) => x.subject === subject[i]).sort((a, b) => a.total < b.total ? 1 : -1)
            const classHigh = c[0].total
            const classLow = c[c.length - 1].total
            c.map((x, i) => {
                x.classHigh = classHigh;
                x.classLow = classLow

            })
            //  compute each student subject position from index
            const b = scores.filter((x) => x.subject === subject[i]).sort((a, b) => a.total < b.total ? 1 : -1).map((x, i) => x.subjectPosition = (i + 1))
            //console.log(b)
            // console.log(result)
        }

        // setResult(result)

    }, [result])

    useEffect(() => {
        if (!saved) {
            return
        }
        alert('Saved Successfully')
    }, [saved])


    return (
        <div className='classBroadSheet'>
            <h1>Students Result Data {stdClass && 'for'} {stdClass}</h1>


            <SelectClass
                stdClass={stdClass}
                setStdClass={setStdClass}
                select={true}
                section={''}
            />
            <table className='BroadSheet'>
                <thead >
                    <tr >
                        <th>Names</th>
                        {result[0]?.scores.map((sub, i) => <th key={i} colSpan="9">{sub.subject}</th>)}
                        <th colSpan='3'>Marks Obtained</th>
                    </tr>
                    <tr>
                        <td></td>

                        {result[0]?.scores.map((sub, i) => <><td >test</td><td >exam</td><td>total</td><td>Grade</td><td>Remark</td><td>Subject position</td><td>Class Average</td><td>Class High</td><td>Class Low</td></>)}
                        <td>Total</td><td>Average</td><td>Position</td>
                    </tr>

                </thead>
                <tbody>

                    {result.map((score, i) => {
                        return (
                            <tr key={i}>
                                <td>{score.studentDetails?.firstname} {score.studentDetails?.lastname}</td>
                                {result[i].scores.map((sub, i) => <><td >{sub.CA.total}</td><td >{sub.exam}</td><td>{sub.total}</td><td>{sub.grade}</td><td>{sub.remark}</td><td>{sub.subjectPosition}</td><td>{sub.classAverage}</td><td>{sub.classHigh}</td><td>{sub.classLow}</td></>)}
                                <td>{score.total}</td><td>{score.average}</td><td>{i + 1}{i === 0 ? 'st' : i === 1 ? 'nd' : i === 2 ? 'rd' : 'th'}</td>
                            </tr>
                        )
                    }
                    )
                    }
                </tbody>
            </table>
            <div className='buttons'>
                <button className="btn btn-primary btn-block btn-left" onClick={() => history.push(`/${(user.role === 'super-admin' || user.role === 'admin') ? 'adminportal' : 'staffportal'}`)}> Save  </button>
                {isLoading ? <Loader className='login-loader' type="TailSpin" color="#00BFFF" height={40} width={40} /> :
                    <button className="btn btn-primary btn-block" onClick={broadUpdate}> Get Subject Position and Average</button>}


            </div>


        </div>
    )
}

export default BroadSheet
