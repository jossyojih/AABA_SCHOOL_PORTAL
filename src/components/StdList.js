import React from 'react'
import Loader from 'react-loader-spinner'
import { useHistory } from 'react-router-dom';

function StdList({isLoading,stdClass,stdList,confirmAction,resetPwd,role}) {
    const history = useHistory()
    const year = new Date().getFullYear()

    return (
        <>
              <h3 className="h3 mb-2 text-gray-800">List OF Student {isLoading && <Loader type="TailSpin" color="#00BFFF" height={40} width={40} />}</h3>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">{stdClass}</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Reg No</th>
                                    <th>Sex</th>
                                    <th>Section</th>
                                    <th>Class</th>
                                    {!resetPwd?
                                    <>
                                    <th>State of Origin</th>
                                    <th>Age</th>
                                    </>:
                                    <th>Action</th>

}
                                </tr>
                            </thead>

                            <tbody>
                                <>
                                    {stdList?.map(student => {
                                        return (
                                            <tr key={student._id}>
                                                <td style={{ cursor: 'pointer' }} onClick={() => history.push(`/${(role==="admin"||role==='super-admin')?'adminportal':role==='accountant'?'accountportal':"staffportal"}/studentprofile/${student._id}`)}>{student.firstname} {student.middlename} {student.lastname}</td>
                                                <td>{student.user?.username.toUpperCase()}</td>
                                                <td>{student.sex}</td>
                                                <td>{student.section}</td>
                                                <td>{student.stdClass}</td>
                                                {!resetPwd?
                                    <>
                                                <td>{student.stateOfOrigin}</td>
                                                <td>{(year - (student.DOB).substring(0, 4))}</td>
                                                </>
                                                :
                                                <td> <button className='btn btn-warning btn-sm mr-2' onClick={() => confirmAction('password reset', student.user?._id)}>Reset Password</button></td>
                                    }
                                            </tr>

                                        )
                                    })}
                                </>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StdList
