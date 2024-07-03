import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import { HOST_URL } from '../../../config'
import Loader from 'react-loader-spinner'
import { RadioGroup, Radio } from 'react-radio-group'
import './Result.css'


import { useQuery, usePaginatedQuery } from 'react-query'

const fetchStudentProfile = async (key, id) => {
    const res = await fetch(`${HOST_URL}/api/users/student-result/${id}`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
    })
    return res.json();
}

function Psychomoto() {
    const history = useHistory()
    const { id } = useParams()
    const [result, setResult] = useState()
    const [studentDetails, setStudentDetails] = useState({})
    const [attentiveness, setAttentiveness] = useState('')
    const [honesty, setHonesty] = useState('')
    const [politeness, setPoliteness] = useState('')
    const [neatness, setNeatness] = useState('')
    const [punctuality, setPunctuality] = useState('')
    const [selfControl, setSelfControl] = useState('')
    const [obedience, setObedience] = useState('')
    const [reliability, setReliability] = useState('')
    const [responsibility, setResponsibility] = useState('')
    const [relationship, setRelationship] = useState('')
    const [isLoading, setIsLoading] = useState()

    // const formControlButton = { display: 'flex', flexDirection: 'row', marginLeft: 'auto', marginRight: '300px', marginTop: '-12px', alignItems: 'center',justifyContent:'space-between' }
    // const formLabel = { display: 'flex', flexDirection: 'row' }

    // React query fecth data
    const { data, status } = useQuery(['StudentProfile', id], fetchStudentProfile)

    useEffect(() => {

        if (!data) return
        setResult(data.result)
        //    setTeacherComment(data.result.teacherComment.comment)
        setStudentDetails(data.stdDetails)
        // setProfile(data.student)

    }, [data])

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!attentiveness || !honesty || !politeness || !neatness || !punctuality || !selfControl || !obedience || !reliability ||
            !responsibility || !relationship) return alert('Please Select a value for all field')

        setIsLoading(true)
        const response = await fetch(`${HOST_URL}/api/staff/psychomoto`, {
            method: 'put',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                resultId: result._id,
                attentiveness,
                honesty,
                politeness,
                neatness,
                punctuality,
                selfControl,
                obedience,
                reliability,
                responsibility,
                relationship


            })
        })
        const data = await response.json()
        console.log(data)

        if (data.error) {
            setIsLoading(false)

            alert(data.error)
        } else {
            console.log(result)

            setIsLoading(false)
            alert(data.message)
            history.push(`/student/result/${id}`)

        }

    }


    return (
        <>
            <h3 className="text-center">Student Details</h3>
            <h4>Student Name: {studentDetails?.firstname} {studentDetails?.lastname}</h4>
            <h4>Session: {`${result?.year - 1}/${result?.year}`}</h4>
            <h4>Term:{result?.term === 1 ? 'First' : result?.term === 2 ? 'Second' : 'Third'} Term</h4>
            <h4 style={{ marginBottom: '30px' }}>Class: {studentDetails?.stdClass}</h4>

            <form onSubmit={onSubmit} encType="multipart/form-data">

                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }} >
                    <div className="form-radio" >
                        <label >Attentiveness </label>
                        <RadioGroup className='radio-group' name="attentiveness" selectedValue={attentiveness} onChange={(value) => setAttentiveness(value)}>
                            <Radio value="5" className='ml-4 mr-1' />Excellent
                            <Radio value="4" className='ml-4 mr-1' />Very Good
                            <Radio value="3" className='ml-4 mr-1' />Good
                            <Radio value="2" className='ml-4 mr-1' />Fair
                            <Radio value="1" className='ml-4 mr-1' />Poor
                        </RadioGroup>
                    </div>

                    <div className="form-radio" >
                        <label >Honesty </label>
                        <RadioGroup className='radio-group' name="honesty" selectedValue={honesty} onChange={(value) => setHonesty(value)}>
                            <Radio value="5" className='ml-4 mr-1' />Excellent
                            <Radio value="4" className='ml-4 mr-1' />Very Good
                            <Radio value="3" className='ml-4 mr-1' />Good
                            <Radio value="2" className='ml-4 mr-1' />Fair
                            <Radio value="1" className='ml-4 mr-1' />Poor
                        </RadioGroup>
                    </div>
                    <div className="form-radio" >
                        <label >Politeness </label>
                        <RadioGroup className='radio-group' name="politeness" selectedValue={politeness} onChange={(value) => setPoliteness(value)}>
                            <Radio value="5" className='ml-4 mr-1' />Excellent
                            <Radio value="4" className='ml-4 mr-1' />Very Good
                            <Radio value="3" className='ml-4 mr-1' />Good
                            <Radio value="2" className='ml-4 mr-1' />Fair
                            <Radio value="1" className='ml-4 mr-1' />Poor
                        </RadioGroup>
                    </div>
                    <div className="form-radio" >
                        <label >Neatness </label>
                        <RadioGroup className='radio-group' name="neatness" selectedValue={neatness} onChange={(value) => setNeatness(value)}>
                            <Radio value="5" className='ml-4 mr-1' />Excellent
                            <Radio value="4" className='ml-4 mr-1' />Very Good
                            <Radio value="3" className='ml-4 mr-1' />Good
                            <Radio value="2" className='ml-4 mr-1' />Fair
                            <Radio value="1" className='ml-4 mr-1' />Poor
                        </RadioGroup>
                    </div>
                    <div className="form-radio" >
                        <label >Punctuality </label>
                        <RadioGroup className='radio-group' name="punctuality" selectedValue={punctuality} onChange={(value) => setPunctuality(value)}>
                            <Radio value="5" className='ml-4 mr-1' />Excellent
                            <Radio value="4" className='ml-4 mr-1' />Very Good
                            <Radio value="3" className='ml-4 mr-1' />Good
                            <Radio value="2" className='ml-4 mr-1' />Fair
                            <Radio value="1" className='ml-4 mr-1' />Poor
                        </RadioGroup>
                    </div>
                    <div className="form-radio" >
                        <label >Self-Control/Calmness </label>
                        <RadioGroup className='radio-group' name="selfcontrol" selectedValue={selfControl} onChange={(value) => setSelfControl(value)}>
                            <Radio value="5" className='ml-4 mr-1' />Excellent
                            <Radio value="4" className='ml-4 mr-1' />Very Good
                            <Radio value="3" className='ml-4 mr-1' />Good
                            <Radio value="2" className='ml-4 mr-1' />Fair
                            <Radio value="1" className='ml-4 mr-1' />Poor
                        </RadioGroup>
                    </div>
                    <div className="form-radio" >
                        <label >Obedience </label>
                        <RadioGroup className='radio-group' name="obedience" selectedValue={obedience} onChange={(value) => setObedience(value)}>
                            <Radio value="5" className='ml-4 mr-1' />Excellent
                            <Radio value="4" className='ml-4 mr-1' />Very Good
                            <Radio value="3" className='ml-4 mr-1' />Good
                            <Radio value="2" className='ml-4 mr-1' />Fair
                            <Radio value="1" className='ml-4 mr-1' />Poor
                        </RadioGroup>
                    </div>
                    <div className="form-radio" >
                        <label >Reliability </label>
                        <RadioGroup className='radio-group' name="reliability" selectedValue={reliability} onChange={(value) => setReliability(value)}>
                            <Radio value="5" className='ml-4 mr-1' />Excellent
                            <Radio value="4" className='ml-4 mr-1' />Very Good
                            <Radio value="3" className='ml-4 mr-1' />Good
                            <Radio value="2" className='ml-4 mr-1' />Fair
                            <Radio value="1" className='ml-4 mr-1' />Poor
                        </RadioGroup>
                    </div>
                    <div className="form-radio" >
                        <label >Sense Of Responsibility</label>
                        <RadioGroup className='radio-group' name="responsibility" selectedValue={responsibility} onChange={(value) => setResponsibility(value)}>
                            <Radio value="5" className='ml-4 mr-1' />Excellent
                            <Radio value="4" className='ml-4 mr-1' />Very Good
                            <Radio value="3" className='ml-4 mr-1' />Good
                            <Radio value="2" className='ml-4 mr-1' />Fair
                            <Radio value="1" className='ml-4 mr-1' />Poor
                        </RadioGroup>
                    </div>
                    <div className="form-radio" >
                        <label >Relationship with others</label>
                        <RadioGroup className='radio-group' name="relationship" selectedValue={relationship} onChange={(value) => setRelationship(value)}>
                            <Radio value="5" className='ml-4 mr-1' />Excellent
                            <Radio value="4" className='ml-4 mr-1' />Very Good
                            <Radio value="3" className='ml-4 mr-1' />Good
                            <Radio value="2" className='ml-4 mr-1' />Fair
                            <Radio value="1" className='ml-4 mr-1' />Poor
                        </RadioGroup>
                    </div>


                </div>

                {isLoading ?
                    <button className='btn btn-primary btn-block'>
                        <Loader type="TailSpin" color="#FFF" height={20} width={20} />
                    </button>
                    :
                    <button type='submit' className='btn btn-primary btn-block'>Submit</button>
                }

            </form>
        </>
    );
}

export default Psychomoto;
