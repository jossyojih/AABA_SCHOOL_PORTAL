import React, { useState, useEffect, useRef } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom'
import { useQuery, usePaginatedQuery } from 'react-query'
import Loader from 'react-loader-spinner'
import { HOST_URL } from '../../config'
import moment from 'moment'

const fetchStudentPaymentHistory = async (key, id) => {
    if (!id) return
    const res = await fetch(`${HOST_URL}/api/payments/studentpaymenthistory/${id}`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
    })
    return res.json();
}

function PaymentHistory() {
    const [isLoading, setIsLoading] = useState(false)
    const [studentDetails, setStdDetails] = useState({})
    const [payments, setPayments] = useState([])
    const [termInfo, setTermInfo] = useState()
    const history = useHistory()
    const { id } = useParams()
    // React query fecth data
    const { data, status } = useQuery(['StudentPaymentHistory', id], fetchStudentPaymentHistory)

    useEffect(() => {

        if (!data) return

        // Payment History data from query
        console.log(data)
        setStdDetails(data[0].studentDetails)
        setPayments(data)
        setTermInfo(data[0])
   
    }, [data])

    const getGrandTotal = () => {

        const grandTotal = payments?.map(payments => payments.paymentInfo).map(allTotal => allTotal.total)
        let grand = 0;
        for (let i = 0; i < grandTotal.length; i++) {
            grand = grand + grandTotal[i]

        }
        return (grand)

    }

    return (
        <div>
              <div>
                <h3 >Student Payment History {isLoading && <Loader type="TailSpin" color="#00BFFF" height={40} width={40} />}</h3>
              
            </div>
               <div className=''>
                <h4>Student Name: {studentDetails?.firstname} {studentDetails?.lastname} {studentDetails?.middlename}</h4>
                <h4>Session:  {`${termInfo?.year - 1}/${termInfo?.year}`}</h4>
                <h4>Term: {termInfo?.term}</h4>
                <h4>Section: {termInfo?.section}</h4>
                <h4>Class: {termInfo?.stdClass}</h4>
            </div>
          

            <div className="card shadow mb-4">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Class</th>
                                    <th>Term</th>
                                    <th>School Fee</th>
                                    <th>Uniform </th>
                                    <th>Text Books</th>
                                    <th>School Bus</th>
                                    <th>Registration</th>
                                    <th>Total</th>
                                </tr>
                            </thead>

                            <tbody>
                                <>
                                    {payments?.map(payments => {
                                        return (
                                            <tr key={payments._id}>
                                                <td style={{ cursor: 'pointer' }} >{moment(payments.timestamp).format('MMMM Do YYYY')}</td>
                                                <td>{payments.stdClass}</td>
                                                <td>{payments.term === 1 ? 'First' : payments.term === 2 ? 'Second' : 'Third'}</td>
                                                <td><span style={{ textDecoration: 'line-through', textDecorationStyle: 'double' }}>N</span> {payments.paymentInfo.schoolFees || '---'}</td>
                                                <td><span style={{ textDecoration: 'line-through', textDecorationStyle: 'double' }}>N</span> {payments.paymentInfo.uniform || '----'}</td>
                                                <td><span style={{ textDecoration: 'line-through', textDecorationStyle: 'double' }}>N</span> {payments.paymentInfo.books || '----'}</td>
                                                <td><span style={{ textDecoration: 'line-through', textDecorationStyle: 'double' }}>N</span> {payments.paymentInfo.schBus || '----'}</td>
                                                <td><span style={{ textDecoration: 'line-through', textDecorationStyle: 'double' }}>N</span> {payments.paymentInfo.registration || '----'}</td>
                                                <td><span style={{ textDecoration: 'line-through', textDecorationStyle: 'double' }}>N</span> {payments.paymentInfo.total || '----'}</td>
                                            </tr>

                                        )
                                    })}
                                </>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th colSpan='8'>Grand Total</th>
  
                                    <th><span style={{ textDecoration: 'line-through', textDecorationStyle: 'double' }}>N</span>{getGrandTotal()}</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default PaymentHistory;
