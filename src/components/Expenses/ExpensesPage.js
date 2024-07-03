import React, { useEffect, useState } from 'react'
import { HOST_URL } from '../../config'
import { useQuery } from 'react-query'
import { Link, useHistory } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import DatePicker from "react-datepicker";
import SelectSession from '../SelectSession';
import moment from 'moment'
import SingleRequisition from './SingleRequisition';

const fetchRequisitionForms = async (key, sort, year, sortValue) => {

    if (!sortValue || !sort) return
    if (sort === 'term' && !sortValue) return
    const res = await fetch(`${HOST_URL}/api/payments/view-requisitions/${sort}?sortValue=${sortValue}&year=${year}`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
    })
    return res.json();
}
function ExpensesPage() {

    const [{ user }, dispatch] = useStateValue()
    const history = useHistory()
    const [sort, setSort] = useState('month')
    const [sortValue, setSortValue] = useState(new Date().getMonth())
    const [requisitions, setRequisitions] = useState([])
    const [Expenses, setExpenses] = useState([])
    const [totalExpenses, setTotalExpenses] = useState()
    const [term, setTerm] = useState()
    const [date, setDate] = useState(new Date())
    const [month, setMonth] = useState(new Date().getMonth())
    const [year, setYear] = useState()
    const [step, setStep] = useState(1)
    const [singleRequisition, setSingleRequisition] = useState(null)

    // React query fecth data
    const { data, status } = useQuery(['requisitionForms', sort, year, sortValue], fetchRequisitionForms)

    useEffect(() => {
        if (!data) return
        setRequisitions(data)
        let expense = []
        data.map(item => item.items.map(x => {
            if (x.directorApprove === 'Approved') {
                expense.push({
                    requisition_id: item._id,
                    name: item.name,
                    date: item.date,
                    month: item.month,
                    particulars: x.particulars,
                    amount: Number(x.approvedAmount)
                })
            }
        }))
        setExpenses(expense)
        const total = expense.map(item => item.amount).reduce((acc, x) => acc + x,0)
        setTotalExpenses(total)

    }, [data])

    function viewOneRequisitionItem(requisition_id) {
        const singleReq = requisitions.filter(item => item._id === requisition_id)
        setSingleRequisition(singleReq[0])
        setStep(2)

    }
    return (
        <div>
            {
                // Show this on step one
                step === 1 &&
                <>
                    <div style={{ display: 'flex' }}>

                        <div className="form-group-display">
                            <label htmlFor="class">Sort</label>

                            <select className="form-control" name="class" id="class" onChange={(e) => {

                                if (e.target.value === 'month') {
                                    setSortValue(month)
                                } else if (e.target.value === 'date') {
                                    setSortValue(date)
                                } else if (e.target.value === 'term') {
                                    setSortValue(term)
                                }
                                setSort(e.target.value);

                            }} value={sort} required>
                                {/* <option value="">Sort</option> */}
                                <option value={'date'}>Date</option>
                                <option value={'month'}>Month</option>
                                <option value={'term'}>Term</option>
                            </select>
                        </div>

                        {
                            sort === 'date' &&
                            <div className="form-group-display">
                                <label style={{ marginLeft: '3rem' }}> Date</label>
                                <DatePicker name="deadline"
                                    className={'form-control'}
                                    selected={date}
                                    onChange={date => {
                                        setSortValue(date)
                                        setDate(date)

                                    }}
                                />
                            </div>

                        }
                        {
                            sort === 'month' &&

                            <div className="form-group-display">
                                <label htmlFor="month" style={{ marginLeft: '3rem' }}>Select Month</label>

                                <select className="form-control" name="month" onChange={(e) => {
                                    setMonth(e.target.value);
                                    setSortValue(e.target.value)

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

                        }

                        {
                            sort === 'term' &&
                            <div className="form-group-display">
                                <SelectSession
                                    year={year}
                                    setYear={setYear}
                                />

                            </div>
                        }
                        {
                            sort === 'term' &&

                            <div className="form-group-display">
                                <label htmlFor="class">Select Term</label>

                                <select className="form-control" name="class" id="class" onChange={(e) => {
                                    setTerm(e.target.value);
                                    setSortValue(e.target.value)

                                }} value={term} required>
                                    <option value="">Select Term</option>
                                    <option value={1}>First Term</option>
                                    <option value={2}>Second Term</option>
                                    <option value={3}>Third Term</option>
                                </select>
                            </div>

                        }

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
                                            <th>Name</th>
                                            <th>Date</th>
                                            <th>Month </th>
                                            <th>Particulars</th>
                                            <th>Amount</th>
                                            <th>Action</th>

                                        </tr>
                                    </thead>

                                    <tbody>
                                        <>
                                            {Expenses.map((expense,i) => {
                                                
                                                return (
                                                    <tr key={i}>
                                                        <td style={{ cursor: 'pointer' }}>{expense.name}</td>
                                                        <td>{moment(expense.date).format('MMMM Do YYYY')}</td>
                                                        <td>{moment(expense.date).format('MMMM')}</td>
                                                        <td>{expense.particulars}</td>
                                                        <td>{expense.amount}</td>
                                                        <td>
                                                            <button className='btn btn-block btn-warning btn-sm mr-2' onClick={() => viewOneRequisitionItem(expense.requisition_id)}>View Requisition</button>
                                                        </td>
                                                    </tr>

                                                )
                                            })}
                                        </>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th colSpan='4'>Grand Total</th>

                                            <th colSpan='2' style={{ textAlign: 'start' }}><span style={{ textDecoration: 'line-through', textDecorationStyle: 'double',marginRight:'.5em' }}>N</span>{totalExpenses}</th>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </>
            }
            {
                // Show this on step Two (View A single Requisition)
                step === 2 &&
                <SingleRequisition
                    requisition={singleRequisition}
                    setStep={setStep}

                />
            }
        </div >
    )
}

export default ExpensesPage