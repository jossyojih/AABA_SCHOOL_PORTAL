import React, { useState, useEffect, useRef } from 'react';
// import './Admin.css'
import { useHistory } from 'react-router-dom';
import { HOST_URL } from '../../../config'
import { useQuery, usePaginatedQuery } from 'react-query'
import Modal from '../../../components/Modal';
import Loader from 'react-loader-spinner'
import SelectClass from '../../../components/SelectClass';
import StdList from '../../../components/StdList';

const fetchStudentList = async (key, stdClass) => {
    if (!stdClass) return
    const res = await fetch(`${HOST_URL}/api/admin/student-list/${stdClass}`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
    })
    return res.json();
}


function ResetStdPwd() {
    const [stdList, setStdList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [actionType, setActionType] = useState('');
    const [itemId, setItemId] = useState()
    const history = useHistory()

    const year = new Date().getFullYear()
    const [stdClass, setStdClass] = useState('')



    // for modal
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState('')
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // React query fecth data
    const { data, status } = useQuery(['StudentList', stdClass], fetchStudentList)

    useEffect(() => {
        if (!stdClass) return
        if (!data) return

        // Staff list data from query
  
        setStdList(data)
    }, [data])

    const confirmAction = (action, id) => {
        handleShow()
        setItemId(id)
        setMessage(`Are You sure you want to ${action} this Student password?`)
        setActionType(() => action === 'password reset' ? 'Password Reset' :'')
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

    return (

        <div className="studentList">

            <div className="form-group">
                <SelectClass
                    section={''}
                    stdClass={stdClass}
                    setStdClass={setStdClass}

                />

            </div>
            <StdList
                isLoading={isLoading}
                stdClass={stdClass}
                stdList={stdList}
                confirmAction={confirmAction}
                resetPwd={true}
            />
            <Modal
                show={show}
                isLoading={isLoading}
                handleClose={handleClose}
                message={message}
                title={actionType}
                itemId={itemId}
                action2={resetPassword}
            // action2={deleteAccount}
            />

        </div>

    );
}

export default ResetStdPwd;
