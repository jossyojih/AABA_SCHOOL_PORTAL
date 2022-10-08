import React from 'react'
import { useStateValue } from '../StateProvider';

function SelectClass({ stdClass, setStdClass, section, step, setStep,select,New }) {
    const [{ user }, dispatch] = useStateValue()
    return (

        <div className="form-group-display">
            <label htmlFor="class">Select {New && New} Class</label>

            <select className="form-control" name="class" id="class" onChange={(e) => {
                setStdClass(e.target.value);

            }} value={stdClass} disabled={(user?.role ==="staff"&&!select)?true:false}>
                <option value="">Select Class</option>
                {
                    (section === "Creche") && <>
                        <option value="Creche">Creche</option>
                    </>
                }
                {
                    (section === "Pre-Nursery") && <>
                        <option value="Pre-Nursery">Pre-Nursery</option>

                    </>
                }
                {
                    (section === "Nursery") && <>
                        <option value="Nursery1">Nursery 1</option>
                        <option value="Nursery2">Nursery 2</option>
                        <option value="Nursery3">Nursery 3</option>
                    </>
                }
                {
                    (section === "Lower-Grade") && <>
                        <option value="Primary1">Primary 1</option>
                        <option value="Primary2">Primary 2</option>
                        <option value="Primary3">Primary 3</option>

                    </>
                }
                {
                    (section === "Upper-Grade") && <>
                        <option value="Primary4">Primary 4</option>
                        <option value="Primary5">Primary 5</option>
                        <option value="Primary6">Primary 6</option>
                    </>
                }
                {
                    (section === "Secondary") && <>
                        <option value="JSS1">JSS 1</option>
                        <option value="JSS2">JSS 2</option>
                        <option value="JSS3">JSS 3</option>
                    </>
                }
                {

                    (section === "") && <>
                        <option value="Creche">Creche</option>
                        <option value="Pre-Nursery">Pre-Nursery </option>
                        <option value="Nursery1">Nursery 1</option>
                        <option value="Nursery2">Nursery 2</option>
                        <option value="Nursery3">Nursery 3</option>
                        <option value="Primary1">Primary 1</option>
                        <option value="Primary2">Primary 2</option>
                        <option value="Primary3">Primary 3</option>
                        <option value="Primary4">Primary 4</option>
                        <option value="Primary5">Primary 5</option>
                        <option value="Primary6">Primary 6</option>
                        <option value="JSS1">JSS 1</option>
                        <option value="JSS2">JSS 2</option>
                        <option value="JSS3">JSS 3</option>
                    </>
                }

            </select>
        </div>
    )
}

export default SelectClass
