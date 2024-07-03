import React, { useEffect } from 'react'

function GradeScale({ studentDetails }) {

    return (
        <div className={`${studentDetails?.section === "Secondary" && "secondary-gradeScale"} gradeScale`}>
            <table className="table table-bordered gradeAnalysis right" id="dataTable" cellSpacing="0">
                <thead >
                    <tr >
                        <th colSpan='3'>GRADE SCALE</th>
                        <th colSpan='1'>OTHERS</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        studentDetails?.section !== "Secondary" &&

                        <>

                            <tr>
                                <td>A</td>
                                <td > 85-100%</td>
                                <td>Excellent</td>
                                <td ></td>
                            </tr>


                            <tr>
                                <td>B</td>
                                <td >75-84.9%</td>
                                <td>Very Good</td>
                                <td ></td>
                            </tr>


                            <tr>
                                <td>C</td>
                                <td > 60-74.9%</td>
                                <td>Good</td>
                                <td ></td>
                            </tr>

                            <tr>
                                <td> D</td>
                                <td>50-59.9%</td>
                                <td>Pass</td>
                                <td ></td>
                            </tr>
                            <tr>
                                <td> F</td>
                                <td >0-49.9%</td>
                                <td>FAIL</td>
                                <td ></td>

                            </tr>
                        </>
                    }
                    {
                        studentDetails?.section === "Secondary" &&
                        <>
                            <tr className='secondary'>
                                <td>A+</td>
                                <td >95-100%</td>
                                <td>EXCEPTIONAL</td>
                                <td >A</td>
                            </tr>
                            <tr className='secondary'>
                                <td>A</td>
                                <td > 90-94.9%</td>
                                <td>DISTINCTION</td>
                                <td >B</td>
                            </tr>
                            <tr className='secondary'>
                                <td>A-</td>
                                <td >85-89.9%</td>
                                <td>EXCELLENT</td>
                                <td >C</td>
                            </tr>
                            <tr className='secondary'>
                                <td>B+</td>
                                <td > 80-84.9</td>
                                <td>VERY GOOD</td>
                                <td >D</td>
                            </tr>
                            <tr className='secondary'>
                                <td>B</td>
                                <td >75-79.9%</td>
                                <td>UPPER CREDIT</td>
                                <td >F</td>
                            </tr>
                            <tr className='secondary'>
                                <td>B-</td>
                                <td >70-74.9</td>
                                <td>LOWER CREDIT</td>
                                <td ></td>
                            </tr>
                            <tr className='secondary'>
                                <td>C+</td>
                                <td > 65-69.9%</td>
                                <td>GOOD</td>
                                <td ></td>
                            </tr>
                            <tr className='secondary'>
                                <td>C</td>
                                <td > 60-64.9%</td>
                                <td>FAIR</td>
                                <td ></td>
                            </tr>
                            <tr className='secondary'>
                                <td>C-</td>
                                <td >50-59.9%</td>
                                <td>PASS</td>
                                <td ></td>
                            </tr>
                            <tr className='secondary'>
                                <td> D</td>
                                <td>45-49.9%</td>
                                <td>POOR</td>
                                <td ></td>
                            </tr>
                            <tr className='secondary'>
                                <td> F</td>
                                <td >0-44.9%</td>
                                <td>FAIL</td>
                                <td ></td>

                            </tr>
                        </>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default GradeScale
