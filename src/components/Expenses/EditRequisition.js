import React, { useState, useEffect } from 'react'
import moment from 'moment'
import EditInputRequisition from './EditInputRequisition'
import { HOST_URL } from '../../config'
import { useHistory } from 'react-router-dom'
import Loader from 'react-loader-spinner'

function EditRequisition({ requisition, setStep,setSingleRequisition }) {
    const history = useHistory()
    const [data, setData] = useState([])

    const [term, setTerm] = useState(requisition.term)
    const [name, setName] = useState(requisition.name)
    const [date, setDate] = useState(moment(requisition.date).format('MMMM Do YYYY'))
    const [year, setYear] = useState(`${requisition.schoolYear - 1}/${requisition.schoolYear}`)
    const [month, setMonth] = useState(moment(requisition.date).format('MMMM'))
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setData(requisition.items)
    }, [requisition])

    async function updateRequisition(e) {
        e.preventDefault();
        console.log(data)

        const isValid = formValidation();
        if (isValid) {
            setIsLoading(true)
            const itemData = data.filter(item => item.particulars !== '' && item.directorApprove !== '')
            if (!itemData[0]) {
                setIsLoading(false)
                return alert('Please Enter An Item')
            }
            const response = await fetch(`${HOST_URL}/api/payments/update-requisition/${requisition._id}`, {
                method: 'put',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    name,
                    term,
                    date: requisition.date,
                    month: requisition.month,
                    schoolYear: requisition.schoolYear,
                    items: itemData,

                })
            })
            const result = await response.json()
            console.log(result)
            if (result.error) {
                setIsLoading(false)
                return alert(result.error)
            }
            alert(result.message)
            setIsLoading(false)
            setSingleRequisition(result.result)
          setStep(2)


        }

    }

    const formValidation = () => {

        let isValid = true;

        if (!name) {
            alert('Name is required');
            isValid = false;
        } else if (!date) {
            alert('date is required');
            isValid = false;
        } else if (!year) {
            alert('Year is required');
            isValid = false;
        } else if (!term) {
            alert('term is required');
            isValid = false;
        }

        return isValid;
    }



    return (
        <div>
            <div className=''>
                <h1>Edit Requisition Form</h1>
                <div className="form-group">
                    <label className='mr-4'>Name</label>
                    <input type='text' value={name} placeholder='Enter Name' onChange={(e) => setName(e.target.value)} />

                </div>
                <h4>Session:  {year}</h4>
                <h4>Term: {term}</h4>
                <h4>Month: {month}</h4>
                <h4>Date: {date}</h4>
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
                                    {data?.map((item, i) => {
                                        return (
                                            <tr key={item.SN}>
                                                <EditInputRequisition
                                                    i={i}
                                                    item={item}
                                                    data={data}
                                                    setData={setData}
                                                />
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
            <div className='d-flex'>
                <button className='btn btn-block btn-primary mr-2' onClick={() => setStep(1)}>Go Back</button>
                {isLoading ? <button className="btn btn-primary btn-block"><Loader type="TailSpin" color="#FFF" height={20} width={20} /></button> :
                    <button className='btn btn-block btn-primary' onClick={updateRequisition} disabled={isLoading?true:false}>Update Requisition</button>
                }
            </div>

        </div>
    )
}

export default EditRequisition