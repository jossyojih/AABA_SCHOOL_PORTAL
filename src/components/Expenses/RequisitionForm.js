import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery } from 'react-query'
import { HOST_URL } from '../../config'
import Loader from 'react-loader-spinner'
import DatePicker from "react-datepicker";
import InputRequisitionItem from './InputRequisitionItem'
import SelectSession from '../SelectSession';

const fetchSchoolCalendar = async (key) => {
    const res = await fetch(`${HOST_URL}/api/admin/school-calendar`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
    })
    return res.json();
}


function RequisitionForm() {
    const history = useHistory()
    const [inputFields, setInputFields] = useState(5)
    const [items, setItems] = useState([])
    const [term, setTerm] = useState()
    const [name, setName] = useState()
    const [date, setDate] = useState(new Date())
    const [year, setYear] = useState()
    const [isLoading, setIsLoading] = useState(false)

    // React query fecth data
    const { data, status } = useQuery(['requisitionForms'], fetchSchoolCalendar)

    useEffect(() => {
        if (!data) return
        setYear(data.year)
        setTerm(data.term)
    }, [data])


    useEffect(() => {
        const values = []
        for (let i = 0; i < inputFields; i++) {
            values.push({
                SN: i + 1,
                particulars: items[i]?.particulars || "",
                unitPrice: items[i]?.unitPrice || "",
                qty: items[i]?.qty || '',
                amount: items[i]?.amount || "",
                approvedAmount: items[i]?.approvedAmount || "",
                directorApprove: items[i]?.directorApprove || ""
            })
        }
        setItems(values)
    }, [inputFields])


    const addInputs = (e) => {
        e.preventDefault();
        setInputFields((prev) => prev + 1)
        // setItems(prev => [...prev, { week: '', date: '', activity: '' }])
    };

    async function submitRequisition(e) {
        e.preventDefault();
        setIsLoading(true)
        const isValid = formValidation();
        if(!isValid) return setIsLoading(false)

        if (isValid) {
            const itemData = items.filter(item => item.particulars !== '' && item.directorApprove !== '')
            if (!itemData[0]) {
                setIsLoading(false)
                return alert('Please Enter An Item')
            }
            const response = await fetch(`${HOST_URL}/api/payments/create-requisition`, {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    name,
                    term,
                    date,
                    month: date.getMonth(),
                    requisitionYear: date.getFullYear(),
                    schoolYear: year,
                    itemData,

                })
            })
            const data = await response.json()
            console.log(data)
            if (data.error) {
                setIsLoading(false)
                return alert(data.error)
            }
            alert('Requisition updated succesfully')
            setIsLoading(false)
            history.goBack()


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
        <div className='studentbooklist'>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <div className="form-group">
                    <label className='mr-4'>Name</label>
                    <input type='text' placeholder='Enter Name' onChange={(e) => setName(e.target.value)} />

                </div>
                <div className="form-group-display">
                    <label> Date</label>
                    <DatePicker name="deadline"
                        className={'form-control'}
                        selected={date}
                        onChange={date => {
                            setDate(date)

                        }}
                    />

                </div>

            </div>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>

                <div className="form-group">
                    <SelectSession
                        disabled={true}
                        year={year}
                        setYear={setYear}
                    />

                </div>
                <div className="form-group-display">
                    <label htmlFor="class">Term</label>
                    <select className="form-control" name="class" id="class" disabled={true} onChange={(e) => {
                        setTerm(e.target.value);

                    }} value={term} required>
                        <option value="">Select Term</option>
                        <option value={1}>First Term</option>
                        <option value={2}>Second Term</option>
                        <option value={3}>Third Term</option>
                    </select>


                </div>
            </div>

            <table className="table table-bordered" id="dataTable" cellSpacing="0">
                <thead>
                    <tr>
                        <th>S/N</th><th>Particulars</th><th>Unit Price (<del style={{ textDecorationStyle: 'double' }}>N</del>)</th><th>Quantity</th><th>Amount(<del style={{ textDecorationStyle: 'double' }}>N</del>)</th><th>Amount Approved(<del style={{ textDecorationStyle: 'double' }}>N</del>)</th><th>Director Approval</th>
                    </tr>

                </thead>
                <tbody>

                    {items?.map((item, i) => {
                        return (
                            <tr key={i}>
                                <InputRequisitionItem

                                    i={i}
                                    items={items}

                                />
                            </tr>
                        )

                    }

                    )}
                </tbody>
            </table>
            <div className='bookList_btn'>
                <button className="btn btn-primary btn-block" onClick={addInputs}> Add Another Item  </button>
                {isLoading ? <button className="btn btn-primary btn-block"><Loader type="TailSpin" color="#FFF" height={20} width={20} /></button> :
                    <button onClick={submitRequisition} className="btn btn-primary btn-block" disabled={isLoading?true:false}>Submit</button>

                }
            </div>
        </div>
    )
}

export default RequisitionForm