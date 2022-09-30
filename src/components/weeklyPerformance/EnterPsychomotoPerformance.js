import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { HOST_URL } from '../../config'
import { useQuery } from 'react-query'
import { RadioGroup, Radio } from 'react-radio-group'
import Loader from 'react-loader-spinner'
import './performance.css'

const fetchStudentWeekPerformance = async (key, id) => {
    const res = await fetch(`${HOST_URL}/api/users/weeklyperformancereport/${id}`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
    })
    return res.json();
}


function EnterPsychomotoPerformance() {
    const psychomoto = ["attentiveness", "honesty", "politeness", "neatness", "punctuality", "selfControl", "obedience", "reliability", "responsibility", "relationship"]
    const [stdDetails, setStdDetails] = useState({})
    const [calendar, setCalendar] = useState()
    const [psychomotoReport, setPsychomotoReport] = useState([])
    const { id } = useParams()
    const history = useHistory()
    const [isLoading, setIsLoading] = useState()
    // React query fecth data
    const { data, status } = useQuery(['StudentWeekPerformance', id], fetchStudentWeekPerformance)

    useEffect(() => {

        if (!data) return

        setStdDetails(data.weeklyPerformance.studentDetails)
        setCalendar(data.calendar)

    }, [data])

    const handleChange = (value, i, attribute) => {
        // Filter out prev selected value 4 this item
        const newValue = psychomotoReport.filter(item => item.attribute !== attribute)
        setPsychomotoReport([...newValue, { attribute, value }])
    }

    async function onSubmit(e) {
        e.preventDefault()

        if (window.confirm("Do you want to update Affective Domain report")) {
            setIsLoading(true)
            const response = await fetch(`${HOST_URL}/api/staff/weekly-psychomoto`, {
                method: 'put',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    studentDetails: id,
                    psychomotoReport
                })
            })
            const data = await response.json()

            if (data.error) {
                setIsLoading(false)

                alert(data.error)
            } else {

                setIsLoading(false)
                alert(data.message)
                history.goBack()

            }
        }

    }

    return (
        <div className='subject-performance'>
            <h3>Enter Student Subject Performance For week {calendar?.week}</h3>
            {/* {stdDetails?.term === 1 ? '1st' : stdDetails?.term === 2 ? '2nd' : stdDetails.term === 3 ? '3rd' : ''} term {stdDetails?.year - 1}/{stdDetails?.year} Session </h3> */}
            <h5><span>Student Name:</span> {stdDetails.firstname} {stdDetails.middlename} {stdDetails.lastname}</h5>
            <h5><span>Student Section:</span> {stdDetails.section}</h5>
            <h5><span>Student Class:</span> {stdDetails.stdClass}</h5>

            {
                psychomoto.map((item, i) => {
                    return (<div className="form-data" key={i}>

                        <label htmlFor="section">{item}</label>
                        <RadioGroup className='radio-group' name={item} onChange={(value) => handleChange(value, i, item)}>
                            <Radio value="5" className='ml-4 mr-1' />Excellent
                            <Radio value="4" className='ml-4 mr-1' />Very Good
                            <Radio value="3" className='ml-4 mr-1' />Good
                            <Radio value="2" className='ml-4 mr-1' />Fair
                            <Radio value="1" className='ml-4 mr-1' />Poor
                        </RadioGroup>
                        {/* <input type='checkbox' id='flight' name='powers' onChange={(e) => handleChange(e, subject)} /> */}
                    </div>

                    )
                })
            }


            <div className='bookList_btn'>
                <button onClick={() => history.goBack()} className='btn btn-primary btn-block'>Go Back</button>
                {isLoading ?

                    <button className='btn btn-primary btn-block'>
                        <Loader type="TailSpin" color="#FFF" height={20} width={20} />
                    </button>
                    :
                    <button onClick={onSubmit} className='btn btn-primary btn-block'>Submit</button>
                }

            </div>




        </div>
    )
}

export default EnterPsychomotoPerformance