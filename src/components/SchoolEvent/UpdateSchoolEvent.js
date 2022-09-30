import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { HOST_URL } from '../../config'
import { useQuery } from 'react-query'
import InputSchoolEvents from './InputSchoolEvents'
import Loader from 'react-loader-spinner'

const fetchSchoolEvents = async (key) => {
    const res = await fetch(`${HOST_URL}/api/admin/school-event-calendar`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
    })
    return res.json();
}

function UpdateSchoolEvent() {
    const history = useHistory()
    const [events, setEvents] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [inputFields, setInputFields] = useState(1)
    const [update, setUpdate] = useState(false)


    // React query fecth data
    const { data, status } = useQuery(['StudentSchoolEvent'], fetchSchoolEvents)


    useEffect(() => {

        if (!data) return
        if (!data.event) {
            const event = []
            event.push({
                week: '',
                date: '',
                activity: '',
            })
            setEvents(event)

        }else{
            setEvents(data.event.events)
        }

    }, [data])



    const updateSchoolEvent = async () => {
        setIsLoading(true)
        const eventData = events.filter(item => item.week !== '')
        if (!eventData[0]) {
            setIsLoading(false)
            return alert('Please Enter An Event')

        }

        const response = await fetch(`${HOST_URL}/api/admin/update-eventcalendar`, {
            method: 'put',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                eventData,

            })
        })
        const data = await response.json()
        if (data.error) {
            setIsLoading(false)
            return alert(data.error)
        }
        alert('Events updated succesfully')
        setIsLoading(false)
         history.goBack()

    }

    const addBook = (e) => {
        e.preventDefault();
        console.log(events)
        setEvents(prev => [...prev, { week: '', date: '', activity: '' }])



    };
    return (
        <div className='studentbooklist'>

            <table className="table table-bordered" id="dataTable" width="80%" cellSpacing="0">
                <thead>
                    <tr>
                        <th>WEEK</th><th>DATE</th><th>Activity</th>
                    </tr>

                </thead>
                <tbody>

                    {events?.map((event, i) => {
                        return (
                            <tr>
                                <InputSchoolEvents
                                    key={i}
                                    i={i}
                                    events={events}

                                />
                            </tr>
                        )

                    }

                    )}
                </tbody>
            </table>
            <div className='bookList_btn'>
                <button className="btn btn-primary btn-block" onClick={addBook}> Add Another Activity  </button>
                {isLoading ? <button className="btn btn-primary btn-block"><Loader type="TailSpin" color="#FFF" height={20} width={20} /></button> :
                    <button onClick={updateSchoolEvent} className="btn btn-primary btn-block">Update</button>

                }
            </div>
        </div>
    )
}

export default UpdateSchoolEvent