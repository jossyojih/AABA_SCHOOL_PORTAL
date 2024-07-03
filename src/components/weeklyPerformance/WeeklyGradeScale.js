import React, { useEffect } from 'react'

function WeeklyGradeScale({ studentDetails }) {

    return (
        <div className='gradeScale'>
            <table className="table table-bordered gradeAnalysis right" id="dataTable" cellSpacing="0">
                <thead >
                    <tr >
                        <th  style={{padding:'3px', fontSize:"14px"}} >Grade Scale</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Excellent </td>
                        <td >5</td>
                    </tr>

                    <tr>
                        <td>Very Good </td>
                        <td >4</td>
                    </tr>
                    <tr>
                        <td>Good </td>
                        <td >3</td>
                    </tr>
                    <tr>
                        <td>Fair </td>
                        <td >2</td>
                    </tr>
                    <tr>
                        <td>Poor </td>
                        <td >1</td>
                    </tr>

                </tbody>
            </table>
        </div>
    )
}

export default WeeklyGradeScale
