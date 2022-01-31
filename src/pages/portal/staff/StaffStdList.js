import React, { useState, useEffect, useRef } from 'react';
// import './Admin.css'
import { useHistory } from 'react-router-dom';
import { HOST_URL } from '../../../config'
import { useQuery, usePaginatedQuery } from 'react-query'
import Modal from '../../../components/Modal';
import StdList from '../../../components/StdList';
import { useStateValue } from '../../../StateProvider';
import { actionTypes } from '../../../reducer';

const fetchStudentList = async (key, stdClass) => {
    if (!stdClass) return
    const res = await fetch(`${HOST_URL}/api/staff/student-list/${stdClass}`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
    })
    return res.json();
}


function StaffStdList() {
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

        const staff = JSON.parse(localStorage.getItem("staff"))
        if (staff) {
            // console.log(staff.classTeacher)
            setStdClass(staff.classTeacher)
        } else {
            alert('Un-authorized')
          history.push('/')
        }
    
      }, [])

    useEffect(() => {
        if (!stdClass) return
        if (!data) return

        // Staff list data from query

        setStdList(data)
    }, [data])


    return (

        <div className="studentList">

            <div className="form-group">
              

            </div>
            <StdList
                isLoading={isLoading}
                stdClass={stdClass}
                stdList={stdList}
                role={"staff"}
            />

        </div>

    );
}

export default StaffStdList;
