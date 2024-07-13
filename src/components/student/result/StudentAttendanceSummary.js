import React, { useEffect, useState } from 'react';

function StudentAttendanceSummary({ id, result }) {
    const [data, setData] = useState([])
    const [schOpened, setSchOpened] = useState(0)
    const [present, setPresent] = useState(0)
    const [absent, setAbsent] = useState(0)

    useEffect(() => {

        setSchOpened(result.stdAttendance?.schOpened)
        setPresent(result.stdAttendance?.present)
        setAbsent(result.stdAttendance?.schOpened - result.stdAttendance?.present)


    }, [result]);


    return (
        <div>
            <table className="table table-bordered" id="dataTable" cellSpacing="0">
                <thead >
                    <tr >
                        <th colSpan='3'>Attendance Summary</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan='2'>Number of Times School Opened</td>
                        <td >{schOpened} </td>
                    </tr>
                    <tr>
                        <td colSpan='2'>Number Of Times Present</td>
                        <td >{present}</td>
                    </tr>
                    <tr>
                        <td colSpan='2'>Number Of Times Absent</td>
                        <td >{absent || ""} </td>
                    </tr>

                </tbody>
            </table>
        </div>
    );
}

export default StudentAttendanceSummary;
