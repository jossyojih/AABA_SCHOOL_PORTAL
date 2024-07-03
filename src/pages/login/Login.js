import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';
import { HOST_URL } from '../../config'
import Loader from 'react-loader-spinner'
import Logo from '../../assets/aabaLogo.jpg'

function Login() {
    const [{ user }, dispatch] = useStateValue()
    const history = useHistory()

    const [showType, setShowType] = useState(null)
    const [message, setMessage] = useState('')

    const errStyle = { color: "red", fontSize: "12px" };
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState('')
    const [usernameErr, setUsernameErr] = useState();
    const [passwordErr, setPasswordErr] = useState();
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
console.log("1" !== 1)
    }, [])
    


    const onSubmit = async (e) => {
        e.preventDefault();
        const isValid = formValidation();

        if (isValid) {
            setIsLoading(true)

            try {
                const response = await fetch(`${HOST_URL}/api/login-user`, {
                    method: 'post',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username,
                        password

                    })
                })

                const data = await response.json()

                if (data.error) {
                    setIsLoading(false)
                    setShowType('error')
                    setMessage(data.error)
                } else {
                    setIsLoading(false)
                    setShowType('success')
                    setMessage(data.message)

                    if (data.user?.isVerified) {
                        localStorage.setItem("jwt", data.token)
                        localStorage.setItem("user", JSON.stringify(data.user))
                        dispatch({
                            type: actionTypes.Set_USER,
                            user: data.user
                        })

                        if (data.user.role === 'super-admin' || data.user.role === 'admin') return history.push('/adminportal/index')
                        if (data.user.role === 'staff') {
                           
                            localStorage.setItem("staff", JSON.stringify(data.staff))
                            return history.push(`/staffportal/staff-profile/${data.user._id}`)
                        }
                        if (data.user.role === 'accountant') return history.push('/accountportal')
                        if (data.user.role === 'student') {
                            localStorage.setItem("student", JSON.stringify(data.student))
                             // Store the current Route to prevent page refreshing to '/'
                            localStorage.setItem("route", `/studentportal/studentprofile/${data.student._id}` )
        
                            return history.push(`/studentportal/studentprofile/${data.student._id}`)
                        }


                    } else {
                        return
                    }

                }


            } catch (error) {
                setIsLoading(false)
                setShowType('error')
                setMessage('Oops! Something went wrong')
                console.log(error)
            }

        }

    }

    const formValidation = () => {

        let isValid = true;

        if (!username) {
            setUsernameErr('username is required');
            isValid = false;
        }

        if (!password) {
            setPasswordErr('Password is required');
            isValid = false;
        }

        return isValid;
    }


    return (
        <div className="login-container">
           
            <div className="form-box">
            {showType === 'success' &&
                <div className="alert alert-success" role="alert">
                    {message}
                </div>
            }
            {showType === 'error' &&
                <div className="alert alert-danger" role="alert">
                    {message}
                </div>
            }
                <form onSubmit={onSubmit}>
                    {/* <h3 className="text-center">Sign In</h3> */}
                    <div className='login-top-logo'>
                        <img className='' src={Logo} alt='' />
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" value={username} className="form-control" placeholder="Enter username" onChange={(e) => {
                            setUsername(e.target.value)
                            setShowType(null)
                            setUsernameErr('')
                        }} />
                        <div style={errStyle}>{usernameErr}</div>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={password} className="form-control" placeholder="Enter password" onChange={(e) => {
                            setPassword(e.target.value)
                            setShowType(null)
                            setPasswordErr('')
                        }} />
                    </div>
                    <div style={errStyle}>{passwordErr}</div>
                    {isLoading ? <button className="btn btn-primary btn-block"><Loader type="TailSpin" color="#FFF" height={20} width={20} /></button> :
                        <button type="submit" className="btn btn-primary btn-block">Login</button>

                    }

                </form>
            </div>
        </div>
    )
}

export default Login
