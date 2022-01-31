import React, {useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'

function SchoolCalendarCard() {
    
    const history = useHistory()
    const [data,setData]= useState()
    useEffect(() => {
       
        fetch('http://localhost:5000/admin/schoolcalendar',{
            headers:{
             "Authorization":"Bearer "+ localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
          
          setData(result.data)
        
        }).catch(err=>{
            console.log(err)
        })
        
    }, []);
    return (
            <div className="col-xl-3 col-md-6 mb-4">
                <div className="card border-left-success shadow h-100 py-2">
                <div className="card-body" style={{cursor:'pointer'}} onClick={()=>history.push('/adminportal/schoolcalendar')}>
                    <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">School Calendar</div>
                        <div className="text-xs h5 mb-0 font-weight-bold text-gray-800">SchoolYear: {`${(data?.year-1)}/${data?.year}`}</div>
                        <div className="text-xs h5 mb-0 font-weight-bold text-gray-800">Term: {data?.term}</div>
                        <div className="text-xs h5 mb-0 font-weight-bold text-gray-800">Week: {data?.week}</div>
                        <div className="text-xs h5 mb-0 font-weight-bold text-gray-800">Date: {(new Date().toDateString())}</div>
                    </div>
                    <div className="col-auto">
                        <i className="fas fa-calendar fa-2x text-gray-300"></i>
                    </div>
                    </div>
                </div>
                </div>
            </div>
    )
}

export default SchoolCalendarCard
