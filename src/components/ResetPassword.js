import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import { useHistory, Link } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import { HOST_URL } from '../config'

function ResetPassword() {
  const [{ user }, dispatch] = useStateValue()
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const resetPassword = async (e) => {
    e.preventDefault();
    if (!password || !newPassword) return alert('Please Enter All fields')
   if(newPassword !== confirmPassword) return alert('new password does not match')
    setIsLoading(true)
    const response = await fetch(`${HOST_URL}/api/users/reset-password/${user?.id}`, {
      method: 'put',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        password,
        newPassword
      })
    })

    const data = await response.json()
    console.log(data)
    if (data.error) {
      setIsLoading(false)
      alert(data.error)

    } else {
      setIsLoading(false)
      alert(data.message)
      localStorage.clear();
      history.push('/')

    }

  }

  return (
    <div className="form-box">
      <form onSubmit={resetPassword}>
        <h3 className="text-center">Password Reset</h3>
        <div className="form-group">
          <label>Current Password</label>
          <input type="password" value={password} className="form-control" placeholder="Enter Password" onChange={(e) => {
            setPassword(e.target.value)

          }} />
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input type="password" value={newPassword} className="form-control" placeholder="Enter New password" onChange={(e) => {
            setNewPassword(e.target.value)

          }} />
        </div>
        <div className="form-group">
          <label>Confirm New Password</label>
          <input type="password" value={confirmPassword} className="form-control" placeholder="Enter password" onChange={(e) => {
            setConfirmPassword(e.target.value)
           
          }} />
        </div>


        {isLoading ? <button className="btn btn-primary btn-block"><Loader type="TailSpin" color="#FFF" height={30} width={30} /> </button> :
          <button type="submit" className="btn btn-primary btn-block">Submit</button>}
      </form>
    </div>
  )
}

export default ResetPassword
