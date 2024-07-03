import React, { useState, useEffect } from 'react'
import { HOST_URL } from '../../../../config'
import { useQuery } from 'react-query'

const fetchStudentSubjects = async (key, section) => {
    const res = await fetch(`${HOST_URL}/api/users/studentsubjects/${section}`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
    })
    return res.json();
}

function AddSubject({ studentData, scores, setScores, setStep }) {
    const [section, setSection] = useState(studentData.section)
    const [subjects, setSubjects] = useState([])
    const [subject, setSubject] = useState()
    // React query fecth data
    const { data, status } = useQuery(['StudentSubjects', section], fetchStudentSubjects)

    useEffect(() => {

        if (!data) return

        setSubjects(data.subjects)

    }, [data])

    function saveSelection(subject) {
        if (!subject) return
        if (window.confirm(`Are you sure you want to Add ${subject} to this student result?`)) {

            setScores([...scores, {
                subject: subject, CA: {
                    first: 0,
                    second: 0,
                    total: 0
                },
                exam: 0,
                total: 0,
                grade: '',
                remark: '',
                subjectPosition: '',
                classAverage: '',
                classHigh: '',
                classLow: ''

            }])
            setStep(1)
        } else {
            return
        }
    }
    return (
        <div style={{ width: '80%', margin: "10rem auto" }}>
            <div className='d-flex justify-content-center align-items-center'>
                <div className="form-group-display" >
                    <label htmlFor="class">Select Subject</label>

                    <select className="form-control" name="class" id="class" onChange={(e) => {
                        setSubject(e.target.value);

                    }} value={subject} required>
                        <option value="">Select Subject</option>
                        {
                            subjects?.map((item) => {
                                return <option value={item}>{item}</option>
                            })
                        }


                    </select>
                </div>
            </div>
            <button style={{ width: '50%', margin: "0 auto" }} onClick={() => saveSelection(subject)} className='btn btn-primary btn-block'>Save</button>

        </div>
    )
}

export default AddSubject