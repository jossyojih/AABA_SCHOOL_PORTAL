import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
// import '../Student/Student.css'
import Loader from 'react-loader-spinner'
import DatePicker from "react-datepicker";
import { HOST_URL } from '../../config'
import SelectSession from '../SelectSession';
import SelectClass from '../SelectClass';
import { useStateValue } from '../../StateProvider';


function PaymentsPage() {
    const [{ user }, dispatch] = useStateValue()
    const [sort, setSort] = useState('date')
    const [term, setTerm] = useState()
    const [month, setMonth] = useState()
    const [data, setData] = useState([])
    const [stdClass, setStdClass] = useState('')
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(false)
    const [date, setDate] = useState(new Date())
    const [year, setYear] = useState()


    useEffect(() => {

        async function fetchData() {
            if (sort !== 'date') return
            setIsLoading(true)
            const response = await fetch(`${HOST_URL}/api/payments/${date.toDateString()}?stdClass=${stdClass}`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
            })
            const data = await response.json()
            setIsLoading(false)
            console.log(data)
            setData(data)
        }
        fetchData()

    }, [date, stdClass])

    useEffect(() => {

       async function fetchData() {
            if (!month) return
            if (sort !== "month") return
            setIsLoading(true)
            const response = await fetch(`${HOST_URL}/api/payments/monthly_payment/${month}?stdClass=${stdClass}`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
            })
            const data = await response.json()
            setIsLoading(false)
            console.log(data)
            setData(data)
        }
        fetchData()
      
    }, [month, stdClass])

    useEffect(() => {

        async function fetchData(params) {
            if (!year || !term) {
                return
            }
            if (sort !== "term") return
            setIsLoading(true)
            const response = await fetch(`${HOST_URL}/api/payments/term_payment/${term}?stdClass=${stdClass}&year=${year}`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
            })
            const data = await response.json()
            setIsLoading(false)
            console.log(data)
            setData(data)
        }
       fetchData()

    }, [year, term, stdClass]);

    const getGrandTotal = () => {

        const grandTotal = data.map(payments => payments.paymentInfo).map(allTotal => allTotal.total)
        let grand = 0;
        for (let i = 0; i < grandTotal.length; i++) {
            grand = grand + grandTotal[i]

        }
        return (grand)

    }

    return (

        <div className="studentList">
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>

                <div className="form-group">
                    <div className="form-group-display">
                        <label htmlFor="class">Sort</label>

                        <select className="form-control" name="class" id="class" onChange={(e) => {
                            setSort(e.target.value);

                        }} value={sort} required>
                            {/* <option value="">Sort</option> */}
                            <option value={'date'}>Date</option>
                            <option value={'month'}>Month</option>
                            <option value={'term'}>Term</option>
                        </select>
                    </div>

                </div>
                {
                    sort === 'date' &&
                    <div className="form-group">
                        <div className="form-group-display">
                            <label> Date</label>
                            <DatePicker name="deadline"
                                className={'form-control'}
                                selected={date}
                                onChange={date => {
                                    setDate(date)

                                }}
                            />
                        </div>

                    </div>
                }
                {
                    sort === 'month' &&

                    <div className="form-group">
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

                    </div>

                }

                {
                    sort === 'term' &&
                    <div className="form-group">
                        <SelectSession
                            disabled={false}
                            year={year}
                            setYear={setYear}
                        />

                    </div>
                }
                {
                    sort === 'term' &&
                    <div className="form-group">
                        <div className="form-group-display">
                            <label htmlFor="class">Select Term</label>

                            <select className="form-control" name="class" id="class" onChange={(e) => {
                                setTerm(e.target.value);

                            }} value={term} required>
                                <option value="">Select Term</option>
                                <option value={1}>First Term</option>
                                <option value={2}>Second Term</option>
                                <option value={3}>Third Term</option>
                            </select>
                        </div>

                    </div>
                }

            </div>


            <SelectClass
                stdClass={stdClass}
                setStdClass={setStdClass}
                section={""}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3 className="h3 mb-2 text-gray-800">List of Payments Made {isLoading && <Loader type="TailSpin" color="#00BFFF" height={40} width={40} />}</h3>
                {/* <button onClick={() => history.push('/adminportal/classfees')} className="btn btn-primary ">New Payment</button> */}
            </div>

            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">{stdClass}</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Class</th>
                                    <th>Term</th>
                                    <th>School Fee</th>
                                    <th>Uniform </th>
                                    <th>Text Books</th>
                                    <th>School Bus</th>
                                    <th>Registration</th>
                                    <th>Mode of Payment</th>
                                    <th>Total</th>
                                </tr>
                            </thead>

                            <tbody>
                                <>
                                    {data.map(payments => {
                                        return (
                                            <tr key={payments._id}>
                                                <td style={{ cursor: 'pointer' }} onClick={() => history.push(`/${user?.role==="super-admin"?"adminportal":"accountportal"}/studentprofile/${payments.studentDetails._id}`)}>{payments.studentDetails.firstname} {payments.studentDetails.middlename} {payments.studentDetails.lastname}</td>
                                                <td>{payments.stdClass}</td>
                                                <td>{payments.term === 1 ? 'First' : payments.term === 2 ? 'Second' : 'Third'}</td>
                                                <td><span style={{ textDecoration: 'line-through', textDecorationStyle: 'double' }}>N</span> {payments.paymentInfo.schoolFees || '---'}</td>
                                                <td><span style={{ textDecoration: 'line-through', textDecorationStyle: 'double' }}>N</span> {payments.paymentInfo.uniform || '----'}</td>
                                                <td><span style={{ textDecoration: 'line-through', textDecorationStyle: 'double' }}>N</span> {payments.paymentInfo.books || '----'}</td>
                                                <td><span style={{ textDecoration: 'line-through', textDecorationStyle: 'double' }}>N</span> {payments.paymentInfo.schBus || '----'}</td>
                                                <td><span style={{ textDecoration: 'line-through', textDecorationStyle: 'double' }}>N</span> {payments.paymentInfo.registration || '----'}</td>
                                                <td> {payments.paymentMode || '----'}</td>
                                                <td><span style={{ textDecoration: 'line-through', textDecorationStyle: 'double' }}>N</span> {payments.paymentInfo.total || '----'}</td>
                                            </tr>

                                        )
                                    })}
                                </>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th colSpan='9'>Grand Total</th>
                                    {/* <th>Class</th>
                  <th>Term</th>
                  <th>School Fee</th>
                  <th>Uniform and wears</th>
                  <th>Exam Fee</th>
                  <th>Excursion Fee</th>
                  <th>Book Fee</th> */}

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

export default PaymentsPage;
