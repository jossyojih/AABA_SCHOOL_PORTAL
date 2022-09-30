import React, { useState, useEffect } from 'react'

function InputSchoolEvents({ i, events }) {
    const [dWeek, setdWeek] = useState(events[i].week || '')
    const [dDate, setdDate] = useState(events[i].date ||'')
    const [dActivity, setdActivity] = useState(events[i].activity || '')

    useEffect(() => {

        console.log(events[i])
    }, [])


    const getWeek = () => {
        events[i].week = dWeek
    }

    const getDate = () => {
        events[i].date = dDate
    }
    const getActivity = () => {
        events[i].activity = dActivity
    }
    return (
<>
            <td className='inputBookList'>
                <select className="form-control" name="week" id="week" onChange={(e) => {
                    setdWeek(e.target.value);


                }} onBlur={getWeek} value={dWeek}>
                    <option value=''>Select Week</option>
                    <option value="One">Week 1</option>
                    <option value="Two">Week 2</option>
                    <option value="Three">Week 3</option>
                    <option value="Four">Week 4</option>
                    <option value="Five">Week 5</option>
                    <option value="Six">Week 6</option>
                    <option value="Seven">Week 7</option>
                    <option value="Eight">Week 8</option>
                    <option value="Nine">Week 9</option>
                    <option value="Ten">Week 10</option>
                    <option value="Eleven">Week 11</option>
                    <option value="Twelve">Week 12</option>
                    <option value="Thirteen">Week 13</option>
                    <option value="Fourteen">Week 14</option>
                    <option value="Holiday">Holiday</option>

                </select>
            </td>
            <td>
                <input type='text' placeholder='Date' value={dDate} onBlur={getDate} onChange={(e) => setdDate(e.target.value)} />
            </td>
            <td>
                <input type='text' placeholder='Activity' value={dActivity} onBlur={getActivity} onChange={(e) => setdActivity(e.target.value)} />
            </td>
</>

    )
}

export default InputSchoolEvents