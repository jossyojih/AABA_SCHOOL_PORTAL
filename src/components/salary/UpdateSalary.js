import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery } from 'react-query'
import { HOST_URL } from '../../config'
import Loader from 'react-loader-spinner'
import './salary.css'


const fetchSalaryInfo = async (key, id) => {
    const res = await fetch(`${HOST_URL}/api/payments/single-salary/${id}`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
    })
    return res.json();
}

function UpdateSalary({ staffDetails, singleSalary, setStep }) {
    const history = useHistory()
    const [id, setId] = useState(singleSalary)
    const [term, setTerm] = useState()
    const [date, setDate] = useState()
    const [month, setMonth] = useState()
    const [session, setSession] = useState()
    const [paymentYear, setPaymentYear] = useState()
    const [paymentMtd, setPaymentMtd] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [grossSalary, setGrossSalary] = useState()
    const [netSalary, setNetSalary] = useState()
    const [deductions, setDeductions] = useState(0)
    const [comment, setComment] = useState()

    // React query fecth data
    const { data, status } = useQuery(['requisitionForms', id], fetchSalaryInfo)

    useEffect(() => {
        if (!data) return
        console.log(data)
        setMonth(data.month)
        setSession(data.schoolYear)
        setPaymentYear(data.paymentYear)
        setTerm(data.term)
        setDate(data.paymentDate)
        setGrossSalary(data.grossSalary)
        setDeductions(data.deductions)
        setNetSalary(data.netSalary)
        setComment(data.comment)
        setPaymentMtd(data.paymentMtd)
    }, [data])


    function getNet() {
        setNetSalary(grossSalary - deductions)
    }

    async function updateSalary(e) {
        e.preventDefault()

        setIsLoading(true)
        const response = await fetch(`${HOST_URL}/api/payments/single-salary-update/${id}`, {
            method: 'put',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                staff_id: staffDetails._id,
                term,
                paymentDate: date,
                month,
                paymentYear,
                schoolYear: session,
                grossSalary,
                deductions,
                netSalary,
                paymentMtd,
                comment

            })
        })
        const data = await response.json()
        console.log(data)
        return
        if (data.error) {
            setIsLoading(false)
            alert(data.error)
            setStep(3)
        } else {
            alert(data.message)
            setIsLoading(false)
            setStep(3)
        }

    }

    return (
        <div className='paysalary'>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className='text-primary'>Staff Info</h5>
                </div>
                <div className="card-body">

                    <h6>Name: {staffDetails?.firstname} {staffDetails?.lastname}</h6>
                    <h6>Sex: {staffDetails?.sex}</h6>
                    <h6>Phone: {staffDetails?.phone}</h6>
                    <h6>Email: {staffDetails?.email}</h6>
                    <h6>Class: {staffDetails?.classTeacher}</h6>
                </div>
            </div>

            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className='text-primary'>Payment Details</h5>
                </div>
                <div className="card-body">
                    <h6>Session: {session - 1}/{session}</h6>
                    <h6>Term: {term === 1 ? 'First Term' : term === 2 ? 'Second Term' : 'Third Term'}</h6>
                    <form onSubmit={updateSalary}>
                        <div className="form-group">
                            <label className='mr-4'>Gross Salary <del style={{ textDecorationStyle: 'double' }}>N</del></label>
                            <input type='number' value={grossSalary} placeholder='Enter Amount' onBlur={getNet} onChange={(e) => setGrossSalary(e.target.value)} required />

                        </div>
                        <div className="form-group">
                            <label className='mr-4'>Deduction <del style={{ textDecorationStyle: 'double' }}>N</del></label>
                            <input type='number' value={deductions} placeholder='Enter Amount' onBlur={getNet} onChange={(e) => setDeductions(e.target.value)} />

                        </div>
                        <div className="form-group">
                            <label className='mr-4'>Net Salary <del style={{ textDecorationStyle: 'double' }}>N</del></label>
                            <input type='number' value={netSalary} placeholder='Enter Name' onChange={(e) => setNetSalary(e.target.value)} required />

                        </div>

                        <div className="form-group-display">
                            <label htmlFor="month">Select Month</label>

                            <select className="form-control" name="month" onChange={(e) => {
                                setMonth(e.target.value);

                            }} value={month} required>
                                <option value="">Select Month</option>
                                <option value={0}>January</option>
                                <option value={1}>February</option>
                                <option value={2}>March</option>
                                <option value={3}>April</option>
                                <option value={4}>May</option>
                                <option value={5}>June</option>
                                <option value={6}>July</option>
                                <option value={7}>August</option>
                                <option value={8}>September</option>
                                <option value={9}>October</option>
                                <option value={10}>November</option>
                                <option value={11}>December</option>
                            </select>
                        </div>
                        <div className="form-group-display">
                            <label htmlFor="month">Payment Method</label>

                            <select className="form-control" name="month" onChange={(e) => {
                                setPaymentMtd(e.target.value);

                            }} value={paymentMtd} required>
                                <option value="">Select Payment Method</option>
                                <option value={'Cash'}>Cash</option>
                                <option value={'Cheque'}>Cheque</option>
                                <option value={'Transfer'}>Transfer</option>
                            </select>
                        </div>
                        <div className="form-group-display">
                            <label htmlFor="comment">Comment</label>

                            <textarea className="form-control" name="comment" onChange={(e) => {
                                setComment(e.target.value);

                            }} value={comment}>

                            </textarea>
                        </div>
                        <div className='bookList_btn'>
                            <button className="btn btn-primary btn-block" onClick={() => setStep(3)}> Go Back  </button>
                            {isLoading ? <button className="btn btn-primary btn-block"><Loader type="TailSpin" color="#FFF" height={20} width={20} /></button> :
                                <button type='submit' className="btn btn-primary btn-block">Update Pay</button>

                            }
                        </div>
                    </form>

                </div>
            </div>

        </div>
    )
}

export default UpdateSalary