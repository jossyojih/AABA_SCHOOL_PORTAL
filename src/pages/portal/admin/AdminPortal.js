import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import '../portal.css'
import logo from '../../../assets/aabaLogo.jpg'
import { Route, Switch, BrowserRouter } from 'react-router-dom';
// import Admin from './Admin';
import { useStateValue } from '../../../StateProvider';
import { actionTypes } from '../../../reducer';
import NewStaff from '../../Registration/NewStaff'
import StaffValidation from './StaffValidation';
import NewStudent from '../../Registration/NewStudent';
import SchoolCalendar from './SchoolCalender';
import StudentList from './StudentList';
import ResetStdPwd from './ResetStdPassword';
import UpdateStaffDetails from '../../../components/staff/UpdateStaffDetails';
import ResetStaffPassword from './ResetStaffPwd';
import StaffList from './StaffList';
import SubjectList from './SubjectList';

// import AdminNotification from '../Admin/AdminNotification'
import StudentProfile from '../../../components/student/StudentProfile';
import StaffProfile from '../../../components/staff/StaffProfile';
import UpdateStudentDetails from '../../../components/student/UpdateStudentDetails';
import HMComment from '../../../components/student/result/HMComments';
import AdminHome from './AdminHome';
import NewTermBegins from './NewTermBegins';
import BookList from '../../../components/books/BookList';
import CreateBookList from '../../../components/books/CreateClassBookList';
import UpdateStudentBookStatus from '../../../components/books/UpdateStudentBookList';
import StudentTermAttendance from '../../../components/attendance/GetStdAttendance';
import UpdateStdAttendance from '../../../components/attendance/UpdateStdAttendance';
import SchoolEvents from '../../../components/SchoolEvent/SchoolEvents';
import UpdateSchoolEvent from '../../../components/SchoolEvent/UpdateSchoolEvent';
import PromoteStudents from './PromoteStudents';
import SearchStudent from '../../../components/Reuseables/SearchStudent';
import Fees from '../../../components/payments/Fees';
import UploadResult from './UploadResult';

const AdminPortal = (props) => {

    const history = useHistory()
    const [signin, setSignin] = useState(false)
    const [signout, setSignout] = useState(false)
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('Do you want to activate staff register?')
    const [{ user }, dispatch] = useStateValue()
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [mobileView, setMobileView] = useState(false)

    const { match: { path } } = props;
    const [toggle, setToggle] = useState(false)

    const toggleSidebar = () => {
        setToggle(!toggle)

    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let resizeWindow = () => {
        setWindowWidth(window.innerWidth);

    };

    useEffect(() => {

        //   resizeWindow();
        window.addEventListener("resize", resizeWindow);
        return () => window.removeEventListener("resize", resizeWindow);
    }, []);

    useEffect(() => {

        if (windowWidth < 560) {
            setMobileView(true)
        }
        return () => {
            setMobileView(false)
        };
    }, [windowWidth])

    useEffect(() => {
        if (mobileView) setToggle(true)
    }, [mobileView])


    // const ActivateStaffAttendance = () => {

    //     fetch(`http://localhost:5000/admin/activateattendanceregister`, {
    //         method: 'post',
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": "Bearer " + localStorage.getItem("jwt")
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data.error) {
    //                 handleClose()
    //                 alert(data.error)
    //             } else {

    //                 setMessage(data.message)
    //                 history.push(`${signin ? '/staffsignin' : '/staffsignout'}`)
    //             }

    //         })
    //         .catch(err => console.log(err));

    // }



    return (
        <div>
            <div id="wrapper">


                <ul className={`navbar-nav bg-gradient-info sidebar ${toggle && "toggled"} sidebar-dark accordion`} id="accordionSidebar">

                    <Link to='/' className="sidebar-brand d-flex align-items-center justify-content-center" >
                        <div className="sidebar-brand-icon .d-none .d-md-block ">
                            <img src={logo} alt='logo' />
                        </div>
                        <div className="sidebar-brand-text mx-2">AABA MEMORIAL SCHOOL</div>
                    </Link>


                    <hr className="sidebar-divider my-0" />


                    <li className="nav-item">
                        <Link to='/adminportal/index' className="nav-link" >
                            <i className="fas fa-fw fa-tachometer-alt"></i>
                            <span>Dashboard</span></Link>
                    </li>


                    <hr className="sidebar-divider" />


                    <div className="sidebar-heading">
                        Interface
                    </div>

                    <li className="nav-item">
                        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
                            <i className="fas fa-fw fa-folder"></i>
                            <span>Pages</span>
                        </a>
                        <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                            <div className="bg-white py-2 collapse-inner rounded">
                                <h6 className="collapse-header">Admin Screens:</h6>
                                {/*to='/staffsignin'*/}
                                {/* {to='/staffsignout'} */}

                                <p className="collapse-item" onClick={() => {
                                    setSignout(false)
                                    setSignin(true)
                                    handleShow()

                                }} >Staff Signin</p>

                                <p className="collapse-item" onClick={() => {
                                    setSignin(false)
                                    setSignout(true)
                                    handleShow()
                                }}>Staff Signout</p>

                                <Link to='/adminportal/newstudent' className="collapse-item" >Register New Student</Link>
                                <Link to='/adminportal/newstaff' className="collapse-item" >Register New Staff</Link>
                                <Link to='/adminportal/staffvalidation' className="collapse-item" >Staff Validation</Link>
                                <div className="collapse-divider"></div>
                                <h6 className="collapse-header">Other Pages:</h6>
                                <Link to='/adminportal/schoolcalendar' className="collapse-item" >School Calendar</Link>
                                <Link to='/adminportal/resetstaffpwd' className="collapse-item" >Reset Staff Password</Link>
                                <Link to='/adminportal/resetstdpassword' className="collapse-item" >Reset Student Password</Link>
                                <Link to='/adminportal/schoolevents' className="collapse-item" >Calendar Of Events</Link>
                                <Link to='/adminportal/termbegins' className="collapse-item" >Set Term Start Date</Link>
                                {user?.role === 'super-admin' && <Link to='/adminportal/subjectlist' className="collapse-item">Subject List</Link>}
                                {user?.role === 'super-admin' && <Link to='/adminportal/promote-students' className="collapse-item">Promote Student</Link>}
                                <Link to='/adminportal/createbooklist' className="collapse-item" >Create List of Books</Link>
                            </div>
                        </div>
                    </li>

                    <div className="sidebar-heading">
                        Addons
                    </div>


                    <li className="nav-item">
                        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                            <i className="fas fa-fw fa-wrench"></i>
                            <span>Staff</span>
                        </a>

                        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                            <div className="bg-white py-2 collapse-inner rounded">
                                <h6 className="collapse-header">Custom Components:</h6>
                                <Link to='/adminportal/stafflist' className="collapse-item">Staff List</Link>
                                <Link to='/adminportal/staffdailyattendance' className="collapse-item">Staff Attendance</Link>
                                <Link to='/adminportal/stafflessonnotes' className="collapse-item">Staff Lesson Notes</Link>
                                <Link to='/adminportal/stafflist' className="collapse-item">Staff Duty</Link>
                            </div>
                        </div>
                    </li>


                    <li className="nav-item">
                        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities" aria-expanded="true" aria-controls="collapseUtilities">
                            <i className="fas fa-fw fa-wrench"></i>
                            <span>Students</span>
                        </a>
                        <div id="collapseUtilities" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
                            <div className="bg-white py-2 collapse-inner rounded">
                                <h6 className="collapse-header">Custom Utilities:</h6>
                                <Link to='/adminportal/studentlist' className="collapse-item">Student List</Link>
                                <Link to='/adminportal/classdailyattendance' className="collapse-item">Student Attendance</Link>
                                <Link to='/adminportal/markstudentattendance' className="collapse-item">Student Register</Link>
                                <Link to='/adminportal/classfees' className="collapse-item">Student Fees</Link>
                                <Link to='/studentbroad' className="collapse-item">Student Result</Link>
                                <Link to='/adminportal/result-upload' className="collapse-item">Result Upload</Link>
                            </div>
                        </div>
                    </li>


                    <hr className="sidebar-divider" />



                    <li className="nav-item">
                        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#messages" aria-expanded="true" aria-controls="collapseUtilities">
                            <i className="fas fa-fw fa-chart-area"></i>
                            <span>Messages</span>
                        </a>
                        <div id="messages" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
                            <div className="bg-white py-2 collapse-inner rounded">
                                <h6 className="collapse-header">Custom Utilities:</h6>
                                <Link to='/adminportal/' className="collapse-item">Compose</Link>
                                <Link to='/adminportal/classdailyattendance' className="collapse-item">Inbox</Link>
                                <Link to='/adminportal/markstudentattendance' className="collapse-item">Sent Messages</Link>

                            </div>
                        </div>
                    </li>



                    <li className="nav-item">
                        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#eLearning" aria-expanded="true" aria-controls="collapseUtilities">
                            <i className="fas fa-fw fa-chart-area"></i>
                            <span>E-Learning</span>
                        </a>
                        <div id="eLearning" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
                            <div className="bg-white py-2 collapse-inner rounded">
                                <h6 className="collapse-header">Custom Utilities:</h6>
                                <Link to='/adminportal/' className="collapse-item">Online Classes</Link>
                                <Link to='/adminportal/' className="collapse-item">Video Classes</Link>
                                <Link to='/adminportal/displayquiz' className="collapse-item">E-Quiz</Link>

                            </div>
                        </div>
                    </li>
                    <hr className="sidebar-divider d-none d-md-block" />

                    <div className="text-center d-none d-md-inline">
                        <button className="rounded-circle border-0" id="sidebarToggle" onClick={toggleSidebar}></button>
                    </div>

                </ul>

                <div id="content-wrapper" className="d-flex flex-column">

                    <div id="content">
                        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                            <button id="sidebarToggleTop" className="btn btn-link d-md-none" onClick={toggleSidebar}>
                                <i className="fa fa-bars"></i>
                            </button>


                            <SearchStudent />

                            <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                                <form className="form-inline mr-auto w-100 navbar-search">
                                    <div className="input-group">
                                        <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                                        <div className="input-group-append">
                                            <button className="btn btn-primary" type="button">
                                                <i className="fas fa-search fa-sm"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>


                            <ul className="navbar-nav ml-auto">

                                <li className="nav-item dropdown no-arrow d-sm-none">
                                    <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-search fa-fw"></i>
                                    </a>

                                    <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                                        <form className="form-inline mr-auto w-100 navbar-search">
                                            <div className="input-group">
                                                <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                                                <div className="input-group-append">
                                                    <button className="btn btn-primary" type="button">
                                                        <i className="fas fa-search fa-sm"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>

                                    <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                                        <form className="form-inline mr-auto w-100 navbar-search">
                                            <div className="input-group">
                                                <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
                                                <div className="input-group-append">
                                                    <button className="btn btn-primary" type="button">
                                                        <i className="fas fa-search fa-sm"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </li>


                                <li className="nav-item dropdown no-arrow mx-1">
                                    {/* <AdminNotification /> */}

                                </li>


                                <li className="nav-item dropdown no-arrow mx-1">
                                    <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" data-toggle="dropdow" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-envelope fa-fw"></i>

                                        <span className="badge badge-danger badge-counter">7</span>
                                    </a>

                                    <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="messagesDropdown">
                                        <h6 className="dropdown-header">
                                            Message Center
                                        </h6>
                                        <a className="dropdown-item d-flex align-items-center" href="#">
                                            <div className="dropdown-list-image mr-3">
                                                <img className="rounded-circle" src="https://source.unsplash.com/fn_BT9fwg_E/60x60" alt="" />
                                                <div className="status-indicator bg-success"></div>
                                            </div>
                                            <div className="font-weight-bold">
                                                <div className="text-truncate">Hi there! I am wondering if you can help me with a problem I've been having.</div>
                                                <div className="small text-gray-500">Emily Fowler · 58m</div>
                                            </div>
                                        </a>
                                        <a className="dropdown-item d-flex align-items-center" href="#">
                                            <div className="dropdown-list-image mr-3">
                                                <img className="rounded-circle" src="https://source.unsplash.com/AU4VPcFN4LE/60x60" alt="" />
                                                <div className="status-indicator"></div>
                                            </div>
                                            <div>
                                                <div className="text-truncate">I have the photos that you ordered last month, how would you like them sent to you?</div>
                                                <div className="small text-gray-500">Jae Chun · 1d</div>
                                            </div>
                                        </a>
                                        <a className="dropdown-item d-flex align-items-center" href="#">
                                            <div className="dropdown-list-image mr-3">
                                                <img className="rounded-circle" src="https://source.unsplash.com/CS2uCrpNzJY/60x60" alt="" />
                                                <div className="status-indicator bg-warning"></div>
                                            </div>
                                            <div>
                                                <div className="text-truncate">Last month's report looks great, I am very happy with the progress so far, keep up the good work!</div>
                                                <div className="small text-gray-500">Morgan Alvarez · 2d</div>
                                            </div>
                                        </a>
                                        <a className="dropdown-item d-flex align-items-center" href="#">
                                            <div className="dropdown-list-image mr-3">
                                                <img className="rounded-circle" src="https://source.unsplash.com/Mv9hjnEUHR4/60x60" alt="" />
                                                <div className="status-indicator bg-success"></div>
                                            </div>
                                            <div>
                                                <div className="text-truncate">Am I a good boy? The reason I ask is because someone told me that people say this to all dogs, even if they aren't good...</div>
                                                <div className="small text-gray-500">Chicken the Dog · 2w</div>
                                            </div>
                                        </a>
                                        <a className="dropdown-item text-center small text-gray-500" href="#">Read More Messages</a>
                                    </div>
                                </li>

                                <div className="topbar-divider d-none d-sm-block"></div>


                                <li className="nav-item dropdown no-arrow">
                                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">{user?.username}</span>
                                        <img className="img-profile rounded-circle" src={user?.photo} alt={user?.username} />
                                    </a>

                                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                                        <a className="dropdown-item" href="#">
                                            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                            Profile
                                        </a>
                                        <a className="dropdown-item" href="#">
                                            <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                            Settings
                                        </a>
                                        <a className="dropdown-item" href="#">
                                            <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                                            Activity Log
                                        </a>
                                        <div className="dropdown-divider"></div>
                                        <a className="btn btn-default" onClick={() => {

                                            localStorage.clear()
                                            dispatch({
                                                type: actionTypes.Set_USER,
                                                user: null
                                            })
                                            history.push('/')

                                        }
                                        }>
                                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                            Logout
                                        </a>
                                    </div>
                                </li>

                            </ul>

                        </nav>

                        <div className="container-fluid">

                            <Switch>
                                <Route path={`${path}/result-upload`} component={UploadResult}
                                />
                                <Route path={`${path}/promote-students`} component={PromoteStudents}
                                />
                                <Route path={`${path}/updateschoolevents`} component={UpdateSchoolEvent}
                                />
                                <Route path={`${path}/schoolevents`} component={SchoolEvents}
                                />
                                <Route path={`${path}/updatestudentattendance/:id`} component={UpdateStdAttendance}
                                />
                                <Route path={`${path}/studentfees/:id`} component={Fees}
                                />
                                <Route path={`${path}/studentattendance/:id`} component={StudentTermAttendance}
                                />
                                <Route path={`${path}/studentbookupdate/:id`} component={UpdateStudentBookStatus}
                                />
                                <Route path={`${path}/createbooklist`} component={CreateBookList}
                                />
                                <Route path={`${path}/studentbooks/:id`} component={BookList}
                                />
                                <Route path={`${path}/head_teacher_remarks/:id`} component={HMComment}
                                />
                                <Route path={`${path}/staffprofile/:id`} component={StaffProfile}
                                />
                                <Route path={`${path}/studentprofile/:id`} component={StudentProfile}
                                />
                                <Route path={`${path}/subjectlist`} component={SubjectList}
                                />
                                <Route path={`${path}/studentprofileupdate/:id`} component={UpdateStudentDetails}
                                />
                                <Route path={`${path}/staffprofileupdate/:id`} component={UpdateStaffDetails}
                                />

                                <Route path={`${path}/resetstaffpwd`} component={ResetStaffPassword}
                                />
                                <Route path={`${path}/resetstdpassword`} component={ResetStdPwd}
                                />
                                <Route path={`${path}/stafflist`} component={StaffList}
                                />
                                <Route path={`${path}/studentlist`} component={StudentList}
                                />
                                <Route path={`${path}/termbegins`} component={NewTermBegins}
                                />
                                <Route path={`${path}/schoolcalendar`} component={SchoolCalendar}
                                />
                                <Route path={`${path}/newstudent`} component={NewStudent}
                                />
                                <Route path={`${path}/staffvalidation`} component={StaffValidation}
                                />
                                <Route path={`${path}/newstaff`} component={NewStaff}
                                />
                                <Route path={`${path}/index`} component={AdminHome}
                                />

                            </Switch>

                        </div>


                    </div>

                    <footer className="sticky-footer bg-white">
                        <div className="container my-auto">
                            <div className="copyright text-center my-auto">
                                <span>Copyright &copy; AABA Schools 2021</span>
                            </div>
                        </div>
                    </footer>

                </div>

            </div>

            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up"></i>
            </a>


        </div>
    )
}

export default AdminPortal

