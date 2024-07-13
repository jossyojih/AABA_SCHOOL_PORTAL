import React, { useState, useEffect } from 'react'
import './Result.css'
import ReportSheetSummary from './ReportSheetSummary'
import Loader from 'react-loader-spinner'

function ConfirmScores({ scores, setScores, total, setTotal, average, setAverage, nextStep, prevStep, setStep, data, setData, saveResult, grade, setGrade, scale, setScale, isLoading }) {

  useEffect(() => {
    const stdScores = scores.filter(x => x.total !== 0)
    setScores(stdScores)
    // If Nothing is inputed return
    const checkForInput = stdScores.map(score => score.total)
    if (!checkForInput[0]) {
      alert('No Input Detected')
      return setStep(1)
    }
    const score = stdScores.map(score => score.total).reduce((acc, x) => acc + x)

    setTotal(score)

  }, [])

  useEffect(() => {
    const subjectOffered = scores.filter(x => x.total !== 0)
    const getAverage = (total / subjectOffered.length).toFixed(1)
    setAverage(Number(getAverage))

  }, [total])

  useEffect(() => {

    if (average === 0) {
      return
    }

    if (average > 94.9) {
      setGrade('A+')
      setScale('Exceptional')
    } else if (average > 89.9 && average < 95) {
      setGrade('A')
      setScale('Distinction')
    } else if (average > 84.9 && average < 90) {
      setGrade('A-')
      setScale('Excellent')
    } else if (average > 79.9 && average < 85) {
      setGrade('B+')
      setScale('Very Good')
    } else if (average > 74.9 && average < 80) {
      setGrade('B')
      setScale('Upper Credit')
    } else if (average > 69.9 && average < 75) {
      setGrade('B-')
      setScale('Lower Credit')
    } else if (average > 64.9 && average < 70) {
      setGrade('C+')
      setScale('Good')
    } else if (average > 59.9 && average < 65) {
      setGrade('C')
      setScale('Fair')

    } else if (average > 49.9 && average < 60) {
      setGrade('C-')
      setScale('Pass')
    } else if (average > 44.9 && average < 50) {
      setGrade('D')
      setScale('Poor')

    } else if (average > 0 && average < 45) {
      setGrade('F')
      setScale('Fail')
    }


  }, [average])


  return (
    <div className='computeResult'>
      <h1>Please Confirm the Data</h1>
      <div className='computeResult_displayResult'>
        <table className="table table-bordered" id="dataTable" width="80%" cellSpacing="0">
          <thead>
            <tr>
              <th>Subject</th>
              {
                data?.student?.section === "Secondary" && <>
                  <th>Notebook</th>
                  <th>Assignment</th>
                </>
              }
              <th>Test</th><th>exam</th><th>average</th><th>Grade</th><th>Remarks</th>
            </tr>

          </thead>
          <tbody>
            {scores?.map((score, i) => {
              return (
                <tr key={i}>
                  <td>
                    {score.subject}
                  </td>
                  {
                    data?.student?.section === "Secondary" &&
                    <>
                      <td>
                        {score.notebook}
                      </td>
                      <td>
                        {score.assignment}
                      </td>
                    </>
                  }
                  <td>
                    {score.CA.total}
                  </td>
                  <td>
                    {score.exam}
                  </td>
                  <td>
                    {score.total}
                  </td>
                  <td>
                    {score.grade}
                  </td>
                  <td>
                    {score.remark}
                  </td>
                </tr>
              )
            }
            )}
          </tbody>
        </table>
        <div className='computeResult_displayResult_reportSummary'>
          <ReportSheetSummary
            scores={scores}
            total={total}
            average={average}
            grade={grade}
            scale={scale}
          />
        </div>
      </div>
      <div className='confirmBtn'>
        <button onClick={prevStep} className='btn btn-primary btn-block mr-3'>Go Back</button>
        <button onClick={nextStep} className='btn btn-primary btn-block mr-3'>Add Subject</button>
        {isLoading ? <button className='btn btn-primary btn-block'> <Loader type="TailSpin" color="#00BFFF" height={20} width={20} /> </button> :
          <button onClick={(e) => saveResult(e)} className='btn btn-primary btn-block'>Submit</button>
        }
      </div>


    </div>
  )
}

export default ConfirmScores
