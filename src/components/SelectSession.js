import React from 'react'

function SelectSession({year,setYear,disabled}) {
    return (
        <div className="form-group-display" style={{width:'250px'}}>
                <label  htmlFor="class">Select Session</label>
                
                <select className="form-control" name="class" id="class" disabled={disabled} onChange={(e) => {
                    setYear(e.target.value);
            
                }} value={year} required>
                        <option value="">Select Year</option>
                        <option value={2022}>2021/2022</option>
                        <option value={2023}>2022/2023</option>
                        <option value={2024}>2023/2024</option>
                        <option value={2025}>2024/2025</option>
                        <option value={2026}>2025/2026</option>     
                </select>
            </div> 
    )
}

export default SelectSession
