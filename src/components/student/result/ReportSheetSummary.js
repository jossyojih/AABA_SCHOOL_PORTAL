import React, { useEffect } from 'react'

function ReportSheetSummary({ scores, total, average, grade, scale, classHigh, classLow, cummulative }) {

    // console.log(cummulative, "Cummulative")
    let overallCumm;
    if (!cummulative?.firstTerm?.average && !cummulative?.secondTerm?.average) {
        overallCumm = average?.toFixed(1);
    } else if (!cummulative?.firstTerm?.average && cummulative?.secondTerm?.average) {
        overallCumm = ((cummulative?.secondTerm?.average + average) / 2)?.toFixed(1);
    } else if (cummulative?.firstTerm?.average && !cummulative?.secondTerm?.average) {
        overallCumm = ((cummulative?.firstTerm?.average + average) / 2)?.toFixed(1);
    } else {
        overallCumm = ((cummulative?.firstTerm?.average + cummulative?.secondTerm?.average + average) / 3).toFixed(1);
    }


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
                    {/* <tr>
                        <td >Class Highest Average</td>
                        <td colSpan='2'>{classHigh || 0}</td>
                    </tr>
                    <tr>
                        <td >Class Lowest Average</td>
                        <td colSpan='2'>{classLow || 0}</td>
                    </tr> */}
                    <tr>
                        <td >First Term Average</td>
                        <td colSpan='2'>{cummulative?.firstTerm?.average || "NA"}</td>
                    </tr>
                    <tr>
                        <td >Second Term Average</td>
                        <td colSpan='2'>{cummulative?.secondTerm?.average || "NA"}</td>
                    </tr>
                    <tr>
                        <td >Overall Cummulative Average</td>
                        <td colSpan='2'>{overallCumm || 0}</td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}

export default ReportSheetSummary
