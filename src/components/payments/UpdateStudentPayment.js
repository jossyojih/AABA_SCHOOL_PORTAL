import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import { useStateValue } from '../../StateProvider';
import { useQuery, usePaginatedQuery } from 'react-query'
import { HOST_URL } from '../../config'
import Modal from '../Modal';


const fetchStudentFee = async (key, id) => {
  console.log(id)
  if (!id) return
  console.log(id)
  const res = await fetch(`${HOST_URL}/api/payments/studentfees/${id}`, {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("jwt")
    }
  })
  return res.json();
}

function UpdateStudentFee() {
  const [{ user }, dispatch] = useStateValue()
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory()
  const { id } = useParams()
  const [studentDetails, setStdDetails] = useState({})
  const [fees, setFees] = useState({})
  const [sessionDetails, setSessionDetails] = useState('')
  const [sectionFees, setSectionFees] = useState({})
  const [showSave, setShowSave] = useState(false);
  const [step, setStep] = useState(1)
  const [paymentMode, setPaymentMode] = useState('')
  const [registrationFeePaidNow, setRegistrationFeePaidNow] = useState(0);
  const [schoolFeePaidNow, setSchoolFeePaidNow] = useState(0);
  const [uniformFeePaidNow, setUniformFeePaidNow] = useState(0);
  const [txtBookFeePaidNow, setTxtBookFeePaidNow] = useState(0);
  const [schBusFeePaidNow, setSchoolBusPaidNow] = useState(0);

  const [registrationFeeRemark, setRegistrationFeeRemark] = useState("");
  const [schoolFeeRemark, setSchoolFeeRemark] = useState("");
  const [uniformFeeRemark, setUniformFeeRemark] = useState("");
  const [txtBookFeeRemark, setTxtBookFeeRemark] = useState("");
  const [schBusFeeRemark, setSchBusFeeRemark] = useState("");

  const [actionType, setActionType] = useState('');
  const [itemId, setItemId] = useState()
  // React query fecth data
  const { data, status } = useQuery(['StudentFee', id], fetchStudentFee)

  // for modal
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState('')
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {

    if (!data) return

    // Staff list data from query
    console.log(data)
    setStdDetails(data.stdDetails)
    setFees(data.payment.paymentInfo)
    setSessionDetails(data.payment)
    setSectionFees(data.sectionFees?.feeInfo)
  }, [data])

  useEffect(() => {
    setRegistrationFeeRemark(fees?.registrationRemark)
    setSchoolFeeRemark(fees?.schoolFeesRemark)
    setUniformFeeRemark(fees?.uniformRemark)
    setTxtBookFeeRemark(fees?.booksRemark)
    setSchBusFeeRemark(fees?.schBusRemark)
  }, [fees])

  const confirmAction = (action, id) => {

    handleShow()
    setItemId(id)
    setMessage(`Are You sure you want to ${action} for this student?`)
    setActionType(action)
  }


  const updateFee = async (id) => {
    setIsLoading(true)
    if(!paymentMode ){
     if(!window.confirm("Payment Mode Not selected. Do you want to continue")) return setIsLoading(false)
    }
    // year:sessionDetails?.year,
    // term:sessionDetails?.term,

    const paymentDetails = {
      registrationFeePaidNow,
      registrationFeeRemark,
      schoolFeePaidNow,
      schoolFeeRemark,
      uniformFeePaidNow,
      uniformFeeRemark,
      txtBookFeePaidNow,
      txtBookFeeRemark,
      schBusFeePaidNow,
      schBusFeeRemark,
      total:
        Number(schoolFeePaidNow) +
        Number(registrationFeePaidNow) +
        Number(uniformFeePaidNow) +
        Number(txtBookFeePaidNow) +
        Number(schBusFeePaidNow),
    };
    // The payment ID is contained in the sessionDetails
    const response = await fetch(`${HOST_URL}/api/payments/studentfees/update/${id}`, {
      method: 'put',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        paymentDetails,
        studentDetails: studentDetails?._id,
        paymentMode

      })
    })

    const data = await response.json()
    setIsLoading(false)
    setShow(true)
    setMessage(data.message)
    setItemId(null)
    setTimeout(() => {
      setShow(false)
    }, 500);
    history.push(`/accountportal/studentfees/${studentDetails._id}`)

  };

  return (
    <div className="feesAndPayment">
      <h1>
        Update Student Fees{" "}
        {isLoading && (
          <Loader type="TailSpin" color="#00BFFF" height={40} width={40} />
        )}
      </h1>
      <h4>Student Name: {studentDetails?.firstname} {studentDetails?.lastname}</h4>
      <h5>Section: {studentDetails?.section}</h5>
      <h5>Class: {studentDetails?.stdClass}</h5>
      <h5>Session: {`${sessionDetails?.year}/${sessionDetails?.year + 1}`}</h5>
      <h5>Term: {sessionDetails?.term}{sessionDetails?.term === 1 ? 'st' : sessionDetails?.term === 2 ? 'nd' : 'rd'}</h5>
      {step === 1 &&
        <>
          <table className="table table-bordered" id="dataTable" cellSpacing="0">
            <thead>
              <tr>
                <td>Fee</td>
                <td>Amount</td>
                <td>Previous Payment</td>
                <td>Amount Paid</td>
                <td>Remark</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Registration Fee</td>
                <td>
                  <span>N</span>
                  {sectionFees?.registration}
                </td>
                <td>
                  <span>N</span>
                  {fees?.registration}
                </td>
                <td>
                  <span>N</span>
                  <input
                    type="number"
                    onChange={(e) => {
                      setRegistrationFeePaidNow(e.target.value);
                      setShowSave(true)

                    }}
                  />
                </td>
                <td>
                  {" "}
                  <select
                    className="form-control"
                    name="class"
                    id="class"
                    onChange={(e) => {
                      setRegistrationFeeRemark(e.target.value);
                      setShowSave(true)
                    }}
                    value={registrationFeeRemark}
                  >
                    <option value="">Select Payment Status</option>
                    <option value={"Paid"}>Paid</option>
                    <option value={"Incomplete Payment"}>Incomplete Payment</option>
                    <option value={"Not Paid"}>Not Paid</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>School Fees</td>
                <td>
                  <span>N </span>
                  {sectionFees?.schoolFees}
                </td>
                <td>
                  <span>N </span>
                  {fees?.schoolFees}
                </td>
                <td>
                  <span>N </span>
                  <input
                    type="number"
                    onChange={(e) => {
                      setSchoolFeePaidNow(e.target.value);
                      setShowSave(true);
                    }}
                  />
                </td>
                <td>
                  {" "}
                  <select
                    className="form-control"
                    name="class"
                    id="class"
                    onChange={(e) => {
                      setSchoolFeeRemark(e.target.value);
                      setShowSave(true);
                    }}
                    value={schoolFeeRemark}
                  >
                    <option value="">Select Payment Status</option>
                    <option value={"Paid"}>Paid</option>
                    <option value={"Incomplete Payment"}>Incomplete Payment</option>
                    <option value={"Not Paid"}>Not Paid</option>
                  </select>
                </td>
              </tr>

              <tr>
                <td>Uniform </td>
                <td>
                  <span>N </span>
                  {(studentDetails?.sex === "male") ? sectionFees?.maleUniform : sectionFees?.femaleUniform}
                </td>
                <td>
                  <span>N</span>
                  {fees?.uniform}
                </td>
                <td>
                  <span>N</span>
                  <input
                    type="number"
                    onChange={(e) => {
                      setUniformFeePaidNow(e.target.value);
                      setShowSave(true)
                    }}
                  />
                </td>
                <td>
                  {" "}
                  <select
                    className="form-control"
                    name="class"
                    id="class"
                    onChange={(e) => {
                      setUniformFeeRemark(e.target.value);
                      setShowSave(true)
                    }}
                    value={uniformFeeRemark}
                  >
                    <option value="">Select Payment Status</option>
                    <option value={"Paid"}>Paid</option>
                    <option value={"Incomplete Payment"}>Incomplete Payment</option>
                    <option value={"Not Paid"}>Not Paid</option>
                  </select>
                </td>
              </tr>

              <tr>
                <td>Books</td>
                <td>
                  <span>N</span>
                  {sectionFees?.textBooks}
                </td>
                <td>
                  <span>N</span>
                  {fees?.books}
                </td>
                <td>
                  <span>N</span>
                  <input
                    type="number"
                    onChange={(e) => {
                      setTxtBookFeePaidNow(e.target.value);
                      setShowSave(true);
                    }}
                  />
                </td>
                <td>
                  {" "}
                  <select
                    className="form-control"
                    name="class"
                    id="class"
                    onChange={(e) => {
                      setTxtBookFeeRemark(e.target.value);
                      setShowSave(true)
                    }}
                    value={txtBookFeeRemark}
                  >
                    <option value="">Select Payment Status</option>
                    <option value={"Paid"}>Paid</option>
                    <option value={"Incomplete Payment"}>Incomplete Payment</option>
                    <option value={"Not Paid"}>Not Paid</option>
                  </select>
                </td>
              </tr>


              <tr>
                <td>School Bus</td>
                <td>
                  <span>N</span>
                  {sectionFees?.schBus}
                </td>
                <td>
                  <span>N</span>
                  {fees?.schBus}
                </td>
                <td>
                  <span>N</span>
                  <input
                    type="number"
                    onChange={(e) => {
                      setSchoolBusPaidNow(e.target.value);
                      setShowSave(true)
                    }}
                  />
                </td>
                <td>
                  <select
                    className="form-control"
                    name="class"
                    id="class"
                    onChange={(e) => {
                      setSchBusFeeRemark(e.target.value);
                      setShowSave(true)
                    }}
                    value={schBusFeeRemark}
                  >
                    <option value="">Select Payment Status</option>
                    <option value={"Paid"}>Paid</option>
                    <option value={"Incomplete Payment"}>Incomplete Payment</option>
                    <option value={"Not Paid"}>Not Paid</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
          {showSave && (
            <button onClick={() => setStep(2)} className="btn btn-primary btn-block">
              Next
            </button>
          )}
        </>

      }

      {step === 2 &&
        <>
          <div className="form-group-display mt-5 mb-5">
            <label htmlFor="class">Mode Of payment</label>
            <select
              className="form-control"
              name="class"
              onChange={(e) => {
                setPaymentMode(e.target.value);
                setShowSave(true)
              }}
            >
              <option value="">Select Mode Of Payment</option>
              <option value={"Cash Payment"}>Cash Payment</option>
              <option value={"Bank Deposit"}>Bank deposite</option>
              <option value={"Mobile Transfer"}>Mobile Transfer</option>
            </select>
          </div>

          {showSave && (
            <button onClick={() => (confirmAction('Update Fee', sessionDetails?._id))} className="btn btn-primary btn-block">
              Save
            </button>
          )}
        </>
      }

      <Modal
        show={show}
        isLoading={isLoading}
        handleClose={handleClose}
        message={message}
        title={actionType}
        itemId={itemId}
        action1={updateFee}

      />

    </div>
  );
}
export default UpdateStudentFee;
