import React, { useState, useEffect } from 'react'
import "./expenses.css"


function EditInputRequisition({ i, data,setData, item }) {
    const [particulars, setParticulars] = useState(item.particulars)
    const [unitPrice, setUnitPrice] = useState(item.unitPrice)
    const [qty, setQty] = useState(item.qty)
    const [amount, setAmount] = useState(item.amount)
    const [approvedAmount, setApprovedAmount] = useState(item.approvedAmount)
    const [directorApproval, setDirectorApproval] = useState(item.directorApprove)

    const getParticulars = () => {
        let a = data
        a[i].particulars = particulars
        setData(a)
    }

    const getUnitPrice = () => {
        setAmount(unitPrice * qty)
        setApprovedAmount(unitPrice * qty)
        let a = data
        a[i].unitPrice = unitPrice
        setData(a)
    }
    const getQty = () => {
        setAmount(unitPrice * qty)
        setApprovedAmount(unitPrice * qty)
        let a = data
        a[i].qty = qty
        setData(a)
    }
    const getAmount = () => {
        let a = data
        a[i].amount = amount
        setData(a)
    }
    const getApprovedAmount = () => {
        let a = data
        a[i].approvedAmount = approvedAmount
        setData(a)
    }
    const getDirectorApproval = () => {
        let a = data
        a[i].directorApprove = directorApproval
        setData(a)
    }
    return (
        <>
            <td>{item.SN}</td>
            <td><input type='text' placeholder='Enter item' value={particulars} onBlur={getParticulars} onChange={(e) => setParticulars(e.target.value)} /></td>
            <td><input type='number' placeholder='unit price' value={unitPrice} onBlur={getUnitPrice} onChange={(e) => setUnitPrice(e.target.value)} /></td>
            <td><input type='number' placeholder='Quantity' value={qty} onBlur={getQty} onChange={(e) => setQty(e.target.value)} /></td>
            <td><input type='number' placeholder='Amount' value={amount} onBlur={getAmount} onChange={(e) => setAmount(e.target.value)} /></td>
            <td>
                <input type='number' placeholder='Amount Approved' value={approvedAmount} onBlur={getApprovedAmount} onChange={(e) => setApprovedAmount(e.target.value)} />
            </td>
            <td>
                <select className="form-control" style={{ "width": "150px" }} value={directorApproval} name="directorApproval" id="week" onChange={(e) => setDirectorApproval(e.target.value)} onBlur={getDirectorApproval}>
                    <option value=''>Director Approval</option>
                    <option value="Approved">Approved</option>
                    <option value="Not Approved">Not Approved</option>

                </select>
            </td>
        </>
    )
}

export default EditInputRequisition