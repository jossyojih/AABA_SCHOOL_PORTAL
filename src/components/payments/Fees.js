import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import { useStateValue } from '../../StateProvider';
import { useQuery, usePaginatedQuery } from 'react-query'
import { HOST_URL } from '../../config'


const fetchStudentFee = async (key, id) => {
  if (!id) return

  const res = await fetch(`${HOST_URL}/api/payments/studentfees/${id}`, {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("jwt")
    }
  })
  return res.json();
}


const Fees = () => {
  const [{ user }, dispatch] = useStateValue()
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory()
  const { id } = useParams()
  const [studentDetails,setStdDetails] = useState({})
  const [fees,setFees] = useState({})
  const [sessionDetails,setSessionDetails] = useState('')
  const [sectionFees,setSectionFees] = useState({})
  // React query fecth data
  const { data, status } = useQuery(['StudentFee', id], fetchStudentFee)

  useEffect(() => {

    if (!data) return

    // Staff list data from query

    setStdDetails(data.stdDetails)
    setFees(data.payment.paymentInfo)
    setSessionDetails(data.payment)
    setSectionFees(data.sectionFees?.feeInfo)
  }, [data])






  return isLoading ? <Loader className='login-loader' type="TailSpin" color="#00BFFF" height={80} width={80} /> :
    (

      <div className='feesAndPayment'>
        {/* {user?.isAdmin &&
          <div className='profile_nav'>
            <Link to={`/adminportal/studentprofile/${id}`} className="collapse-item" >Profile</Link>|
            <Link to={`/adminportal/studentbook/${id}`} className="collapse-item" >Book List</Link>|
            <Link to={`/adminportal/student/termattendance/${id}`} className="collapse-item" >Attendance</Link>|
            <Link to={`/student/result/${id}`} className="collapse-item" >Result</Link>|
            <Link to={`/result/${id}`} className="collapse-item" >Compute Result</Link>

          </div>
        } */}
        <h1>Student Fees and Payments</h1>

        <h4>Student Name: {studentDetails?.firstname} {studentDetails?.lastname}</h4>
        <h5>Section: {studentDetails?.sex}</h5>
        <h5>Class: {studentDetails?.stdClass}</h5>
        <h5>Session: {`${sessionDetails?.year}/${sessionDetails?.year + 1}`}</h5>
        <h5>Term: {sessionDetails?.term}{sessionDetails?.term===1?'st':sessionDetails?.term===2?'nd':'rd'}</h5>


        <div className="card shadow mb-4">
          <div className="card-header py-3" style={{display:"flex",justifyContent:"space-between"}}>
            <h6 className="m-0 font-weight-bold text-primary">Student Financial Record</h6>
            {user?.role==="accountant" &&
            <div  style={{display:"flex",alignItems:'center'}}>
              <h6 className="m-0 font-weight-bold text-primary ml-auto" onClick={() => history.push(`/accountportal/studentpaymenthistory/${studentDetails?._id}`)} style={{ cursor: 'pointer'}}>Payment History  ||  </h6>
              <h6 className="m-0 font-weight-bold text-primary ml-auto" onClick={() => history.push(`/accountportal/updatestudentfees/${studentDetails?._id}`)} style={{ cursor: 'pointer',marginLeft:"100px" }}> Edit</h6>
            </div>
              
            }
          </div>
          <div className="card-body">
            <div className="table-responsive"></div>
            <table className="table table-bordered" id="dataTable" cellSpacing="0">
              <thead>
                <tr>
                  <th>Fee</th><th>Amount</th><th>Amount Paid</th><th>Remark</th>
                </tr>

              </thead>
              <tbody>
                <tr>
                  <td>Registration Fee</td><td><span>N</span>{sectionFees?.registration}</td><td><span>N</span> {fees?.registration}</td><td>{fees?.registrationRemark}</td>
                </tr>

                <tr>
                  <td>School Fees</td><td><span>N</span>{sectionFees?.schoolFees}</td><td><span>N</span> {fees?.schoolFees}</td><td>{fees?.schoolFeesRemark}</td>
                </tr>

                <tr>
                  <td>Uniform Fee</td><td><span>N</span>{(studentDetails?.sex==="male") ? sectionFees?.maleUniform:sectionFees?.femaleUniform}</td><td><span>N</span> {fees?.uniform}</td><td>{fees.uniformRemark}</td>
                </tr>

                <tr>
                  <td>Text Books</td><td><span>N</span>{sectionFees?.textBooks}</td><td><span>N</span>{fees?.books}</td><td>{fees?.booksRemark}</td>
                </tr>
                <tr>
                  <td>School Bus</td><td><span>N</span>{sectionFees?.schBus}</td><td><span>N</span>{fees?.schBus}</td><td>{fees?.schBusRemark}</td>
                </tr>

              </tbody>
            </table>
          </div>

        </div>

      </div>

    )

}

export default Fees;