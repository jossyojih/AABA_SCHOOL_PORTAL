import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import '../portal.css'
import logo from '../../../assets/aabaLogo.jpg'
import { Route, Switch, BrowserRouter } from 'react-router-dom';
// import Admin from './Admin';
import { useStateValue } from '../../../StateProvider';
import { actionTypes } from '../../../reducer';
import Fees from '../../../components/payments/Fees';
import StudentProfile from '../../../components/student/StudentProfile'
import StudentResult from '../../../components/student/result/StudentResult';
import { Redirect } from 'react-router-dom';
import ResetPassword from '../../../components/ResetPassword';
import BookList from '../../../components/books/BookList';
import StudentTermAttendance from '../../../components/attendance/GetStdAttendance';
import StudentSubjects from '../../../components/subjects/StudentSubjects';
import Weeklyperformance from '../../../components/weeklyPerformance/Weeklyperformance';
import SchoolEvents from '../../../components/SchoolEvent/SchoolEvents';
import TakeQuiz from '../../../components/quiz/takequiz/TakeQuiz';
import QuizPage from '../../../components/quiz/takequiz/QuizPage';

const StudentPortal = (props) => {

    const history = useHistory()
    const [show, setShow] = useState(false);
    const [studentDetails, setStudentDetails] = useState()
    const [{ user }, dispatch] = useStateValue()
    const [uri, setUri] = useState('')

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [mobileView, setMobileView] = useState(false)

    const { match: { path } } = props;
    const [toggle, setToggle] = useState(false)
    const [toggleMobileSidebar, setToggleMobileSidebar] = useState(true)

    const toggleSidebar = () => {
        setToggle(!toggle)

    }


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let resizeWindow = () => {
        setWindowWidth(window.innerWidth);

    };

    useEffect(() => {
        const student = JSON.parse(localStorage.getItem("student"))
        setStudentDetails(student)
        setUri(localStorage.getItem("route"))

        //   resizeWindow();
        window.addEventListener("resize", resizeWindow);
        return () => window.removeEventListener("resize", resizeWindow);
    }, []);

    useEffect(() => {
        // Redirect to Profile
        if (!uri) return
        history.push(uri)

    }, [uri])


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

                <ul className={`navbar-nav bg-gradient-info sidebar ${toggle && "toggled"} ${(toggleMobileSidebar && mobileView) && "mobile-sidebar"} sidebar-dark accordion`} id="accordionSidebar" onTouchMove={() => (mobileView && !toggleMobileSidebar) && setToggleMobileSidebar(!toggleMobileSidebar)}>

                    <Link to={`/studentportal/studentprofile/${studentDetails?._id}`} onClick={() => mobileView && setToggleMobileSidebar(!toggleMobileSidebar)} className="sidebar-brand d-flex align-items-center justify-content-center" >
                        <div className="sidebar-brand-icon .d-none .d-md-block">
                            <img src={logo} alt='logo' />
                        </div>
                        <div className="sidebar-brand-text mx-2">AABA MEMORIAL SCHOOL</div>
                    </Link>


                    <hr className="sidebar-divider my-0" />


                    <li className="nav-item" onClick={() => mobileView && setToggleMobileSidebar(!toggleMobileSidebar)}>
                        <Link to={`/studentportal/studentprofile/${studentDetails?._id}`} className="nav-link" >
                            <i className="fas fa-fw fa-tachometer-alt"></i>
                            <span>Dashboard</span></Link>
                    </li>


                    <hr className="sidebar-divider" />


                    <div className="sidebar-heading">
                        Interface
                    </div>

                    <li className="nav-item">
                        <a className="nav-link" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="true" aria-controls="collapsePages">
                            <i className="fas fa-fw fa-folder"></i>
                            <span>Records</span>
                        </a>
                        <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                            <div className="bg-white py-2 collapse-inner rounded" onClick={() => mobileView && setToggleMobileSidebar(!toggleMobileSidebar)}>

                                <Link to={`/studentportal/studentfees/${studentDetails?._id}`} className="collapse-item" >Fees & Payments</Link>
                                <Link to={`/studentportal/studentbooks/${studentDetails?._id}`} className="collapse-item" >List Of Books</Link>
                                <Link to={`/studentportal/studentattendance/${studentDetails?._id}`} className="collapse-item" >Atendance</Link>
                                <Link to={`/studentportal/weeklyperformance/${studentDetails?._id}`} className="collapse-item" >Performance Report</Link>
                                <Link to='/studentportal/schoolevents' className="collapse-item" >School Calendar</Link>
                                <Link to='/studentportal/reset-password' className="collapse-item" >Reset Password</Link>


                            </div>
                        </div>
                    </li>


                    <div className="sidebar-heading">
                        Addons
                    </div>


                    <li className="nav-item">
                        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                            <i className="fas fa-book-open"></i>
                            <span>Academics</span>
                        </a>

                        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                            <div className="bg-white py-2 collapse-inner rounded" onClick={() => mobileView && setToggleMobileSidebar(!toggleMobileSidebar)}>
                                <h6 className="collapse-header">Custom Components:</h6>
                                <Link to={`/studentportal/studentsubjects/${studentDetails?.section}`} className="collapse-item">My Subjects</Link>
                                <Link to='/studentportal/takequiz' className="collapse-item">My Assignments</Link>
                                <Link to={`/studentportal/result/${studentDetails?._id}`} className="collapse-item">Result</Link>
                            </div>
                        </div>
                    </li>

                    <hr className="sidebar-divider" />



                    <li className="nav-item">
                        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#messages" aria-expanded="true" aria-controls="collapseUtilities">
                            <i className="fa fa-envelope"></i>
                            <span>Messages</span>
                        </a>
                        <div id="messages" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
                            <div className="bg-white py-2 collapse-inner rounded" onClick={() => mobileView && setToggleMobileSidebar(!toggleMobileSidebar)}>
                                <h6 className="collapse-header">Custom Utilities:</h6>
                                <Link to='/studentportal/' className="collapse-item">Compose</Link>
                                <Link to='/studentportal/classdailyattendance' className="collapse-item">Inbox</Link>
                                <Link to='/studentportal/markstudentattendance' className="collapse-item">Sent Messages</Link>

                            </div>
                        </div>
                    </li>



                    <li className="nav-item">
                        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#eLearning" aria-expanded="true" aria-controls="collapseUtilities">
                            <i className="fas fa-fw fa-chart-area"></i>
                            <span>E-Learning</span>
                        </a>
                        <div id="eLearning" className="collapse" aria-labelledby="headingUtilities" data-parent="#accordionSidebar">
                            <div className="bg-white py-2 collapse-inner rounded" onClick={() => mobileView && setToggleMobileSidebar(!toggleMobileSidebar)}>
                                <h6 className="collapse-header">Custom Utilities:</h6>
                                <Link to='/studentportal/' className="collapse-item">Online Classes</Link>
                                <Link to='/studentportal/' className="collapse-item">Video Classes</Link>
                                {/* <Link to='/studentportal/displayquiz' className="collapse-item">E-Quiz</Link> */}

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


                            <button id="sidebarToggleTop" className="btn btn-link d-md-none" onClick={() => setToggleMobileSidebar(!toggleMobileSidebar)}>
                                <i className="fa fa-bars"></i>
                            </button>


                            {/* <SearchStudent /> */}


                            <ul className="navbar-nav ml-auto">

                                <li className="nav-item dropdown no-arrow d-sm-none">
                                    <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-search fa-fw"></i>
                                    </a>

                                    {/* <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
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
                                    </div> */}
                                </li>


                                <li className="nav-item dropdown no-arrow mx-1">
                                    {/* <AdminNotification /> */}

                                </li>


                                <li className="nav-item dropdown no-arrow mx-1">
                                    <a className="nav-link dropdown-toggle" href="#" id="messagesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-envelope fa-fw"></i>

                                        <span className="badge badge-danger badge-counter">7</span>
                                    </a>

                                    {/* <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="messagesDropdown">
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
                                    </div> */}
                                </li>

                                <div className="topbar-divider d-none d-sm-block"></div>


                                <li className="nav-item dropdown no-arrow">
                                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">{user?.username}</span>
                                        <img className="img-profile rounded-circle" src={studentDetails?.photo} alt={user?.username} />
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

                        <div className="container-fluid student-portal-container" onClick={() => (mobileView && !toggleMobileSidebar) && setToggleMobileSidebar(!toggleMobileSidebar)}>

                            <Switch>
                                <Route path={`${path}/tacklequiz/:id`} component={QuizPage}
                                />
                                <Route path={`${path}/takequiz`} component={TakeQuiz}
                                />
                                <Route path={`${path}/schoolevents`} component={SchoolEvents}
                                />
                                <Route path={`${path}/weeklyperformance/:id`} component={Weeklyperformance}
                                />
                                <Route path={`${path}/studentsubjects/:section`} component={StudentSubjects}
                                />
                                <Route path={`${path}/studentattendance/:id`} component={StudentTermAttendance}
                                />
                                <Route path={`${path}/studentbooks/:id`} component={BookList}
                                />
                                <Route path={`${path}/reset-password`} component={ResetPassword}
                                />
                                <Route path={`${path}/result/:id`} component={StudentResult}
                                />
                                <Route path={`${path}/studentprofile/:id`} component={StudentProfile}
                                />
                                <Route path={`${path}/studentfees/:id`} component={Fees}
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

export default StudentPortal

