import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
// import './adminportal.css'
import { HOST_URL } from '../../config'
import { useQuery, usePaginatedQuery } from 'react-query'
import Loader from 'react-loader-spinner'
import { useStateValue } from '../../StateProvider';
import moment from 'moment'
import DatePicker from "react-datepicker";
import { useHistory } from 'react-router-dom'
import SelectClass from '../SelectClass';
import SelectSection from '../SelectSection';

const fetchStaffDetails = async (key, id) => {
    if (!id) return
    const res = await fetch(`${HOST_URL}/api/staff/single-staff/${id}`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
    })
    return res.json();
}

function UpdateStaffDetails() {
    const history = useHistory()
    const { id } = useParams()
    const [{ user }, dispatch] = useStateValue()
    const [step, setStep] = useState(1)
    const errStyle = { color: "red", fontSize: "12px" };
    const [isLoading, setIsLoading] = useState(false)

    const [showType, setShowType] = useState(null)
    const [message, setMessage] = useState('')

    //Checks Fields
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [state, setState] = useState("");
    const [sex, setSex] = useState("");
    const [classMaster, setClassMaster] = useState('');
    const [DOB, setDOB] = useState(new Date())
    const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [confirmPassword, setConfirmPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [maritalStatus, setMaritalStatus] = useState('')



    //Checks Errors
    const [firstNameErr, setFirstNameErr] = useState();
    const [middleNameErr, setMiddleNameErr] = useState();
    const [lastNameErr, setLastNameErr] = useState();
    const [stateErr, setStateErr] = useState();
    const [emailErr, setEmailErr] = useState();
    // const [passwordErr, setPasswordErr] = useState();
    const [phoneErr, setPhoneErr] = useState();
    const [sexErr, setSexErr] = useState();
    const [sectionErr, setSectionErr] = useState();
    const [classErr, setClassErr] = useState();
    // const [dateErr, setDateErr] = useState()
    const [maritalErr, setMaritalErr] = useState()

    // React query fecth data
    const { data, status } = useQuery(['Profile', id], fetchStaffDetails)

    useEffect(() => {
        if (!data) return

        // Staff list data from query
        setFirstName(data.staff?.firstname)
        setLastName(data.staff?.lastname)
        setPhone(data.staff?.phone)
        setSex(data.staff?.sex)
        setMaritalStatus(data.staff?.maritalStatus)
        setState(data.staff?.stateOfOrigin)
        setEmail(data.staff?.email)
        setUsername(data.staff?.user.username)
        setClassMaster(data.staff?.classTeacher)
    }, [data])

    const nextStep = (e) => {
        e.preventDefault();
        const isValid = formValidation();
        if(isValid) return setStep(step => step + 1)
       

    };

    // Go back to prev step
    const prevStep = (e) => {
        e.preventDefault();
        setStep(step => step - 1)
    };

    // Handle Post to API

    const onSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true)

        try {
            const response = await fetch(`${HOST_URL}/api/staff/update-details/${id}`, {
                method: 'put',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    firstname: firstName,
                    middleName: middleName,
                    lastname: lastName,
                    username,
                    sex,
                    // DOB,
                    stateOfOrigin: state,
                    classTeacher: classMaster,
                    phone,
                    email,
                    maritalStatus,

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
                setStep(1)
                // setTimeout(() => {
                //     history.push('/adminportal')
                // }, 1000);
    
    
    
            }


        } catch (error) {
            setIsLoading(false)
            setShowType('error')
            setMessage('Oops! Something went wrong')
            console.log(error)
        }

    }

    // Handle form Validation
    const formValidation = () => {
        let isValid = true;

        if (!firstName) {
            setFirstNameErr("Firstname field cannot be empty");
            return isValid = false
        }
        if (!lastName) {
            setLastNameErr("Lastname field cannot be empty");
            return isValid = false

        }

        if (!sex) {
           setSexErr("Please select sex");
           return isValid = false
        }
        if (!state) {
            return setStateErr("Please choose a state");
        }

        if (!maritalStatus) {
            setMaritalErr("Please select marital status");
            return isValid = false
        }

        if (!phone) {
           setPhoneErr("Please enter phone number");
           return isValid = false

        }
        return isValid

    }


    return (
        <div className="container staff-container">
              {showType === 'success' &&
                <div class="alert alert-success text-center" role="alert">
                    {message}
                </div>
            }
            {showType === 'error' &&
                <div class="alert alert-danger text-center" role="alert">
                    {message}
                </div>
            }

            <div className="form-box">

                <form onSubmit={onSubmit} encType="multipart/form-data">

                    <h3 className="text-center">Update Staff Registration</h3>

                    {(step === 1) ?
                        <>
                            <h5>Staff Personal Details</h5>
                            <div className="form-group">
                                <div className="form-group-display">
                                    <label>First Name</label>
                                    <input type="text" className="form-control" name="firstName" placeholder="Enter First Name" value={firstName} onChange={(e) => {
                                        setFirstName(e.target.value);
                                        setFirstNameErr('')
                                    }} />
                                </div>
                                <div className="student-reg-error" style={errStyle}>{firstNameErr}</div>
                            </div>
                            <div className="form-group">
                                <div className="form-group-display">
                                    <label>Middle Name</label>
                                    <input type="text" className="form-control" name="middleName" placeholder="Enter Middle Name" value={middleName} onChange={(e) => {
                                        setMiddleName(e.target.value);
                                    }} />
                                </div>
                                <div className="student-reg-error" style={errStyle}>{middleNameErr}</div>
                            </div>
                            <div className="form-group">
                                <div className="form-group-display">
                                    <label>Last Name</label>
                                    <input type="text" className="form-control" name="lastName" placeholder="Enter Last Name" value={lastName} onChange={(e) => {
                                        setLastName(e.target.value);
                                        setLastNameErr('')
                                    }} />
                                </div>
                                <div className="student-reg-error" style={errStyle}>{lastNameErr}</div>
                            </div>
                            <div className="form-group">
                                <div className="form-group-display">
                                    <label>Username</label>
                                    <input type="text" className="form-control" name="lastName" placeholder="Enter Username" value={username} onChange={(e) => {
                                        setUsername(e.target.value);       
                                    }}
                                    disabled={user?.role ==="staff"?true:false}
                                    />
                                </div>
                                <div className="student-reg-error" style={errStyle}>{lastNameErr}</div>
                            </div>
                            <div className="form-group">
                                <div className="form-group-display">
                                    <label htmlFor="sex">Gender</label>
                                    <select className="form-control" name="sex" id="sex" onChange={(e) => {
                                        setSex(e.target.value);
                                        setSexErr('')
                                    }} value={sex}>

                                        <option value="">Selct Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                <div className="student-reg-error" style={errStyle}>{sexErr}
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-group-display">
                                    <label htmlFor="marital">Marital Status</label>
                                    <select className="form-control" name="marital" id="marital" onChange={(e) => {
                                        setMaritalStatus(e.target.value);
                                        setMaritalErr('')
                                    }} value={maritalStatus}>

                                        <option value="">Select Marital Status</option>
                                        <option value="single">Single</option>
                                        <option value="married">Married</option>
                                    </select>
                                </div>
                                <div className="student-reg-error" style={errStyle}>{maritalErr}
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="form-group-display">
                                    <label htmlFor="stateOfOrigin">State of Origin</label>
                                    <select className="form-control" name="stateOfOrigin" id="stateOfOrigin" onChange={(e) => {
                                        setState(e.target.value);
                                        setStateErr('')
                                    }} value={state}>
                                        <option value="">Select State</option>
                                        <option value="Abia">Abia</option>
                                        <option value="Adamawa">Adamawa</option>
                                        <option value="Akwa Ibom">Akwa Ibom</option>
                                        <option value="Anambra">Anambra</option>
                                        <option value="Bauchi">Bauchi</option>
                                        <option value="Bayelsa">Bayelsa</option>
                                        <option value="Benue">Benue</option>
                                        <option value="Borno">Borno</option>
                                        <option value="Cross-River">Cross River</option>
                                        <option value="Delta">Delta</option>
                                        <option value="Ebonyi">Ebonyi</option>
                                        <option value="Edo">Edo</option>
                                        <option value="Ekiti">Ekiti</option>
                                        <option value="Enugu">Enugu</option>
                                        <option value="FCT">FCT</option>
                                        <option value="Gombe">Gombe</option>
                                        <option value="Imo">Imo</option>
                                        <option value="Jigawa">Jigawa</option>
                                        <option value="Kaduna">Kaduna</option>
                                        <option value="Kano">Kano</option>
                                        <option value="Katsina">Katsina</option>
                                        <option value="Kebbi">Kebbi</option>
                                        <option value="Kogi">Kogi</option>
                                        <option value="Kwara">Kwara</option>
                                        <option value="Lagos">Lagos</option>
                                        <option value="Niger">Niger</option>
                                        <option value="Ogun">Ogun</option>
                                        <option value="Ondo">Ondo</option>
                                        <option value="Osun">Osun</option>
                                        <option value="Oyo">Oyo</option>
                                        <option value="Plateau">Plateau</option>
                                        <option value="Rivers">Rivers</option>
                                        <option value="Sokoto">Sokoto</option>
                                        <option value="Taraba">Taraba</option>
                                        <option value="Yobe">Yobe</option>
                                        <option value="Zamfara">Zamfara</option>

                                    </select>
                                </div>
                                <div className="student-reg-error" style={errStyle}>{stateErr}</div>
                            </div>
                     
                            <div className="form-group">
                                <SelectClass
                                    section={''}
                                    stdClass={classMaster}
                                    setStdClass={setClassMaster}
                                    setClassErr={setClassErr}
                                />
                                <div className="student-reg-error" style={errStyle}>{classErr}
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-group-display">
                                    <label>Phone Number</label>
                                    <input type="text" className="form-control" name="phone" placeholder="Enter Phone Number" value={phone} onChange={(e) => {
                                        setPhone(e.target.value);
                                        setPhoneErr('')
                                    }} />
                                </div>
                                <div className="student-reg-error" style={errStyle}>{phoneErr}</div>
                            </div>
                            <div className="form-group">
                                <div className="form-group-display">
                                    <label>Email address</label>
                                    <input type="email" value={email} className="form-control" name="email" placeholder="Enter email" onChange={(e) => {
                                        setEmail(e.target.value)
                                        setEmailErr('')
                                    }} />
                                </div>
                                <div className="student-reg-error" style={errStyle}>{emailErr}</div>
                            </div>

                            <button onClick={nextStep} className="btn btn-primary btn-block">Next</button>
                        </> :


                        <div>
                            <h5 className="text-center">Please Confirm Data Entered</h5>
                            <div className="form-group-display">
                                <label>Staff Name</label>
                                <p className='student-reg-confirm'>{firstName} {middleName} {lastName}</p>
                            </div>
                            <div className="form-group-display">
                                <label>Sex</label>
                                <p className='student-reg-confirm'>{sex}</p>
                            </div>
                            <div className="form-group-display">
                                <label>State</label>
                                <p className='student-reg-confirm'>{state}</p>
                            </div>

                            <div className="form-group-display">
                                <label>Class</label>
                                <p className='student-reg-confirm'>{classMaster}</p>
                            </div>

                            <div className="form-group-display">
                                <label>Phone Number</label>
                                <p className='student-reg-confirm'>{phone}</p>
                            </div>

                            <div className="form-group-display">
                                <label>Email</label>
                                <p className='student-reg-confirm'>{email}</p>
                            </div>
                            {isLoading ? <span><Loader type="TailSpin" color="#00BFFF" height={40} width={40} /> Processing...</span> :
                                <>
                                    <button onClick={prevStep} className="btn btn-primary btn-reg-prev btn-block">Go Back</button>
                                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                                </>
                            }
                        </div>
                    }
                </form>
            </div>
        </div>


    )
}


export default UpdateStaffDetails
