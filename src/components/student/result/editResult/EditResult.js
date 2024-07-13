import React, { useState, useEffect } from 'react';

import ConfirmScores from '../ConfirmScores'
import ComputeScores from '../ComputeScores';
import { useParams, useHistory } from 'react-router-dom'
import { HOST_URL } from '../../../../config'
import { useQuery, usePaginatedQuery } from 'react-query'
import AddSubject from './AddSubject';

const fetchStudentProfile = async (key, id) => {
  if (!id) return
  const res = await fetch(`${HOST_URL}/api/users/student-result/${id}`, {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("jwt")
    }
  })
  return res.json();
}

const EditResult = () => {
  const { id } = useParams()
  const [step, setStep] = useState(1)
  const [studentData, setStudentData] = useState({})
  const [scores, setScores] = useState([])
  const [total, setTotal] = useState(null)
  const [average, setAverage] = useState(null)
  const [grade, setGrade] = useState(null)
  const [scale, setScale] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory()

  // React query fecth data
  const { data, status } = useQuery(['StudentProfile', id], fetchStudentProfile)

  useEffect(() => {

    if (!data) return
    const result = {
      resultId: data.result?._id,
      Id: data.stdDetails?._id,
      firstname: data.stdDetails?.firstname,
      lastname: data.stdDetails?.lastname,
      year: data.result?.year,
      term: data.result?.term,
      class: data.stdDetails?.stdClass,
      section: data.stdDetails?.section
    }

    setStudentData(result)
    setScores(data.result?.scores)

  }, [data])

  useEffect(() => {
    console.log(scores)
  }, [scores])



  const nextStep = (e) => {
    e.preventDefault();
    setStep(step => step + 1)
  };

  // Go back to prev step
  const prevStep = (e) => {
    e.preventDefault();
    setStep(step => step - 1)
  };

  const saveResult = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const response = await fetch(`${HOST_URL}/api/staff/student-result`, {
      method: 'post',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        resultId: studentData.resultId,
        id: studentData.Id,
        scores,
        total,
        average,
        grade,
        scale,
        year: studentData.year,
        term: studentData.term,
        stdClass: studentData.class

      })
    })

    const data = await response.json()
    console.log(data)
    if (data.error) {
      setIsLoading(false)
      alert(data.error)
    } else {
      console.log(data)
      setIsLoading(false)
      alert('Result saved Succesfully')
      history.push(`/student/result/${id}`)
    }

  }
  return (step === 1) ? (
    <ComputeScores
      data={studentData}
      scores={scores}
      setScores={setScores}
      prevStep={prevStep}
      nextStep={nextStep}
    />
  ) : (step === 2) ?
    <ConfirmScores
      saveResult={saveResult}
      data={data}
      setData={data}
      scores={scores}
      setScores={setScores}
      total={total}
      setTotal={setTotal}
      average={average}
      setAverage={setAverage}
      grade={grade}
      setGrade={setGrade}
      scale={scale}
      setScale={setScale}
      isLoading={isLoading}
      nextStep={nextStep}
      prevStep={prevStep}
      setStep={setStep}
    // result={result}
    //setResult={setResult}
    /> : <AddSubject
      scores={scores}
      setScores={setScores}
      studentData={studentData}
      setStep={setStep}
    />




}

export default EditResult;