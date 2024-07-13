import React, { useState, useEffect } from 'react';


function SecInputScores({ score, scores, setScores, i }) {

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

    }, [testTotal])



    useEffect(() => {

        if (total === 0) {
            return
        }

        if (total > 94.9) {
            setGrade('A+')
            setRemark('Exceptional')
        } else if (total > 89.9 && total < 95) {
            setGrade('A')
            setRemark('Distinction')
        } else if (total > 84.9 && total < 90) {
            setGrade('A-')
            setRemark('Excellent')
        } else if (total > 79.9 && total < 85) {
            setGrade('B+')
            setRemark('Very Good')
        } else if (total > 74.9 && total < 80) {
            setGrade('B')
            setRemark('Upper Credit')
        } else if (total > 69.9 && total < 75) {
            setGrade('B-')
            setRemark('Lower Credit')
        } else if (total > 64.9 && total < 70) {
            setGrade('C+')
            setRemark('Good')
        } else if (total > 59.9 && total < 65) {
            setGrade('C')
            setRemark('Fair')

        } else if (total > 49.9 && total < 60) {
            setGrade('C-')
            setRemark('Pass')
        } else if (total > 44.9 && total < 50) {
            setGrade('D')
            setRemark('Poor')

        } else if (total > 0 && total < 45) {
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

    }, [remark])




    return (

        <tr key={i}>
            <td>{score.subject}</td>

            <td><input
                type="number"
                className='sec-input'
                placeholder="First C.A"
                onChange={(e) => setFirstTest(Number(e.target.value))}
                onBlur={computeTestTotal}
                value={firstTest}

            />
            </td>
            <td>   <input
                type="number"
                className='sec-input'
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
                    className='sec-input'
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


export default SecInputScores


