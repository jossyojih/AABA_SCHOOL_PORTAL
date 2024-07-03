import React, { useState, useEffect, useRef } from 'react';
// import './Admin.css'
import { useHistory } from 'react-router-dom';
import { HOST_URL } from '../../../config'
import { useQuery, usePaginatedQuery } from 'react-query'
import Modal from '../../../components/Modal';

const fetchRegisteredStaff = async (key) => {
  const res = await fetch(`${HOST_URL}/api/admin/registered-staffs`, {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("jwt")
    }
  })
  return res.json();
}



function StaffValidation() {
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

    // Staff list data from query
    // return console.log(data)
    setRegisteredStaff(data)
  }, [data])


  const confirmAction = (action, id) => {
    handleShow()
    setItemId(id)
    setMessage(`Are You sure you want to ${action} this Staff account?`)
    setActionType(() => action === 'verify' ? 'Account Verification' :
      action === 'password reset' ? 'Password Reset' :
        action === 'delete' ? 'Delete Account' : '')
  }

  const verifyAccount = async (id) => {
    setIsLoading(true)

    const response = await fetch(`${HOST_URL}/api/admin/validate-staff/${id}`, {
      method: 'put',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    })

    const data = await response.json()
    console.log(data.user)

    if (data.error) {
      setIsLoading(false)
      setItemId(null)
      setShow(true)
      setMessage(data.error)
      setTimeout(() => {
        setShow(false)
      }, 2000);

    } else {
      const newData = registeredStaff.map(item => {
        if (item._id === data.user._id) {
          return data.user
        } else {
          return item
        }
      })

      setRegisteredStaff(newData)
      setIsLoading(false)
      setShow(true)
      setMessage(data.message)
      setItemId(null)
      setTimeout(() => {
        setShow(false)
      }, 500);


    }

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

  const deleteAccount = async (id) => {
    setIsLoading(true)
    const response = await fetch(`${HOST_URL}/api/admin/delete-staff-account/${id}`, {
      method: 'delete',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
    })

    const data = await response.json()

    if (data.error) {
      setIsLoading(false)
      setItemId(null)
      setShow(true)
      setMessage(data.error)
      setTimeout(() => {
        setShow(false)
      }, 2000);

    } else {

      const newData =registeredStaff.filter(item => {
        return item._id !== itemId
      })
      setRegisteredStaff(newData)
      setIsLoading(false)
      setShow(true)
      setMessage(data.message)
      setItemId(null)
      setTimeout(() => {
        setShow(false)
      }, 500);

    }

  }




  return (

    <div className="staffList">
      <h1 className="h3 mb-2 text-gray-800">Staff Validation</h1>

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
                  <th>Role</th>
                  <th>Status</th>
                  <th>Action</th>

                </tr>
              </thead>

              <tbody>
                <>

                  {registeredStaff.map(staff => {
                    return (
                      <tr key={staff._id}>
                        {/* <td style={{cursor:'pointer'}} onClick={()=>history.push(`/adminportal/staffprofile/${staff._id}`)}>{staff.name.first} {staff.name.middle} {staff.name.last}</td> */}
                        <td>{staff.username.toUpperCase()}</td>
                        <td>{staff.role}</td>
                        <td>{staff.isVerified ? 'Verified' : 'Not Verified'}</td>
                        <td style={{ display: "flex" }}> {!staff.isVerified && <button className='btn btn-primary btn-sm mr-2'
                          onClick={() => confirmAction('verify', staff._id)}
                        >Verify</button>}
                          <button className='btn btn-warning btn-sm mr-2' onClick={() => confirmAction('password reset', staff._id)}>Reset Password</button>
                          <button className='btn btn-danger btn-sm' onClick={() => confirmAction('delete', staff._id)}>Delete</button> </td>
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
        action1={verifyAccount}
        action2={resetPassword}
        action3={deleteAccount}
      />

    </div>

  );
}

export default StaffValidation;
