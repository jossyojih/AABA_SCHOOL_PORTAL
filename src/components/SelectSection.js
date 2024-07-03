import React from 'react'
import { useStateValue } from '../StateProvider';

function SelectSection({ setSection, section, setSectionErr }) {
    const [{ user }, dispatch] = useStateValue()

    return (
        <div className="form-group-display">
            <label htmlFor="section">Section</label>
            <select className="form-control" name="section" id="section" onChange={(e) => {
                setSection(e.target.value);
                setSectionErr('')
            }} value={section} disabled={user?.role ==="staff"?true:false}>
                <option value="">Select Section</option>
                <option value="Creche">Creche</option>
                <option value="Pre-Nursery">Pre-Nursery</option>
                <option value="Nursery">Nursery</option>
                <option value="Lower-Grade">Lower-Grade</option>
                <option value="Upper-Grade">Upper-Grade</option>
                <option value="Secondary"> Secondary</option>


            </select>
        </div>
    )
}

export default SelectSection
