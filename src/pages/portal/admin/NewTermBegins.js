import React, { useState, useEffect } from 'react'
import { HOST_URL } from '../../../config'
import DatePicker from "react-datepicker";
import Loader from 'react-loader-spinner'

function NewTermBegins() {
    const [termStart, setTermStart] = useState(new Date())
    const [showType, setShowType] = useState(null)
    const [message, setMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const updateTermStart =async (e) => {
        e.preventDefault()
        setIsLoading(true)
       
            const response = await fetch(`${HOST_URL}/api/admin/updatetermstart`, {
                method: 'put',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    termStart
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
            <h3 className="text-center mb-3">Set New Term Start Date</h3>
            <div className="form-group">
                <div className="form-group-display">
                    <label>Select Date</label>
                    <DatePicker name="termStart"
                        className={'form-control reg'}
                        selected={termStart}
                        onChange={date => setTermStart(date)}
                    />
                </div>
            </div>

            <div className='registration_btn'>

                {isLoading ? <span><Loader type="TailSpin" color="#00BFFF" height={40} width={40} /> Processing...</span> :

                    <button onClick={updateTermStart} className="btn btn-primary btn-block">Submit</button>

                }
            </div>

        </div>
    )
}

export default NewTermBegins
