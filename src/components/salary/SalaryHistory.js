import React, { useEffect, useState } from 'react'
import { HOST_URL } from '../../config'
import { useQuery } from 'react-query'
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import SelectSession from '../SelectSession';
import moment from 'moment'


const fetchSalaryHistory = async (key, session, term, staff_id) => {

    if (!session || !term || !staff_id) return
    const res = await fetch(`${HOST_URL}/api/payments/view-salary-history/${staff_id}?session=${session}&term=${term}`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
    })
    return res.json();
}

function SalaryHistory({ staffDetails, setStep, setSingleSalary }) {
    const history = useHistory()
    const [staff_id, setStaff_id] = useState(staffDetails._id)
    const [session, setSession] = useState()
    const [term, setTerm] = useState()
    const [salaryDetails, setSalaryDetails] = useState([])
    const months = ["January", "February", "March", "April", "May", "June", "July","August","September", "October","November","December"]

    // React query fecth data
    const { data, status } = useQuery(['requisitionForms', session, term, staff_id], fetchSalaryHistory)

    useEffect(() => {

        const abortController = new AbortController()
        const signal = abortController.signal

        async function fetchSchoolCalendar() {
            const res = await fetch(`${HOST_URL}/api/admin/school-calendar`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                signal: signal
            })
            const result = await res.json();
            setSession(result.year)
            setTerm(result.term)
        }
        fetchSchoolCalendar()
        return () => {
            abortController.abort()
        };
    }, [])

    useEffect(() => {
      if(!data) return
     setSalaryDetails(data)
    }, [data])
    
function editPay(pay_id) {
    setSingleSalary(pay_id)
    setStep(4)
}

useEffect(() => {
 console.log(salaryDetails)
}, [salaryDetails])

    return (
        <div>

            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className='text-primary'>Staff Salary history</h5>
                </div>
                <div className="card-body">

                    <h6>Name: {staffDetails?.firstname} {staffDetails?.lastname} {staffDetails?.middlename}</h6>
                    <h6>Sex: {staffDetails?.sex}</h6>
                    <h6>Phone: {staffDetails?.phone}</h6>
                    <h6>Email: {staffDetails?.email}</h6>
                    <h6>Class: {staffDetails?.classTeacher}</h6>
                </div>
            </div>
            <div style={{ display: 'flex' }}>
                <div className="form-group-display">
                    <SelectSession
                        disabled={false}
                        year={session}
                        setYear={setSession}
                    />

                </div>
                <div className="form-group-display">
                    <label htmlFor="class">Select Term</label>

                    <select className="form-control" name="class" id="class" onChange={(e) => {
                        setTerm(e.target.value);

                    }} value={term}>
                        <option value="">Select Term</option>
                        <option value={1}>First Term</option>
                        <option value={2}>Second Term</option>
                        <option value={3}>Third Term</option>
                    </select>
                </div>
            </div>


            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    {/* <h6 className="m-0 font-weight-bold text-primary">{stdClass}</h6> */}
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>Payment Date</th>
                                    <th>Month </th>
                                    <th>Gross Salary</th>
                                    <th>Deduction</th>
                                    <th>Net Salary</th>
                                    <th>Payment Method</th>
                                    <th>Comment</th>
                                    <th>Action</th>

                                </tr>
                            </thead>

                            <tbody>
                                <>
                                    {salaryDetails?.map(item => {
                                        return (
                                            <tr key={item._id}>
                                                <td>{moment(item.paymentDate).format('MMMM Do YYYY')}</td>
                                                <td>{months[item.month]}</td>
                                                <td>{item.grossSalary}</td>
                                                <td>{item.deductions}</td>
                                                <td>{item.netSalary}</td>
                                                <td>{item.paymentMtd}</td>
                                                <td>{item.comment}</td>
                                                <td>
                                                    <button className='btn btn-block btn-primary btn-sm ml-2' onClick={() => editPay(item._id)}>Edit</button> </td>
                                            </tr>

                                        )
                                    })}
                                </>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <button className="btn btn-primary btn-block" onClick={() => setStep(1)}> Go Back  </button>
        </div>
    )
}

export default SalaryHistory