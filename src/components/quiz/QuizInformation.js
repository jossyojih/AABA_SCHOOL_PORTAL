import React, { useState, useEffect } from 'react'
import DatePicker from "react-datepicker";
import Toast from 'react-bootstrap/Toast'
import Button from "react-bootstrap/Button";
import { useHistory } from 'react-router-dom';
import Modal from "react-bootstrap/Modal";
import { useQuery } from 'react-query'
import { HOST_URL } from '../../config'

const fetchStudentSubjects = async (key, section) => {
    if (!section) return
    const res = await fetch(`${HOST_URL}/api/users/studentsubjects/${section}`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
    })
    return res.json();
}

function QuizInformation({ term, week, deadline, setDeadline, subject, setSubject, stdClass, nextStep, }) {

    const [show, setShow] = useState(false);
    const [modalShow, setModalShow] = useState(false)
    const [message, setMessage] = useState('')
    const history = useHistory()
    const [Id, setId] = useState('')
    const [section, setSection] = useState()

    const [subjects, setSubjects] = useState([])

    // React query fecth data
    const { data, status } = useQuery(['StudentSubjects', section], fetchStudentSubjects)

    useEffect(() => {
        const staff = JSON.parse(localStorage.getItem("staff"))
        const sec = staff.classTeacher.substring(0, 3)
        if (sec === 'Cre') {
            setSection("Creche")
        } else if (sec === "Pre" || sec === "Nur") {
            setSection("Nursery")
        } else if (sec === "Pri") {
            setSection("Upper-Grade")
        } else if (sec === "JSS") {
            setSection("Secondary")
        }

    }, [])


    useEffect(() => {

        if (!data) return
        setSubjects(data.subjects)

    }, [data])


    const handleClose = () => setModalShow(false);

    const next = () => {
        if (!subject) {
            setMessage('Please Select Subject')
            setShow(true)
            return
        } else if (!deadline) {
            setMessage('Please Set Deadline')
            setShow(true)
            return
        }
        nextStep()

    }

    return (
        <div className='quizDetails'
            aria-live="polite"
            aria-atomic="true"
            style={{
                position: 'relative',
                minHeight: '200px',
            }}>

            <div className="form-group">
                <div className="form-group-display">
                    <label htmlFor="marital">Subject</label>
                    <select className="form-control" name="marital" id="marital" onChange={(e) => {
                        setSubject(e.target.value);

                    }} value={subject}>

                        <option value="">Select Subject</option>

                        {
                            subjects?.map(item => {
                                return (
                                    <option value={item}>{item}</option>
                                )
                            })
                        }

                    </select>
                </div>
            </div>

            <div className="form-group">
                <div className="form-group-display">
                    <label> Deadline Date</label>
                    <DatePicker name="deadline"
                        className={'form-control'}
                        selected={deadline}
                        onChange={date => setDeadline(date)}
                    />
                </div>
            </div>
            <div className='bookList_btn'>
                <button className="btn btn-primary btn-block" disabled={true}> Back </button>
                <button onClick={() => next()} className="btn btn-primary btn-block">Next</button>
            </div>

            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    backgroundColor: 'red'
                }}
            >

                <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>

                    <Toast.Body>{message}</Toast.Body>
                </Toast>


            </div>
            <Modal
                show={modalShow}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>New Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Quiz for the selected subject for this class,term and week already exist. Click Update to update or click close to exit.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="secondary" onClick={() => history.push(`/updatequiz/${Id}`)}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>

    )
}

export default QuizInformation
