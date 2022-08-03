import React from 'react'
import { Link } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';

function StdPortalNav({id,profile}) {
    const [{ user }, dispatch] = useStateValue()
    return (
        <div className='profile_nav'>
            {
                (user?.role === 'admin' || user?.role === 'accountant') && <Link to={`/accountportal/studentfees/${id}`} className="collapse-item" >Fees & payment |</Link>
            }
            {
                (user?.role !== 'student') &&
                <>
                    <Link to={`/${user?.role === 'staff' ? 'staffportal' : 'adminportal'}/studentbooks/${id}`} className="collapse-item" >Book List |</Link>
                    <Link to={`/${user?.role === 'staff' ? 'staffportal' : 'adminportal'}/student/termattendance/${id}`} className="collapse-item" >Attendance</Link>|
                    <Link to={`/student/result/${id}`} className="collapse-item" >Result</Link>|
                    <Link to={`/${profile?.section === 'Secondary' ? 'computesecresult' : 'computeresult'}/${id}`} className="collapse-item" >Compute Result</Link>|
                    <Link to={`/${user?.role === 'staff' ? 'staffportal' : 'adminportal'}/`} className="collapse-item" >Teacher's Remarks</Link>|
                    <Link to={`/${user?.role === 'staff' ? 'staffportal' : 'adminportal'}/`} className="collapse-item" >Affective Domain</Link>
                </>
            }

        </div>
    )
}

export default StdPortalNav