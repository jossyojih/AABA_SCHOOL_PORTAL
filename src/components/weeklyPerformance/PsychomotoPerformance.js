import React from 'react'

function PsychomotoPerformance({ data }) {

    return (
        <div className='affectiveDomain'>
            <table className="table table-bordered gradeAnalysis right" id="dataTable" cellSpacing="0">
                <thead>
                    <tr>
                        <th colSpan='1'>Affective Domain</th>
                        <th colSpan='1'>5</th>
                        <th colSpan='1'>4</th>
                        <th colSpan='1'>3</th>
                        <th colSpan='1'>2</th>
                        <th colSpan='1'>1</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map(item => {
                            return (
                                <tr>

                                    <td>{item.attribute}</td>
                                    <td >{item?.value === '5' && <i className="fas fa-fw fa-check"></i>}</td>
                                    <td>{item?.value === '4' && <i className="fas fa-fw fa-check"></i>}</td>
                                    <td >{item?.value === '3' && <i className="fas fa-fw fa-check"></i>}</td>
                                    <td >{item?.value === '2' && <i className="fas fa-fw fa-check"></i>}</td>
                                    <td >{item?.value === '1' && <i className="fas fa-fw fa-check"></i>}</td>

                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>
    )
}

export default PsychomotoPerformance