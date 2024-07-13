import React, { useState, useEffect } from 'react';


function InputScores({ score, scores, setScores, i, data }) {

  const [notebook, setNotebook] = useState(score.notebook)
  const [assignment, setAssignment] = useState(score.assignment)
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

    setTotal(notebook + assignment + testTotal + exam)

  }, [notebook, assignment, testTotal, exam])


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

    set[i].notebook = notebook
    set[i].assignment = assignment
    set[i].CA.first = firstTest
    set[i].CA.second = secondTest
    set[i].CA.total = testTotal
    set[i].exam = exam
    set[i].total = total
    set[i].grade = grade
    set[i].remark = remark
    setScores(set)

  }, [remark, total])


  return (

    <tr key={i}>
      <td>{score.subject}</td>
      {
        data.section === "Secondary" &&
        <>
          <td>
            <input
              type="number"
              placeholder="Notebook"
              onChange={(e) => setNotebook(Number(e.target.value))}
              onBlur={computeTestTotal}
              value={notebook}

            />
          </td>
          <td><input
            type="number"
            placeholder="Assignment"
            onChange={(e) => setAssignment(Number(e.target.value))}
            onBlur={computeTestTotal}
            value={assignment}

          />
          </td>
        </>
      }

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
          onBlur={(e) => setTotal(notebook + assignment + testTotal + exam)}
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


