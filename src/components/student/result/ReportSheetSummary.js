import React, { useEffect } from 'react'

function ReportSheetSummary({ scores, total, average, grade, scale, classHigh, classLow }) {

    return (
        <div>
            <table className="table table-bordered left" id="dataTable" cellSpacing="0">
                <thead >
                    <tr >
                        <th colSpan='3'>Report Sheet Summary</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan='2'>Total Score</td>
                        <td > {scores?.length * 100 || 0}</td>
                    </tr>
                    <tr>
                        <td colSpan='2'>Score Obtained</td>
                        <td >  {total || 0}</td>
                    </tr>
                    <tr>
                        <th colSpan='3'></th>

                    </tr>
                    <tr>
                        <td >%tage</td>
                        <td colSpan='2'> {average || 0}</td>
                    </tr>
                    <tr>
                        <td >Grade</td>
                        <td colSpan='2'> {grade || 0}</td>
                    </tr>
                    <tr>
                        <td >Scale</td>
                        <td colSpan='2'>{scale || 0}</td>
                    </tr>
                    <tr>
                        <td >Class Highest Average</td>
                        <td colSpan='2'>{classHigh || 0}</td>
                    </tr>
                    <tr>
                        <td >Class Lowest Average</td>
                        <td colSpan='2'>{classLow || 0}</td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}

export default ReportSheetSummary
