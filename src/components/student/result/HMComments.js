import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import { HOST_URL } from '../../../config'
import Loader from 'react-loader-spinner'
import { useStateValue } from '../../../StateProvider';

import { useQuery, usePaginatedQuery } from 'react-query'

const fetchStudentProfile = async (key, id) => {
    const res = await fetch(`${HOST_URL}/api/users/student-result/${id}`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
    })
    return res.json();
}


function HMComment() {
    const [{ user }, dispatch] = useStateValue()
    const history = useHistory()
    const { id } = useParams()
    const [result, setResult] = useState({})
    const [studentDetails, setStudentDetails] = useState({})
    const [hmComment, setHMComment] = useState('')
    const [isLoading, setIsLoading] = useState()


    // React query fecth data
    const { data, status } = useQuery(['StudentProfile', id], fetchStudentProfile)

    useEffect(() => {

        if (!data) return
        setResult(data?.result)
      
        setStudentDetails(data.stdDetails)
        // setProfile(data.student)

    }, [data])

    useEffect(() => {
        if(!result?.hmComment) return
        setHMComment(result.hmComment?.comment)
    }, [result])


    const onSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const response = await fetch(`${HOST_URL}/api/admin/hm-remark`, {
            method: 'put',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                resultId: result._id,
                hmComment,
                hmId: user._id,


            })
        })
        const data = await response.json()
        if (data.error) {
            setIsLoading(false)

            alert(data.error)
        } else {

            setIsLoading(false)
            alert(data.message)
            history.push(`/student/result/${id}`)

        }

    }


    return (
        <div className="form-box">

            <form onSubmit={onSubmit} encType="multipart/form-data">

                <h3 className="text-center">Student Details</h3>
                <h4>Student Name: {studentDetails?.firstname} {studentDetails?.lastname}</h4>
                <h4>Session: {`${result?.year - 1}/${result?.year}`}</h4>
                <h4>Term:{result?.term === 1 ? 'First' : result?.term === 2 ? 'Second' : 'Third'} Term</h4>
                <h4 style={{ marginBottom: '30px' }}>Class: {studentDetails?.stdClass}</h4>


                <div className="form-group">
                    <div className="form-group-display">
                        <label>Head Teacher Remark</label>
                        <textarea className="form-control" name="teacher's comment" value={hmComment} placeholder="Enter HM comment" onChange={(e) => setHMComment(e.target.value)}
                            rows="3" required wrap='hard'></textarea>
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
        </div>
    );
}

export default HMComment;
