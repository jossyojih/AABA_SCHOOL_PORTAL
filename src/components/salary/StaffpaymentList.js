import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { HOST_URL } from '../../config'
import { useQuery, usePaginatedQuery } from 'react-query'
import { useStateValue } from '../../StateProvider';
import PaySalary from './PaySalary';
import SalaryHistory from './SalaryHistory';
import UpdateSalary from './UpdateSalary';

const fetchStaffList = async (key) => {
    const res = await fetch(`${HOST_URL}/api/admin/staff-list`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
    })
    return res.json();
}


function StaffpaymentList() {

    const [{ user }, dispatch] = useStateValue()
    const [staffList, setStaffList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [actionType, setActionType] = useState('');
    const [itemId, setItemId] = useState()
    const history = useHistory()
    const [step, setStep] = useState(1)
    const [singleStaff, setSingleStaff] = useState()
    const [singleSalary, setSingleSalary] = useState()


    // React query fecth data
    const { data, status } = useQuery(['StaffList'], fetchStaffList)
    

    useEffect(() => {
        if (!data) return
        // Staff list data from query
        setStaffList(data)
    }, [data])


    function payOneStaff(staff_id) {
        const singleStaff = staffList.filter(item => item._id === staff_id)
        setSingleStaff(singleStaff[0])
        setStep(2)
    }

    function oneStaffPaymenthistory(staff_id) {
        const singleStaff = staffList.filter(item => item._id === staff_id)
        setSingleStaff(singleStaff[0])
        setStep(3)
    }

    return (
        <div className="staffList">
            {
                // Show this on step one
                step === 1 &&
                <>
                    <h1 className="h3 mb-2 text-gray-800">Staff List</h1>

                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">List Of AMS Staffs</h6>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="80%" cellSpacing="0">
                                    <thead>
                                        <tr>
                                            <th>Username</th>
                                            <th>Staff Name</th>
                                            <th>Sex</th>
                                            <th>State of Origin</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>{user?.role === 'admin' ? 'Marital Status' : 'Action'}</th>

                                        </tr>
                                    </thead>

                                    <tbody>
                                        <>

                                            {staffList.map(staff => {
                                                return (
                                                    <tr key={staff._id}>

                                                        <td style={{ cursor: 'pointer' }} onClick={() => { user?.role === 'admin' && history.push(`/adminportal/staffprofile/${staff.user._id}`) }}>{staff.user?.username.toUpperCase()}</td>
                                                        <td>{staff.firstname} {staff.middlename} {staff.lastname}</td>
                                                        <td>{staff.sex}</td>
                                                        <td>{staff.stateOfOrigin}</td>
                                                        <td>{staff.email}</td>
                                                        <td>{staff.phone}</td>
                                                        {
                                                            user?.role === 'accountant' &&
                                                            <td style={{ display: "flex", alignItems: 'end', justifyContent: 'space-evenly' }}>
                                                                <button className='btn btn-block btn-warning btn-sm mr-2' onClick={() => oneStaffPaymenthistory(staff._id)}>Salary History </button> ||
                                                                <button className='btn btn-block btn-primary btn-sm ml-2' onClick={() => payOneStaff(staff._id)}>Pay Salary</button> </td>
                                                        }
                                                        {user?.role === 'admin' && <td>{staff.maritalStatus}</td>}


                                                        {/* <td>{(year-(staff.DOB).substring(0, 4))}</td> */}
                                                    </tr>

                                                )
                                            })}
                                        </>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </>
            }
            {
                // Show this on step Two (Pay A single Staff Salary)
                step === 2 &&
                <PaySalary
                    staffDetails={singleStaff}
                    setStep={setStep}

                />
            }
            {
                // Show this on step Three (View A single Staff Salary History)
                step === 3 &&
                <SalaryHistory
                    staffDetails={singleStaff}
                    setSingleSalary={setSingleSalary}
                    setStep={setStep}

                />
            }
               {
                // Show this on step Four (View A single Staff Salary History)
                step === 4 &&
                <UpdateSalary
                    staffDetails={singleStaff}
                    singleSalary={singleSalary}
                    setStep={setStep}

                />
            }
        </div>
    )
}

export default StaffpaymentList