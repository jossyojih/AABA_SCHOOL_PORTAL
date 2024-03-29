import React, { useState, useEffect } from 'react';
// import './Admin.css'
import { useHistory } from 'react-router-dom';
import { HOST_URL } from '../../../config'
import { useQuery } from 'react-query'
import Modal from '../../../components/Modal';
import SelectClass from '../../../components/SelectClass';
import StdList from '../../../components/StdList';
import Loader from 'react-loader-spinner'

const fetchStudentList = async (key, stdClass) => {
    if (!stdClass) return
    const res = await fetch(`${HOST_URL}/api/admin/student-list/${stdClass}`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
    })
    return res.json();
}


function StudentList() {
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


    const resetPassword = async (id) => {
        setIsLoading(true)
        const response = await fetch(`${HOST_URL}/api/admin/reset-staff-password/${id}`, {
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
            {status === 'loading' &&
                <div className='product-display-right'>
                    <Loader type="TailSpin" color="#00BFFF" height={20} width={20} />
                    Loading. Please Wait.
                </div>
            }


            <SelectClass
                section={''}
                stdClass={stdClass}
                setStdClass={setStdClass}
            />

            <StdList
                isLoading={isLoading}
                stdClass={stdClass}
                stdList={stdList}
                role={"admin"}
            />
            <Modal
                show={show}
                isLoading={isLoading}
                handleClose={handleClose}
                message={message}
                title={actionType}
                itemId={itemId}
                action1={resetPassword}
            // action2={deleteAccount}
            />

        </div>

    );
}

export default StudentList;
