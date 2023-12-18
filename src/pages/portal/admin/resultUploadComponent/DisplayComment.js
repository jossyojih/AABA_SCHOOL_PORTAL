import React, { useEffect, useState } from 'react';
import moment from 'moment'

function DisplayComment({ id, result, termStart }) {


    return (
        <div className='displayComment'>
            <table className="table table-bordered" id="dataTable" cellSpacing="0">
                <tbody>
                    <tr>
                        <th >Teacher's Remark</th>
                        <td >{result.teacherComment?.comment} </td>
                    </tr>
                    <tr>
                        <th >Teacher’s Name:</th>
                        <td >{result.teacherComment?.teacherName}</td>
                    </tr>
                    <tr>
                        <th >Head Teacher’s Remark:</th>
                        <td >{result.hmComment?.comment} </td>
                    </tr>
                    <tr>
                        <th >Head Teacher’s Name:</th>
                        <td >{result.hmComment?.hmName}</td>
                    </tr>
                    <tr>
                        <th >Next Term Begins:</th>
                        <td >{moment(termStart).format('MMMM Do YYYY')}.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default DisplayComment;
