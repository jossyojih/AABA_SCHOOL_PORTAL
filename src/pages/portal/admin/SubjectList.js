import React, { useState, useEffect } from 'react'
import SelectSection from '../../../components/SelectSection';
import './adminportal.css';
import { HOST_URL } from '../../../config'
import Loader from 'react-loader-spinner'

function SubjectList() {
    const nurserySubjects = ['Number work', 'Phonics', 'Letter work', 'Science', 'Social Norms', 'Hand Writing', 'colouring', 'Rhymes','Nursery Science']
    const primarySubjects = ['English Language',"Grammer","Phonics","Comprehension","Literature","Dictation/Spelling","Composition",'Mathematics', 'Social-Studies', 'Basic Science', 'Quantitative-Reasoning', "Verbal-Reasoning", 'I.C.T', "Home Economics","Civic Education",'Cultural and Creative Arts',"Music",'Hand-Writing', 'CRK/IRK', "Agricultural Science"]
    const secondarySubjects = ['English Language', 'Mathematics', 'Social-Studies', 'Basic Science', 'Business Studies', "P.H.E", 'I.C.T', "Home Economics", 'Basic Tech', 'Cultural and Creative Arts','CRK/IRK',"Civic Education", "Agricultural Science"]
    const [section, setSection] = useState();
    const [sectionErr, setSectionErr] = useState('')
    const [subjects, setSubjects] = useState([])
    const [isLoading, setIsLoading] = useState(false)

useEffect(() => {
  if(!section)return
  setSubjects([])
}, [section])
    const onSubmit = async () => {

        setIsLoading(true)
        const response = await fetch(`${HOST_URL}/api/admin/newsubjectList`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                section,
                subjects,
                
            })
        })

        const data = await response.json()

        if (data.error) {
            setIsLoading(false)
            console.log(data.error)

        } else {
            setIsLoading(false)
           
        }

    }


    const handleChange = (e, subject) => {

        if (e.target.checked) {
            setSubjects([...subjects, subject])
        } else {
            setSubjects((prev) => prev.filter(item => item !== subject)
            )
        }


    }

    return (
        <div className='subjectList'>
            <h3>Select List Of Subject To be offered By Each Section This Term </h3>
            <div className="form-group">
                <SelectSection
                    section={section}
                    setSection={setSection}
                    setSectionErr={setSectionErr}
                />

            </div>

            {
                (section === "Nursery"|| section === "Pre-Nursery") && <>
                    {
                        nurserySubjects.map((subject, i) => {
                            return (<div className="form-group" key={i}>
                                <div className="form-group-display">
                                    <label htmlFor="section">{subject}</label>
                                    <input type='checkbox' id='flight' name='powers' onChange={(e) => handleChange(e, subject)} />
                                </div>
                            </div>
                            )
                        })
                    }

                </>
            }
            {
                (section === "Lower-Grade" || section === "Upper-Grade") && <>
                    {
                        primarySubjects.map((subject, i) => {
                            return (<div className="form-group" key={i}>
                                <div className="form-group-display">
                                    <label htmlFor="section">{subject}</label>
                                    <input type='checkbox' id='flight' name='powers' onChange={(e) => handleChange(e, subject)} />
                                </div>
                            </div>
                            )
                        })
                    }

                </>
            }
            {
                (section === "Secondary") && <>
                    {
                        secondarySubjects.map((subject, i) => {
                            return (<div className="form-group" key={i}>
                                <div className="form-group-display">
                                    <label htmlFor="section">{subject}</label>
                                    <input type='checkbox' id='flight' name='powers' onChange={(e) => handleChange(e, subject)} />
                                </div>
                            </div>
                            )
                        })
                    }
                 

                </>
            }
               {
                        isLoading ? <button className="btn btn-primary btn-block"><Loader type="TailSpin" color="#FFF" height={40} width={40} /></button> :
                            <button onClick={onSubmit} className="btn btn-primary btn-block">Save</button>
                    }
        </div>
    )
}

export default SubjectList
