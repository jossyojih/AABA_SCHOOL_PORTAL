import React, { useState, useEffect } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import './Registration.css'
import Loader from 'react-loader-spinner'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import SelectClass from '../../components/SelectClass';
import SelectSection from '../../components/SelectSection';
import { HOST_URL } from '../../config'
import { useParams } from 'react-router-dom'
import { useQuery, usePaginatedQuery } from 'react-query'

const fetchStudentDetails = async (key, id) => {
    if (!id) return
    const res = await fetch(`${HOST_URL}/api/users/single-student/${id}`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
    })
    return res.json();
}

function UpdateStudentDetails() {
    const history = useHistory()
    const [step, setStep] = useState(1)
    const { id } = useParams()
    const errStyle = { color: "red", fontSize: "12px" };
    const [isLoading, setIsLoading] = useState(false)
    const [showType, setShowType] = useState(null)
    const [message, setMessage] = useState('')
    //Checks Fields
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [state, setState] = useState("");
    const [religion, setReligion] = useState("");
    const [sex, setSex] = useState("");
    const [section, setSection] = useState();
    const [stdClass, setStdClass] = useState('');
    const [DOB, setDOB] = useState(new Date())
    const [regNo, setRegNo] = useState("");
    const [userId, setUserId] = useState('')
    const [parentName, setParentName] = useState('')
    const [phone, setPhone] = useState('')
    const [occupation, setOccupation] = useState('')


    //Checks Errors
    const [firstNameErr, setFirstNameErr] = useState();
    const [lastNameErr, setLastNameErr] = useState();
    const [stateErr, setStateErr] = useState();
    const [regNoErr, setRegNoErr] = useState();
    const [parentNameErr, setParentNameErr] = useState();
    const [phoneErr, setPhoneErr] = useState();
    const [occupationErr, setOccupationErr] = useState();
    const [sexErr, setSexErr] = useState();
    const [religionErr, setReligionErr] = useState();
    const [sectionErr, setSectionErr] = useState();
    const [classErr, setClassErr] = useState();
    const [dateErr, setDateErr] = useState()



    // React query fecth data
    const { data, status } = useQuery(['Profile', id], fetchStudentDetails)

    useEffect(() => {
        if (!data) return
        // Staff list data from query
        setFirstName(data.student?.firstname)
        setMiddleName(data.student?.middlename)
        setLastName(data.student?.lastname)
        setPhone(data.student?.phone)
        setSex(data.student?.sex)
        // setMaritalStatus(data.staff?.maritalStatus)
        setState(data.student?.stateOfOrigin)
        setReligion(data.student?.religion)
        setSection(data.student?.section)
        setStdClass(data.student?.stdClass)
        setDOB(new Date(data.student?.DOB))
        setRegNo((data.student.user.username))
        setUserId(data.student.user._id)
        setParentName(data.student?.parentName)
        setOccupation(data.student?.occupation)
    }, [data])

    const nextStep = (e) => {
        e.preventDefault();
        if (step === 1) {
            formValidation1()
        } else if (step === 2) {
            formValidation2()
        } else if (step === 3) {
            formValidation3()
        }
        //setStep(step=> step + 1 )
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
        const response = await fetch(`${HOST_URL}/api/admin/update-student-details/${userId}`, {
            method: 'put',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                firstName,
                middleName,
                lastName,
                sex,
                state,
                section,
                religion,
                DOB,
                stdClass,
                parentName,
                phone,
                occupation,
                username: regNo,

            })
        })

        const data = await response.json()
        console.log(data)
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

    }


    // Handle form Validation
    const formValidation1 = () => {

        if (!firstName) {
            return setFirstNameErr("Firstname field cannot be empty");
        }
        if (!lastName) {
            return setLastNameErr("Lastname field cannot be empty");
        }

        if (!sex) {
            return setSexErr("Please select student sex");
        }
        if (!state) {
            return setStateErr("Please choose a state");
        }
        if (!religion) {
            return setReligionErr("Please choose a religion");
        }
        if (!section) {
            return setSectionErr("Please select section");
        }
        if (!stdClass) {
            return setClassErr("Please select class");

        }
        if (!DOB) {
            return setDateErr('Please select student date of birth')
        }
        setStep(2)
    }

    const formValidation2 = () => {

        if (!regNo) {
            return setRegNoErr('Please Enter Registration Number')

        }
        setStep(3)
    }
    const formValidation3 = () => {

        if (!parentName) {
            return setParentNameErr("Parent name field cannot be empty");
        }
        if (!phone) {
            return setPhoneErr("Please enter parent phone number");
        }

        if (!occupation) {
            return setOccupationErr("Please enter parent occupation");
        }
        setStep(4)
    }

    return (
        <div className="container student-reg-container">

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

            <div className="form-box">

                <form onSubmit={onSubmit} encType="multipart/form-data">

                    <h3 className="text-center">New Student Registration</h3>

                    {(step === 1) ?
                        <>
                            <h5 className="text-center">Student Personal Details</h5>
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
                                    <label htmlFor="sex">Sex</label>
                                    <select className="form-control" name="sex" id="sex" onChange={(e) => {
                                        setSex(e.target.value);
                                        setSexErr('')
                                    }} value={sex}>

                                        <option value="">Selct sex</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                <div className="student-reg-error" style={errStyle}>{sexErr}
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="form-group-display">
                                    <label htmlFor="sex">Religion</label>
                                    <select className="form-control" name="sex" id="sex" onChange={(e) => {
                                        setReligion(e.target.value);
                                        setReligionErr('')
                                    }} value={religion}>

                                        <option value="">Select Religion</option>
                                        <option value="Christian">Christian</option>
                                        <option value="Islam">Islam</option>
                                    </select>
                                </div>
                                <div className="student-reg-error" style={errStyle}>{religionErr}
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
                                <div className="form-group-display">
                                    <label> DOB</label>
                                    <DatePicker name="deadline"
                                        className={'form-control reg-datepicker'}
                                        selected={DOB}
                                        onChange={date => setDOB(date)}
                                    />
                                </div>
                                <div className="student-reg-error" style={errStyle}>{dateErr}</div>
                            </div>
                            <div className="form-group">
                                <SelectSection
                                    section={section}
                                    setSection={setSection}
                                    setSectionErr={setSectionErr}
                                />
                                <div className="student-reg-error" style={errStyle}>{sectionErr}
                                </div>
                            </div>
                            <div className="form-group">
                                <SelectClass
                                    section={section}
                                    stdClass={stdClass}
                                    setStdClass={setStdClass}
                                    setClassErr={setClassErr}
                                />
                                <div className="student-reg-error" style={errStyle}>{classErr}
                                </div>
                            </div>
                            <button onClick={nextStep} className="btn btn-primary btn-lg btn-block reg-btn-next">Next</button>
                        </> :
                        (step === 2) ?
                            <>
                                <h5 className="text-center">Student Login Details</h5>

                                <div className="form-group">
                                    <div className="form-group-display">
                                        <label>Admission Number</label>
                                        <input type="email" value={regNo} className="form-control" name="regNo" placeholder="Enter Student's Admission Number" onChange={(e) => {
                                            setRegNo(e.target.value)
                                            setRegNoErr('')
                                        }} />
                                    </div>
                                    <div className="student-reg-error" style={errStyle}>{regNoErr}</div>
                                </div>


                                <div className='registration_btn'>
                                    <button onClick={prevStep} className="btn btn-primary btn-reg-prev btn-block">Go Back</button>
                                    <button onClick={nextStep} className="btn btn-primary btn-reg-next btn-block">Next</button>
                                </div>

                            </>
                            : (step === 3) ?
                                <>
                                    <h5 className="text-center">Parent Details</h5>
                                    <div className="form-group">
                                        <div className="form-group-display">
                                            <label>Parent Name</label>
                                            <input type="text" className="form-control" name="parentName" placeholder="Enter Parent Name" value={parentName} onChange={(e) => {
                                                setParentName(e.target.value);
                                                setParentNameErr('')
                                            }} />
                                        </div>
                                        <div className="student-reg-error" style={errStyle}>{parentNameErr}</div>
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
                                            <label>Occupation</label>
                                            <input type="text" className="form-control" name="occupation" placeholder="Enter Occupation" value={occupation} onChange={(e) => {
                                                setOccupation(e.target.value);
                                                setOccupationErr('')
                                            }} />
                                        </div>
                                        <div className="student-reg-error" style={errStyle}>{occupationErr}</div>
                                    </div>
                                    <div className='registration_btn'>
                                        <button onClick={prevStep} className="btn btn-primary btn-reg-prev btn-block">Go Back</button>
                                        <button onClick={nextStep} className="btn btn-primary btn-reg-next btn-block">Next</button>
                                    </div>
                                </> :
                                <div>
                                    <h5 className="text-center">Please Confirm Data Entered</h5>
                                    <div className="form-group-display">
                                        <label>Student Name</label>
                                        <p className='student-reg-confirm'>{firstName} {middleName} {lastName}</p>
                                    </div>
                                    <div className="form-group-display">
                                        <label>Sex</label>
                                        <p className='student-reg-confirm'>{sex}</p>
                                    </div>
                                    <div className="form-group-display">
                                        <label>Religion</label>
                                        <p className='student-reg-confirm'>{religion}</p>
                                    </div>
                                    <div className="form-group-display">
                                        <label>State</label>
                                        <p className='student-reg-confirm'>{state}</p>
                                    </div>
                                    <div className="form-group-display">
                                        <label>DOB</label>
                                        <p className='student-reg-confirm'>{moment(DOB).format('MMMM Do YYYY')}</p>
                                    </div>
                                    <div className="form-group-display">
                                        <label>Section</label>
                                        <p className='student-reg-confirm'>{section}</p>
                                    </div>
                                    <div className="form-group-display">
                                        <label>Class</label>
                                        <p className='student-reg-confirm'>{stdClass}</p>
                                    </div>
                                    <div className="form-group-display">
                                        <label>Parent Name</label>
                                        <p className='student-reg-confirm'>{parentName}</p>
                                    </div>
                                    <div className="form-group-display">
                                        <label>Parent Phone</label>
                                        <p className='student-reg-confirm'>{phone}</p>
                                    </div>
                                    <div className="form-group-display">
                                        <label>Parent Occupation</label>
                                        <p className='student-reg-confirm'>{occupation}</p>
                                    </div>
                                    <div className="form-group-display">
                                        <label>Admission No.</label>
                                        <p className='student-reg-confirm'>{regNo}</p>
                                    </div>
                                    <div className='registration_btn'>

                                        {isLoading ? <span><Loader type="TailSpin" color="#00BFFF" height={40} width={40} /> Processing...</span> :
                                            <>
                                                <button onClick={prevStep} className="btn btn-primary btn-reg-prev btn-block">Go Back</button>
                                                <button type="submit" className="btn btn-primary btn-block">Update</button>
                                            </>
                                        }
                                    </div>
                                </div>
                    }
                </form>
            </div>

        </div>


    )
}

export default UpdateStudentDetails
