import React, { useState,} from 'react';
import { HOST_URL } from '../../../config'
import Loader from 'react-loader-spinner'
import SelectClass from '../../../components/SelectClass';


function PromoteStudents() {
    const [stdClass, setStdClass] = useState('')
    const [newClass, setNewClass] = useState('')
    const [isLoading, setIsLoading] = useState()



    const onSubmit = async (e) => {
        e.preventDefault();

        if (!stdClass || !newClass) return alert('Please Select a value for all field')

        setIsLoading(true)
        const response = await fetch(`${HOST_URL}/api/admin/promote-students`, {
            method: 'put',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
              stdClass,
              newClass
            })
        })
        const data = await response.json()
        
        if (data.error) {
            setIsLoading(false)

            alert(data.error)
        } else {
            setNewClass('')
            setStdClass('')
            setIsLoading(false)
            alert(data.message)
          
        }

    }
    

    return (

        <div className="studentList ">

            {/* <div className='product-display-right'>
                <Loader type="TailSpin" color="#00BFFF" height={20} width={20} />
                Loading. Please Wait.
            </div> */}


            <div style={{ display: "flex", alignItems: 'center', justifyContent: "center" }}>
                <SelectClass
                    section={''}
                    stdClass={stdClass}
                    setStdClass={setStdClass}
                />
                <SelectClass
                    New={"New"}
                    section={''}
                    stdClass={newClass}
                    setStdClass={setNewClass}
                />
            </div>
      
            {isLoading ?
                    <button className='btn btn-primary btn-block'>
                        <Loader type="TailSpin" color="#FFF" height={20} width={20} />
                    </button>
                    :
                    <button onClick={onSubmit} disabled={isLoading && true} className='btn btn-primary btn-block'>Submit</button>
                }

        </div>

    )
}

export default PromoteStudents