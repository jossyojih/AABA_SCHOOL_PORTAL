import React, { useState, useEffect, useRef } from 'react';
// import './Admin.css'
import { useHistory } from 'react-router-dom';
import { HOST_URL } from '../../../config'
import { useQuery, usePaginatedQuery } from 'react-query'
import Modal from '../../../components/Modal';

const fetchRegisteredStaff = async (key) => {
  const res = await fetch(`${HOST_URL}/api/admin/staff-list`, {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("jwt")
    }
  })
  return res.json();
}



function ResetStaffPassword() {
  const [registeredStaff, setRegisteredStaff] = useState([])
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
  const { data, status } = useQuery(['Profile'], fetchRegisteredStaff)

  useEffect(() => {
    if (!data) return
    console.log(data)

    // Staff list data from query
    setRegisteredStaff(data)
  }, [data])


  const confirmAction = (action, id) => {
    handleShow()
    setItemId(id)
    setMessage(`Are You sure you want to ${action} this Staff account?`)
    setActionType(() => action === 'password reset' ? 'Password Reset' : '')


  }


  const resetPassword = async (id) => {
    setIsLoading(true)
    const response = await fetch(`${HOST_URL}/api/admin/reset-password/${id}`, {
      method: 'put',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
    })

    const data = await response.json()
    console.log(data)
    if (data.error) {
      setIsLoading(false)
      setItemId(null)
      setShow(true)
      setMessage(data.error)
      setTimeout(() => {
        setShow(false)
      }, 2000);

    } else {

      setIsLoading(false)
      setShow(true)
      setMessage(data.message)
      setItemId(null)
      setTimeout(() => {
        setShow(false)
      }, 1000);

    }

  }




  return (

    <div className="staffList">
      <h1 className="h3 mb-2 text-gray-800">Staff Password Reset</h1>

      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">List Of Registered Staffs</h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered" id="dataTable" width="80%" cellSpacing="0">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Staff Name</th>
                  <th>Sex</th>
                  <th>Class</th>
                  <th>Action</th>

                </tr>
              </thead>

              <tbody>
                <>

                  {registeredStaff.map(staff => {
                    return (
                      <tr key={staff._id}>
                        {/* <td style={{cursor:'pointer'}} onClick={()=>history.push(`/adminportal/staffprofile/${staff._id}`)}>{staff.name.first} {staff.name.middle} {staff.name.last}</td> */}
                        <td>{staff.user?.username.toUpperCase()}</td>
                        <td>{staff.firstname} {staff.lastname}</td>
                        <td>{staff.sex}</td>
                        <td>{staff.classTeacher}</td>
                        <td style={{ display: "flex" }}>
                          <button className='btn btn-warning btn-sm mr-2' onClick={() => confirmAction('password reset', staff.user?._id)}>Reset Password</button>
                        </td>
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

      <Modal
        show={show}
        isLoading={isLoading}
        handleClose={handleClose}
        message={message}
        title={actionType}
        itemId={itemId}
        action2={resetPassword}
      />

    </div>

  );
}

export default ResetStaffPassword;
