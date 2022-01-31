import React, { useState, useEffect } from 'react';
import { Route, Switch, BrowserRouter, useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';
//Normal Imports

import Navbar from './components/navbar/Navbar';

import Login from './pages/login/Login'
import NewStaff from './pages/Registration/NewStaff';
import AdminPortal from './pages/portal/admin/AdminPortal';
import StaffPortal from './pages/portal/staff/StaffPortal';
import AccountPortal from './pages/portal/accountant/AccountPortal';
import StudentPortal from './pages/portal/student/StudentPortal';
import Result from './components/student/result/Result';
import SecResult from './components/student/secResult/SecResult';
import StudentResult from './components/student/result/StudentResult';
import BroadSheet from './components/student/result/StudentBroad';
import EditResult from './components/student/result/editResult/EditResult';
import EditSecResult from './components/student/secResult/editSecResult/EditSecResult';

//Admin Imports


function AppLayout() {

  return (
    <div>
      {/* <Navbar /> */}
      <Switch>
        <Route path="/computesecresult/:id" component={SecResult}
        />
          <Route path="/editsecresult/:id" component={EditSecResult}
        />
        <Route path="/studentbroad" component={BroadSheet}
        />

        <Route path="/student/result/:id" component={StudentResult}
        />
        <Route path="/editresult/:id" component={EditResult}
        />
        <Route path="/computeresult/:id" component={Result}
        />

        <Route path="/" exact component={Login} />
      </Switch>
      {/* <footer id="footer" className=" footer-area">
        <Footer />
      </footer> */}
    </div>
  );
}


function Layouts() {


  const [{ user }, dispatch] = useStateValue()
  const history = useHistory()

  useEffect(() => {

    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      dispatch({
        type: actionTypes.Set_USER,
        user: user
      })
      if(user.role==='super-admin'||user.role==='admin'){
        history.push('/adminportal/index')
      }else if(user.role==='staff'){
        history.push('/staffportal')
      }else if(user.role==='accountant'){
        history.push('/accountportal')
      }else{
        history.push('/studentportal')
      }

    } else {
      history.push('/')
    }

  }, [])
  return (
    <Switch>
      <Route path="/accountportal" component={AccountPortal} />
      <Route path="/studentportal" component={StudentPortal} />
      <Route path="/staffportal" component={StaffPortal} />
      <Route path="/adminportal" component={AdminPortal} />
      <Route path="/registration/newstaff" component={NewStaff}/>
      <Route path="/" component={AppLayout} />
    </Switch>
  );
}

function App() {
  


  return (
    <div className="Container-fluid">

      <BrowserRouter>
        <Layouts />
      </BrowserRouter>

    </div>
  );

}

export default App;
