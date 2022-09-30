import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import '../portal.css'
import logo from '../../../assets/aabaLogo.jpg'
import { Route, Switch, BrowserRouter } from 'react-router-dom';
// import Admin from './Admin';
import { useStateValue } from '../../../StateProvider';
import { actionTypes } from '../../../reducer';
import StaffStdList from './StaffStdList';
import StudentProfile from '../../../components/student/StudentProfile';
import UpdateStaffDetails from '../../../components/staff/UpdateStaffDetails';
import TeacherComment from '../../../components/student/result/TeacherComment';
import ComputeAttendance from '../../../components/student/result/ComputeAttendance';
import Psychomoto from '../../../components/student/result/Psycomoto';
import StaffProfile from '../../../components/staff/StaffProfile';
import ResetPassword from '../../../components/ResetPassword';
import SchoolCalendar from '../../../components/Schoolcalendar';
import NewQuiz from '../../../components/quiz/NewQuiz';
import Weeklyperformance from '../../../components/weeklyPerformance/Weeklyperformance';
import EnterSubjectPerformance from '../../../components/weeklyPerformance/EnterSubjectPerformance';
import EnterPsychomotoPerformance from '../../../components/weeklyPerformance/EnterPsychomotoPerformance';
import WeeklyTeacherRemark from '../../../components/weeklyPerformance/WeeklyTeacherRemark';
import SchoolEvents from '../../../components/SchoolEvent/SchoolEvents';
import UpdateStdAttendance from '../../../components/attendance/UpdateStdAttendance';
import StudentTermAttendance from '../../../components/attendance/GetStdAttendance';
import UpdateStudentBookStatus from '../../../components/books/UpdateStudentBookList';
import CreateBookList from '../../../components/books/CreateClassBookList';
import BookList from '../../../components/books/BookList';
import QuizDisplay from '../../../components/quiz/displayQuizes/QuizDisplay';


const StaffPortal = (props) => {

    const history = useHistory()
    const [show, setShow] = useState(false);
    const [{ user }, dispatch] = useStateValue()
    const [staffDetails, setStaffDetails] = useState()

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
        const staff = JSON.parse(localStorage.getItem("staff"))
        setStaffDetails(staff)
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

    return (
        <div>
            <div id="wrapper">


                <ul className={`navbar-nav bg-gradient-dark sidebar ${toggle && "toggled"} sidebar-dark accordion`} id="accordionSidebar">

                    <Link to='/' className="sidebar-brand d-flex align-items-center justify-content-center" >
                        <div className="sidebar-brand-icon .d-none .d-md-block">
                            <img src={logo} alt='logo' />
                        </div>
                        <div className="sidebar-brand-text mx-2">AABA MEMORIAL SCHOOL</div>
                    </Link>


                    <hr className="sidebar-divider my-0" />


                    <li className="nav-item">
                        <Link to={`/staffportal/staff-profile/${user?._id}`} className="nav-link" >
                            <i className="fas fa-fw fa-tachometer-alt"></i>
                            <span>Dashboard</span></Link>
                    </li>


                    <hr className="sidebar-divider" />


                    <div className="sidebar-heading">
                        Interface
                    </div>

                    <li className="nav-item active">
                        <a className="nav-link" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
                            <i className="fas fa-fw fa-folder"></i>
                            <span>Pages</span>
                        </a>
                        <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                            <div className="bg-white py-2 collapse-inner rounded">
                                <h6 className="collapse-header">Staff Screens:</h6>
                                <Link to={`/staffportal/editstaffprofile/${user?._id}`} className="collapse-item" >Update Profile</Link>
                                <Link to='/staffportal/reset-password' className="collapse-item" >Reset Password</Link>
                                <Link to='/staffportal/schoolcalendar' className="collapse-item" >School Calendar</Link>

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
                                <Link to='/staffportal/stdlist' className="collapse-item">Student List</Link>
                                <Link to='/staffportal' className="collapse-item">Student Attendance</Link>
                                <Link to='/staffportal' className="collapse-item">Student Register</Link>
                                <Link to='/studentbroad' className="collapse-item">Student Result</Link>
                                <Link to='/staffportal/createbooklist' className="collapse-item" >Create List of Books</Link>
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
                                <Link to='/staffportal/' className="collapse-item">Compose</Link>
                                <Link to='/staffportal/classdailyattendance' className="collapse-item">Inbox</Link>
                                <Link to='/staffportal/markstudentattendance' className="collapse-item">Sent Messages</Link>

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
                                <Link to='/staffportal/newquiz' className="collapse-item">Set-Quiz</Link>
                                <Link to='/staffportal/displayquiz' className="collapse-item">Display-Quiz</Link>
                                <Link to='/staffportal/' className="collapse-item">Online Classes</Link>
                                <Link to='/staffportal/' className="collapse-item">Video Lessons</Link>


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


                            {/* <SearchStudent /> */}


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
                                </li>


                                <li className="nav-item dropdown no-arrow mx-1">
                                    {/* <AdminNotification /> */}

                                </li>


                                <li className="nav-item dropdown no-arrow mx-1">
                                    <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
                                        <img className="img-profile rounded-circle" src={staffDetails?.photo} />
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
                                <Route path={`${path}/displayquiz`} component={QuizDisplay}
                                />
                                <Route path={`${path}/editweeklyteachercomment/:id`} component={WeeklyTeacherRemark}
                                />
                                <Route path={`${path}/editweeklypsychomoto/:id`} component={EnterPsychomotoPerformance}
                                />
                                <Route path={`${path}/editsubjectperformance/:id`} component={EnterSubjectPerformance}
                                />

                                <Route path={`${path}/weeklyperformance/:id`} component={Weeklyperformance}
                                />
                                <Route path={`${path}/schoolevents`} component={SchoolEvents}
                                />
                                <Route path={`${path}/updatestudentattendance/:id`} component={UpdateStdAttendance}
                                />
                                <Route path={`${path}/studentattendance/:id`} component={StudentTermAttendance}
                                />
                                <Route path={`${path}/studentbookupdate/:id`} component={UpdateStudentBookStatus}
                                />
                                <Route path={`${path}/createbooklist`} component={CreateBookList}
                                />
                                <Route path={`${path}/studentbooks/:id`} component={BookList}
                                />
                                <Route path={`${path}/newquiz`} component={NewQuiz}
                                />
                                <Route path={`${path}/schoolcalendar`} component={SchoolCalendar}
                                />
                                <Route path={`${path}/reset-password`} component={ResetPassword}
                                />
                                <Route path={`${path}/affective_domain/:id`} component={Psychomoto}
                                />
                                <Route path={`${path}/computestdattendance/:id`} component={ComputeAttendance}
                                />
                                <Route path={`${path}/teachercomment/:id`} component={TeacherComment}
                                />
                                <Route path={`${path}/editstaffprofile/:id`} component={UpdateStaffDetails}
                                />
                                <Route path={`${path}/studentprofile/:id`} component={StudentProfile}
                                />
                                <Route path={`${path}/stdlist`} component={StaffStdList}
                                />
                                <Route path={`${path}/staff-profile/:id`} component={StaffProfile}
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

export default StaffPortal

