import React, { useState, useEffect, useRef } from 'react';
// import './Admin.css'
import { useHistory } from 'react-router-dom';
import { HOST_URL } from '../../../config'
import { useQuery, usePaginatedQuery } from 'react-query'
import { useStateValue } from '../../../StateProvider';
import Modal from '../../../components/Modal';

const fetchStaffList = async (key) => {
    const res = await fetch(`${HOST_URL}/api/admin/staff-list`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
    })
    return res.json();
}



function StaffList() {
    const [{ user }, dispatch] = useStateValue()
    const [staffList, setStaffList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [actionType, setActionType] = useState('');
    const [itemId, setItemId] = useState()
    const history = useHistory()

    // for modal
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState('')
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // React query fecth data
    const { data, status } = useQuery(['StaffList'], fetchStaffList)

    useEffect(() => {
        if (!data) return
        // Staff list data from query
        setStaffList(data)
    }, [data])


    return (

        <div className="staffList">
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
                                    <th>{user?.role==='admin' ? 'Marital Status' : 'Action'}</th>

                                </tr>
                            </thead>

                            <tbody>
                                <>

                                    {staffList.map(staff => {
                                        return (
                                            <tr key={staff._id}>

                                                <td style={{ cursor: 'pointer' }} onClick={() => {user?.role==='admin' && history.push(`/adminportal/staffprofile/${staff.user._id}`)}}>{staff.user?.username.toUpperCase()}</td>
                                                <td>{staff.firstname} {staff.middlename} {staff.lastname}</td>
                                                <td>{staff.sex}</td>
                                                <td>{staff.stateOfOrigin}</td>
                                                <td>{staff.email}</td>
                                                <td>{staff.phone}</td>
                                                {
                                                    user?.role==='accountant' &&
                                                    <td style={{ display: "flex",alignItems:'end',justifyContent:'space-evenly' }}>
                                                    <button className='btn btn-block btn-warning btn-sm mr-2'>Salary History </button> ||
                                                    <button className='btn btn-block btn-primary btn-sm ml-2' onClick={()=>history.push(`/accountportal/paystaff/${staff.user._id}`)}>Pay Salary</button> </td>
                                                }
                                                {user?.role==='admin' && <td>{staff.maritalStatus}</td>}
                                                

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

        </div>

    );
}

export default StaffList;
