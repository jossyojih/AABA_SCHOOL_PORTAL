import React, { useState, useEffect } from 'react';
import './adminportal.css'
import { HOST_URL } from '../../../config'
import { useQuery, usePaginatedQuery } from 'react-query'
import Loader from 'react-loader-spinner'

const fetchSchoolCalendar = async (key) => {
    const res = await fetch(`${HOST_URL}/api/admin/school-calendar`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
    })
    return res.json();
}


function SchoolCalendar() {
    const [term, setTerm] = useState(0)
    const [week, setWeek] = useState('One')
    const [year, setYear] = useState()
    const [active, setActive] = useState(false)
    const [changeTerm, setChangeTerm] = useState(false)
    const [changeWeek, setChangeWeek] = useState(false)
    const [changeYear, setChangeYear] = useState(false)
    const [showType, setShowType] = useState(null)
    const [message, setMessage] = useState('')
    const [edited, setEdited] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    // React query fecth data
    const { data, status } = useQuery(['Calendar'], fetchSchoolCalendar)

    useEffect(() => {
        if (!data) return

        setActive(data.active)
        setYear(data.year)
        setTerm(data.term)
        setWeek(data.week)
    }, [data])


    const upDateCalendar = async () => {
        if (!term || !week) {
            return
        }
        setIsLoading(true)
        try {
            const response = await fetch(`${HOST_URL}/api/admin/updatecalendar`, {
                method: 'put',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    year,
                    term,
                    week

                })
            })

            const data = await response.json()
            console.log(data)
            if (data.error) {
                setIsLoading(false)
                setShowType('error')
                setMessage(data.error)
            } else {
                setIsLoading(false)
                setShowType('success')
                setMessage(data.message)
                setActive(true)
                setYear(year)
                setTerm(term)
                setWeek(week)
                setChangeWeek(false)
                setEdited(false)

            }


        } catch (error) {
            setIsLoading(false)
            console.log(error)
            setShowType('error')
            setMessage(error)
        }

    }


    return (
        <div className='schoolCalendar'>
            {showType === 'success' &&
                <div class="alert alert-success" role="alert">
                    {message}
                </div>
            }
            {showType === 'error' &&
                <div class="alert alert-danger" role="alert">
                    {message}
                </div>
            }
            <h3 className="text-center mb-3">Set School Calendar</h3>

            <div className="form-group">
                <div className="form-group-display">
                    <label htmlFor="term">Status</label>
                    <span>{active ? 'Active' : 'Inactive'}
                        {/* {!active &&
                       
                        <span style={{ cursor: 'pointer' }} className='text-primary ml-5' onClick={() => setChangeTerm(true)}>Activate</span>
                    } */}
                    </span>


                </div>
            </div>
            <div className="form-group">
                <div className="form-group-display">
                    <label htmlFor="year">School Session</label>
                    {changeYear ?

                        <select className="form-control" name="year" onChange={(e) => {
                            setYear(Number(e.target.value));
                            setChangeYear(false)
                            setEdited(true)

                        }} value={year}>

                            <option value={2022}>2021/2022</option>
                            <option value={2023}>2022/2023</option>
                            <option value={2024}>2023/2024</option>
                            <option value={2025}>2024/2025</option>
                            <option value={2026}>2025/2026</option>
                            <option value={2027}>2026/2027</option>


                        </select>
                        : <span>{`${year}/${year + 1}`}
                            <span style={{ cursor: 'pointer' }} className='text-primary ml-5' onClick={() => setChangeYear(true)}>edit</span></span>
                    }
                </div>

            </div>
            <div className="form-group">
                <div className="form-group-display">
                    <label htmlFor="term">Term</label>
                    {changeTerm ?
                        <select className="form-control" name="term" id="class" onChange={(e) => {
                            setTerm(Number(e.target.value));
                            setChangeTerm(false)
                            setEdited(true)
                        }} value={term}>

                            <option value={1}>First Term</option>
                            <option value={2}>Second Term</option>
                            <option value={3}>Third Term</option>
                        </select>
                        : <span>{term === 1 ? 'First Term' : term === 2 ? 'Second Term' : 'Third Term'}
                            <span style={{ cursor: 'pointer' }} className='text-primary ml-5' onClick={() => setChangeTerm(true)}>edit</span></span>
                    }
                </div>
            </div>
            <div className="form-group">
                <div className="form-group-display">
                    <label htmlFor="week">Current Week</label>
                    {changeWeek ?

                        <select className="form-control" name="week" id="week" onChange={(e) => {
                            setWeek(e.target.value);
                            setEdited(true)


                        }} value={week}>

                         
                        <option value="One">Week 1</option>
                        <option value="Two">week 2</option>
                        <option value="Three">week 3</option>
                        <option value="Four">week 4</option>
                        <option value="Five">week 5</option>
                        <option value="Six">week 6</option>
                        <option value="Seven">week 7</option>
                        <option value="Eight">week 8</option>
                        <option value="Nine">week 9</option>
                        <option value="Ten">week 10</option>
                        <option value="Eleven">week 11</option>
                        <option value="Twelve">week 12</option>
                        <option value="Thirteen">week 13</option>
                        <option value="Fourteen">week 14</option>
                        <option value="Holiday">Holiday</option>

                        </select>
                        : <span>{week}
                            <span style={{ cursor: 'pointer' }} className='text-primary ml-5' onClick={() => setChangeWeek(true)}>edit</span></span>
                    }
                </div>

            </div>
            {
                edited && <div>
                    {
                        isLoading ? <button className="btn btn-primary btn-block"><Loader type="TailSpin" color="#FFF" height={40} width={40} /></button> :
                            <button onClick={upDateCalendar} className="btn btn-primary btn-block">Update</button>
                    }
                </div>
            }


        </div>
    );
}

export default SchoolCalendar;
