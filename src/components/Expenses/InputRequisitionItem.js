import React, { useState, useEffect } from 'react'
import "./expenses.css"

function InputRequisitionItem({ i, items }) {
    const [particulars, setParticulars] = useState()
    const [unitPrice, setUnitPrice] = useState(0)
    const [qty, setQty] = useState(1)
    const [amount, setAmount] = useState(0)
    const [approvedAmount, setApprovedAmount] = useState()
    const [directorApproval, setDirectorApproval] = useState()

    useEffect(() => {
        getAmount()
    }, [amount])



    const getParticulars = () => {
        items[i].particulars = particulars
    }

    const getUnitPrice = () => {
        setAmount(unitPrice * qty)
        setApprovedAmount(unitPrice * qty)
        items[i].unitPrice = unitPrice
    }
    const getQty = () => {
        setAmount(unitPrice * qty)
        setApprovedAmount(unitPrice * qty)
        items[i].qty = qty
    }
    const getAmount = () => {
        items[i].amount = amount
    }
    const getApprovedAmount = () => {
        items[i].approvedAmount = approvedAmount
    }
    const getDirectorApproval = () => {
        items[i].directorApprove = directorApproval
    }

    return (
        <>
            <td className='inputBookList'>
                {i + 1}
            </td>
            <td>
                <input type='text' placeholder='Enter item' onBlur={getParticulars} onChange={(e) => setParticulars(e.target.value)} />
            </td>
            <td>
                <input type='number' placeholder='unit price' onBlur={getUnitPrice} onChange={(e) => setUnitPrice(e.target.value)} />
            </td>
            <td>
                <input type='number' placeholder='Quantity' onBlur={getQty} onChange={(e) => setQty(e.target.value)} />
            </td>
            <td>
                <input type='number' placeholder='Amount' value={amount} onBlur={getAmount} onChange={(e) => setAmount(e.target.value)} />
            </td>
            <td>
                <input type='number' placeholder='Amount Approved' value={approvedAmount} onBlur={getApprovedAmount} onChange={(e) => setApprovedAmount(e.target.value)} />
            </td>
            <td>
                <select className="form-control" style={{ "width": "150px" }} name="directorApproval" id="week" onChange={(e) => setDirectorApproval(e.target.value)} onBlur={getDirectorApproval}>
                    <option value=''>Director Approval</option>
                    <option value="Approved">Approved</option>
                    <option value="Not Approved">Not Approved</option>

                </select>
            </td>
        </>

    )
}

export default InputRequisitionItem