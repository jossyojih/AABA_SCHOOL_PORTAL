import React, { useState, useEffect } from 'react'

function AffectiveDomain({ result }) {
    const [data, setData] = useState()

    useEffect(() => {
        setData(result.psychomoto)
    }, [result])

    return (
        <div className='affectiveDomain'>
            <table className="table table-bordered gradeAnalysis right" id="dataTable" cellSpacing="0">
                <thead >
                    <tr >
                        <th colSpan='1'>AFFECTIVE DOMAIN</th>
                        <th colSpan='1'>5</th>
                        <th colSpan='1'>4</th>
                        <th colSpan='1'>3</th>
                        <th colSpan='1'>2</th>
                        <th colSpan='1'>1</th>
                    </tr>
                </thead>
                <tbody>

                    <tr>

                        <td>Attentiveness</td>
                        <td >{data?.attentiveness === '5' && <i className="fas fa-fw fa-check"></i>}</td>
                        <td>{data?.attentiveness === '4' && <i className="fas fa-fw fa-check"></i>}</td>
                        <td >{data?.attentiveness === '3' && <i className="fas fa-fw fa-check"></i>}</td>
                        <td >{data?.attentiveness === '2' && <i className="fas fa-fw fa-check"></i>}</td>
                        <td >{data?.attentiveness === '1' && <i className="fas fa-fw fa-check"></i>}</td>

                    </tr>
                    <tr>
                        <td>Honesty</td>
                        <td >{data?.honesty === '5' && <i className="fas fa-fw fa-check"></i>}</td>
                        <td>{data?.honesty === '4' && <i className="fas fa-fw fa-check"></i>}</td>
                        <td >{data?.honesty === '3' && <i className="fas fa-fw fa-check"></i>}</td>
                        <td >{data?.honesty === '2' && <i className="fas fa-fw fa-check"></i>}</td>
                        <td >{data?.honesty === '1' && <i className="fas fa-fw fa-check"></i>}</td>
                    </tr>
                    <tr>
                        <td>Neatness</td>
                        <td >{data?.neatness === '5' && <i className="fas fa-fw fa-check"></i>}</td>
                        <td>{data?.neatness === '4' && <i className="fas fa-fw fa-check"></i>}</td>
                        <td >{data?.neatness === '3' && <i className="fas fa-fw fa-check"></i>}</td>
                        <td >{data?.neatness === '2' && <i className="fas fa-fw fa-check"></i>}</td>
                        <td >{data?.neatness === '1' && <i className="fas fa-fw fa-check"></i>}</td>
                    </tr>
                    <tr>
                        <td>Politeness</td>
                        <td >{data?.politeness === '5' && <i className="fas fa-fw fa-check"></i>}</td>
                        <td>{data?.politeness === '4' && <i className="fas fa-fw fa-check"></i>}</td>
                        <td >{data?.politeness === '3' && <i className="fas fa-fw fa-check"></i>}</td>
                        <td >{data?.politeness === '2' && <i className="fas fa-fw fa-check"></i>}</td>
                        <td >{data?.politeness === '1' && <i className="fas fa-fw fa-check"></i>}</td>
                    </tr>
                    <tr>
                        <td>Punctuality/Assembly</td>
                        <td >{data?.punctuality === '5' && <i className="fas fa-fw fa-check"></i>}</td>
                        <td>{data?.punctuality === '4' && <i className="fas fa-fw fa-check"></i>}</td>
                        <td >{data?.punctuality === '3' && <i className="fas fa-fw fa-check"></i>}</td>
                        <td >{data?.punctuality === '2' && <i className="fas fa-fw fa-check"></i>}</td>
                        <td >{data?.punctuality === '1' && <i className="fas fa-fw fa-check"></i>}</td>
                    </tr>
                    <tr>
                        <td>Self-Control/Calmness</td>
                        <td >{data?.selfControl === '5' && <i className="fas fa-fw fa-check"></i>}</td>
                        <td>{data?.selfControl === '4' && <i className="fas fa-fw fa-check"></i>}</td>
                        <td >{data?.selfControl === '3' && <i className="fas fa-fw fa-check"></i>}</td>
                        <td >{data?.selfControl === '2' && <i className="fas fa-fw fa-check"></i>}</td>
                        <td >{data?.selfControl === '1' && <i className="fas fa-fw fa-check"></i>}</td>
                    </tr>
                    <tr>
                        <td>Obedience</td>
                        <td >{data?.obedience === '5' && <i className="fas fa-fw fa-check"></i>}</td>
                        <td>{data?.obedience === '4' && <i className="fas fa-fw fa-check"></i>}</td>
                        <td >{data?.obedience === '3' && <i className="fas fa-fw fa-check"></i>}</td>
                        <td >{data?.obedience === '2' && <i className="fas fa-fw fa-check"></i>}</td>
                        <td >{data?.obedience === '1' && <i className="fas fa-fw fa-check"></i>}</td>
                    </tr>
                    <tr>
                        <td>Reliability</td>
                        <td >{data?.reliability === '5' && <i className="fas fa-fw fa-check"></i>}</td>
                        <td>{data?.reliability === '4' && <i className="fas fa-fw fa-check"></i>}</td>
                        <td >{data?.reliability === '3' && <i className="fas fa-fw fa-check"></i>}</td>
                        <td >{data?.reliability === '2' && <i className="fas fa-fw fa-check"></i>}</td>
                        <td >{data?.reliability === '1' && <i className="fas fa-fw fa-check"></i>}</td>
                    </tr>
                    <tr>
                        <td>Sense of Responsibilty</td>
                        <td >{data?.responsibility === '5' && <i className="fas fa-fw fa-check"></i>}</td>
                        <td>{data?.responsibility === '4' && <i className="fas fa-fw fa-check"></i>}</td>
                        <td >{data?.responsibility === '3' && <i className="fas fa-fw fa-check"></i>}</td>
                        <td >{data?.responsibility === '2' && <i className="fas fa-fw fa-check"></i>}</td>
                        <td >{data?.responsibility === '1' && <i className="fas fa-fw fa-check"></i>}</td>
                    </tr>
                    <tr>
                        <td>Relationship with Others</td>
                        <td >{data?.relationship === '5' && <i className="fas fa-fw fa-check"></i>}</td>
                        <td>{data?.relationship === '4' && <i className="fas fa-fw fa-check"></i>}</td>
                        <td >{data?.relationship === '3' && <i className="fas fa-fw fa-check"></i>}</td>
                        <td >{data?.relationship === '2' && <i className="fas fa-fw fa-check"></i>}</td>
                        <td >{data?.relationship === '1' && <i className="fas fa-fw fa-check"></i>}</td>
                    </tr>


                </tbody>
            </table>
        </div>
    )
}

export default AffectiveDomain
