import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import '../portal.css'
import logo from '../../../assets/aabaLogo.jpg'
import { Route, Switch, BrowserRouter } from 'react-router-dom';
// import Admin from './Admin';
import { useStateValue } from '../../../StateProvider';
import { actionTypes } from '../../../reducer';
import PaymentsPage from '../../../components/payments/payments';
import StudentList from './StudentList';
import StudentProfile from '../../../components/student/StudentProfile';
import Fees from '../../../components/payments/Fees';
import FeesToPay from '../../../components/payments/FeesToPay';
import UpdateStudentFee from '../../../components/payments/UpdateStudentPayment';
import PaymentHistory from '../../../components/payments/PaymentHistory';


const AccountPortal = (props) => {

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


    return (
        <div>
            <div id="wrapper">


                <ul className={`navbar-nav bg-gradient-info sidebar ${toggle && "toggled"} sidebar-dark accordion`} id="accordionSidebar">

                    <Link to='/' className="sidebar-brand d-flex align-items-center justify-content-center" >
                        <div className="sidebar-brand-icon .d-none .d-md-block">
                            <img src={logo} alt='logo' />
                        </div>
                        <div className="sidebar-brand-text mx-2">AABA MEMORIAL SCHOOL</div>
                    </Link>


                    <hr className="sidebar-divider my-0" />


                    <li className="nav-item">
                        <Link to='/adminportal/admin' className="nav-link" >
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
                                <h6 className="collapse-header">Finance Screens:</h6>
                                <Link to='/accountportal/paymentpage' className="collapse-item">View Payments</Link>
                                <Link to='/accountportal/staffvalidation' className="collapse-item" >New Payment</Link>
                                <Link to='/accountportal/feestopay' className="collapse-item">Fees By Sections</Link>
                                <div className="collapse-divider"></div>

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
                                <Link to='/accountportal/studentlist' className="collapse-item">Student List</Link>
                                <Link to='/accountportal/classfees' className="collapse-item">Student Fees</Link>


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
                                        <img className="img-profile rounded-circle" src={user?.photo} alt={user?.username}/>
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
                                {/* <Route path={`${path}/paymentpage`}  component={PaymentsPage}
                      />
                    <Route path={`${path}/displayquiz`}  component={DisplayQuizAdmin}
                      />
                     <Route path={`${path}/classfees`}  component={ClassFees}
                      />
                      <Route path={`${path}/staff/termattendance/:id`}  component={StaffTermAttendance}
                      />
                      <Route path={`${path}/student/termattendance/:id`}  component={TermAttendance}
                      />
                      <Route path={`${path}/studentbookupdate/:id`}  component={UpdateBookStatus}
                      />
                         <Route path={`${path}/studentfeesupdate/:id`}  component={UpdateFee}
                      />
                       <Route path={`${path}/studentfees/:id`}  component={Fees}
                      />
                      <Route path={`${path}/studentbook/:id`}  component={StudentBookList}
                      />
                      <Route path={`${path}/staffprofile/:id`}  component={StaffProfile}
                      />
                      <Route path={`${path}/studentprofile/:id`}  component={StudentProfile}
                      />
                      <Route path={`${path}/markstudentattendance`}  component={MarkAttendance}
                      />
                
                      <Route path={`${path}/staffdailyattendance`}  component={StaffsDailyAttendance}
                      />
                      <Route path={`${path}/classdailyattendance`}  component={ClassDailyAttendance}
                      />
                      <Route path={`${path}/admin`} component={Admin} />
                      
                      <Route path={`${path}/subjectlist`} component={SubjectList}
                      />
          
                      <Route path={`${path}/stafflist`} component={StaffList}
                      />
                     
                    */}
                                <Route path={`${path}/feestopay`} component={FeesToPay}
                                />
                                <Route path={`${path}/updatestudentfees/:id`} component={UpdateStudentFee}
                                />
                                  <Route path={`${path}/studentpaymenthistory/:id`} component={PaymentHistory}
                                />
                                <Route path={`${path}/studentfees/:id`} component={Fees}
                                />
                                <Route path={`${path}/studentprofile/:id`} component={StudentProfile}
                                />
                                <Route path={`${path}/studentlist`} component={StudentList}
                                />
                                <Route path={`${path}/paymentpage`} component={PaymentsPage}
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

export default AccountPortal

