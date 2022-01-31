import React, { useState, useEffect } from 'react';


function InputScores({ score, scores, setScores, i }) {

  const [firstTest, setFirstTest] = useState(score.CA.first)
  const [secondTest, setSecondTest] = useState(score.CA.second)
  const [testTotal, setTestTotal] = useState(score.CA.total)
  const [exam, setExam] = useState(score.exam)
  const [total, setTotal] = useState(score.total)
  const [grade, setGrade] = useState(score.grade)
  const [remark, setRemark] = useState(score.remark)
  const [subjectPosition, setSubjectPositon] = useState('')
  const [compute, setCompute] = useState()



  const computeTestTotal = () => {
    const sum = firstTest + secondTest
    setTestTotal(sum)

  }


  useEffect(() => {

    setTotal(testTotal + exam)

  }, [testTotal,exam])


  useEffect(() => {

    if (total === 0) {
      return
    }

  if (total > 84.9) {
      setGrade('A')
      setRemark('Excellent')
  } else if (total > 74.9 && total < 85) {
      setGrade('B')
      setRemark('Very Good')

    } else if (total > 59.9 && total < 75) {
      setGrade('C')
      setRemark('Good')
 
    } else if (total > 49.9 && total < 60) {
      setGrade('D')
      setRemark('Pass')


    } else if (total > 0 && total < 50) {
      setGrade('F')
      setRemark('Fail')
    }


  }, [total])

  useEffect(() => {

    const set = scores

    set[i].CA.first = firstTest
    set[i].CA.second = secondTest
    set[i].CA.total = testTotal
    set[i].exam = exam
    set[i].total = total
    set[i].grade = grade
    set[i].remark = remark
    setScores(set)

  }, [remark,total])


  return (

    <tr key={i}>
      <td>{score.subject}</td>

      <td><input
        type="number"
        placeholder="First C.A"
        onChange={(e) => setFirstTest(Number(e.target.value))}
        onBlur={computeTestTotal}
        value={firstTest}

      />
      </td>
      <td>   <input
        type="number"
        placeholder="Second C.A"
        onChange={(e) => setSecondTest(Number(e.target.value))}
        onBlur={computeTestTotal}
        value={secondTest}

      />
      </td>
      <td>
        {testTotal}
      </td>

      <td>
        <input
          type="number"
          placeholder="Exam Score"
          onChange={(e) => setExam(Number(e.target.value))}
          onBlur={(e) => setTotal(testTotal + exam)}
          value={exam}

        />
      </td>
      <td>
        {total}
      </td>
      <td>
        {grade}
      </td>
      <td>
        {remark}
      </td>
    </tr>
  )

}


export default InputScores


