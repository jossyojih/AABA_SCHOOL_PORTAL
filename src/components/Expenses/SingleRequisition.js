import React, {useState,useEffect} from 'react'
import moment from 'moment'

function SingleRequisition({ requisition,setStep }) {
    const [data, setData] = useState([])

    useEffect(() => {
     setData(requisition.items)
    }, [requisition])
    
    return (
        <div>
            <div>
                <h3 >Requisition Form </h3>

            </div>
            <div className=''>
                <h4>Name: {requisition.name}</h4>
                <h4>Session:  {`${requisition.schoolYear - 1}/${requisition.schoolYear}`}</h4>
                <h4>Term: {requisition.term}</h4>
                <h4>Month: {moment(requisition.date).format('MMMM')}</h4>
                <h4>Date: {moment(requisition.date).format('MMMM Do YYYY')}</h4>
            </div>


            <div className="card shadow mb-4">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>S/N</th><th>Particulars</th><th>Unit Price (<del style={{ textDecorationStyle: 'double' }}>N</del>)</th><th>Quantity</th><th>Amount(<del style={{ textDecorationStyle: 'double' }}>N</del>)</th><th>Amount Approved(<del style={{ textDecorationStyle: 'double' }}>N</del>)</th><th>Director Approval</th>
                                </tr>
                            </thead>

                            <tbody>
                                <>
                                    {data?.map(item => {
                                        return (
                                            <tr key={item.SN}>
                                                <td>{item.SN}</td>
                                                <td>{item.particulars}</td>
                                                <td>{item.unitPrice}</td>
                                                <td>{item.qty}</td>
                                                <td>{item.amount}</td>
                                                <td>{item.approvedAmount}</td>
                                                <td>{item.directorApprove}</td>
                                            </tr>

                                        )
                                    })}
                                </>
                            </tbody>
                            {/* <tfoot>
                                <tr>
                                    <th colSpan='8'>Grand Total</th>

                                    <th><span style={{ textDecoration: 'line-through', textDecorationStyle: 'double' }}>N</span>{getGrandTotal()}</th>
                                </tr>
                            </tfoot> */}
                        </table>
                    </div>
                </div>
            </div>
            <button className='btn btn-block btn-primary' onClick={()=>setStep(1)}>Go Back</button>
        </div>
    )
}

export default SingleRequisition