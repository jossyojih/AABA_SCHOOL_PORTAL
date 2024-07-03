import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Registration.css';
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';
import { HOST_URL } from '../../config'

import Loader from 'react-loader-spinner'

function NewStaff() {
    const [{ user }, dispatch] = useStateValue()
    const history = useHistory()

    const [showType, setShowType] = useState(null)
    const [message, setMessage] = useState('')

    const errStyle = { color: "red", fontSize: "12px" };
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [username, setUsername] = useState('')
    const [usernameErr, setUsernameErr] = useState();
    const [passwordErr, setPasswordErr] = useState();
    const [isLoading, setIsLoading] = useState(false)


    const onSubmit = async (e) => {
        e.preventDefault();
        const isValid = formValidation();

        if (isValid) {
            setIsLoading(true)

            try {
                const response = await fetch(`${HOST_URL}/api/signup-staff`, {
                    method: 'post',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username,
                        password,

                    })
                })
                const data = await response.json()
                console.log(data)
                if (data.error) {
                    setIsLoading(false)
                    setShowType('error')
                    setMessage(data.error)
                    setUsername('')
                    setPassword('')
                    setConfirmPassword('')
                } else {
                    setIsLoading(false)
                    setShowType('success')
                    setMessage(data.message)
                    setUsername('')
                    setPassword('')
                    setConfirmPassword('')
                 
                }


            } catch (error) {
                setIsLoading(false)
                setShowType('error')
                setMessage(error)
                console.log(error)
            }
        }

    }



    const formValidation = () => {

        let isValid = true;

        if (!username) {
            setUsernameErr('Username is required');
            isValid = false;
        }

        if (!password) {
            setPasswordErr('Password is required');
            isValid = false;
        }
        if (password.length < 8) {
            setPasswordErr('Password cannot be less than 8 characters');
            isValid = false;
        }
        if (password !== confirmPassword) {
            setPasswordErr('Password does not match');
            isValid = false;
        }

        return isValid;
    }

    return (
        <div className="login-container admin-container">
           
            <div className="form-box">
            {showType === 'success' &&
                <div class="alert alert-success" role="alert">
                    {message}
                </div>
            }
            {showType === 'error' &&
                <div class="alert alert-danger" role="alert">
                    {message}
                </div>
            }
                <form onSubmit={onSubmit}>
                    <h3 className="text-center">Staff Registration</h3>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" value={username} className="form-control" placeholder="Enter Username e.g: AMS/ACD/001" onChange={(e) => {
                            setUsername(e.target.value)
                            setUsernameErr('')
                        }} />
                        <div style={errStyle}>{usernameErr}</div>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={password} className="form-control" placeholder="Enter password" onChange={(e) => {
                            setPassword(e.target.value)
                            setPasswordErr('')
                        }} />
                    </div>
                    <div style={errStyle}>{passwordErr}</div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input type="password" value={confirmPassword} className="form-control" placeholder="Enter password" onChange={(e) => {
                            setConfirmPassword(e.target.value)
                            setPasswordErr('')
                        }} />
                    </div>
                    {/* <div style={errStyle}>{passwordErr}</div> */}
                    {isLoading ?<button className="btn btn-primary btn-block"><Loader type="TailSpin" color="#FFF" height={30} width={30} /> </button>:
                    <button type="submit" className="btn btn-primary btn-block">Register</button>}
                </form>
            </div>
        </div>
    )
}

export default NewStaff
