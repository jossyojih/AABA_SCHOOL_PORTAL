import React, { useState,useEffect } from 'react'
import SelectSection from '../SelectSection'
import { useQuery, usePaginatedQuery } from 'react-query'
import Loader from 'react-loader-spinner'
import { HOST_URL } from '../../config'

const fetchSectionFees = async (key, section) => {
    if (!section) return
    const res = await fetch(`${HOST_URL}/api/payments/fees/${section}`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
    })
    return res.json();
}

function FeesToPay() {
    const [isLoading, setIsLoading] = useState(false)
    const [section, setSection] = useState('')
    const [feeId,setFeeId] = useState('')
    const [sectionErr, setSectionErr] = useState('')
    const [registrationFee, setRegistrationFee] = useState('')
    const [schoolFees, setSchoolFees] = useState('')
    const [maleUniform, setMaleUniform] = useState('')
    const [femaleUniform, setFemaleUniform] = useState('')
    const [textBook, setTextBook] = useState('')
    const [schBus, setSchBus] = useState('')

    // React query fecth data
    const { data, status } = useQuery(['SectionFee', section], fetchSectionFees)

    useEffect(() => {
        if (!data) return
        setFeeId(data._id)
        setRegistrationFee(data.feeInfo.registration)
        setSchoolFees(data.feeInfo.schoolFees)
        setSchBus(data.feeInfo.schBus)
        setTextBook(data.feeInfo.textBooks)
        setMaleUniform(data.feeInfo.maleUniform)
        setFemaleUniform(data.feeInfo.femaleUniform)
    }, [data])

    const upDateSectionFees = async () => {
      
        setIsLoading(true)
        try {
            const response = await fetch(`${HOST_URL}/api/payments/updatefees/${feeId}`, {
                method: 'put',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    registrationFee,
                    schoolFees,
                    maleUniform,
                    femaleUniform,
                    textBook,
                    schBus

                })
            })

            const data = await response.json()
            if (data.error) {
                setIsLoading(false)
               
            } else {
                setIsLoading(false)
                alert(data.message)

            }


        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }

    }


    return (
        <div>
            <div className="form-group">
                <SelectSection
                    section={section}
                    setSection={setSection}
                    setSectionErr={setSectionErr}
                />

            </div>

            <table className="table table-bordered" id="dataTable" cellSpacing="0">
                <thead>
                    <tr>
                        <td>Fee</td>
                        <td>Amount</td>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Registration Fees</td>
                        <td>
                            <span>N</span>
                            <input
                                type="number"
                                value={registrationFee}
                                onChange={(e) => {
                                    setRegistrationFee(e.target.value);

                                }}
                            />
                        </td>

                    </tr>
                    <tr>
                        <td>School Fees</td>
                        <td>
                            <span>N</span>
                            <input
                                type="number"
                                value={schoolFees}
                                onChange={(e) => {
                                    setSchoolFees(e.target.value);

                                }}
                            />
                        </td>

                    </tr>
                    <tr>
                        <td>Uniform Fees (Male)</td>
                        <td>
                            <span>N</span>
                            <input
                                type="number"
                                value={maleUniform}
                                onChange={(e) => {
                                    setMaleUniform(e.target.value);

                                }}
                            />
                        </td>

                    </tr>
                    <tr>
                        <td>Uniform Fees (Female)</td>
                        <td>
                            <span>N</span>
                            <input
                                type="number"
                                value={femaleUniform}
                                onChange={(e) => {
                                    setFemaleUniform(e.target.value);

                                }}
                            />
                        </td>

                    </tr>
                    <tr>
                        <td>Text Books Fee</td>
                        <td>
                            <span>N</span>
                            <input
                                type="number"
                                value={textBook}
                                onChange={(e) => {
                                    setTextBook(e.target.value);

                                }}
                            />
                        </td>

                    </tr>
                    <tr>
                        <td>School Bus Fee</td>
                        <td>
                            <span>N</span>
                            <input
                                type="number"
                                value={schBus}
                                onChange={(e) => {
                                    setSchBus(e.target.value);

                                }}
                            />
                        </td>

                    </tr>
                </tbody>
            </table>

            {
                isLoading ? <button className="btn btn-primary btn-block"><Loader type="TailSpin" color="#FFF" height={40} width={40} /></button> :
                    <button onClick={upDateSectionFees} className="btn btn-primary btn-block" disabled={isLoading?true:false}>Update</button>
            }
        </div>
    )
}

export default FeesToPay
