
import React, { useState, useEffect, useRef } from 'react';
import ResultData from './ResultData';
import html2pdf from 'html2pdf.js';
import Loader from 'react-loader-spinner'
import SelectClass from '../../../components/SelectClass';
import { useQuery } from 'react-query'
import { HOST_URL } from '../../../config'

const fetchStudentList = async (key, stdClass) => {
    if (!stdClass) return
    const res = await fetch(`${HOST_URL}/api/admin/student-list/${stdClass}`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
    })
    return res.json();
}


const UploadResult = () => {
    const [stdList, setStdList] = useState([])
    const [message, setMessage] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [stdClass, setStdClass] = useState('');
    const [isDone, setIsDone] = useState(false);
    const ref = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(null)
    const [currentStudent, setCurrentStudent] = useState(null)

    // React query fecth data
    const { data, status } = useQuery(['StudentList', stdClass], fetchStudentList)

    useEffect(() => {
        if (!stdClass) return
        console.log(stdClass)
        if (!data) return
        // Staff list data from query

        setStdList(data)
    }, [data])

    const convertToPDF = async () => {

        try {
            console.log("Converting to Image");
            const input = ref.current;
            const options = {
                margin: 5,
                filename: 'generated.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait', width: 250, },
            };


            // Access the number of pages directly
            let pdfBlob = await html2pdf().from(input).set(options).toPdf().get('pdf');
            var totalPages = pdfBlob.internal.getNumberOfPages();
            if (totalPages > 1) {
                setIsDone(false)
                setCurrentIndex(prev => prev + 1)
                setMessage(prev => [...prev, { status: "text-danger", message: `${currentStudent?.firstname} ${currentStudent?.lastname} ${currentStudent?.middlename} result upload failed (2-page-error).` }])
            } else {

                pdfBlob = await html2pdf().from(input).set(options).toPdf().output('blob')

                console.log("Uploading to Cloudinary");
                const data = new FormData();
                data.append("file", pdfBlob, "generated.pdf");
                data.append("upload_preset", "instaclone")
                data.append("cloud_name", "jossyjoe")
                const res = await fetch("https://api.cloudinary.com/v1_1/jossyjoe/image/upload", {
                    method: "post",
                    body: data
                })

                console.log("Upload successful");

                const cloudData = await res.json();
                const url = cloudData.url;
                const newUrl = url.slice(0, -3) + 'png'
                console.log(newUrl)

                await fetch(`${HOST_URL}/api/staff/student-result-image`, {
                    method: 'put',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("jwt")
                    },
                    body: JSON.stringify({
                        id: currentStudent?._id,
                        resultId: currentStudent?._id,//This value is required but was not used on the backend.
                        resultImage: newUrl

                    })
                })
                setIsDone(false)
                setMessage(prev => [...prev, { status: "text-success", message: `${currentStudent?.firstname} ${currentStudent?.lastname} ${currentStudent?.middlename} result uploaded successfully.` }])
                setCurrentIndex(prev => prev + 1)
            }

        } catch (error) {
            console.error('Error during PDF conversion or upload:', error);
            setIsDone(false)
            setCurrentIndex(prev => prev + 1)
            setMessage(prev => [...prev, { status: "text-danger", message: `${currentStudent?.firstname} ${currentStudent?.lastname} ${currentStudent?.middlename} result uploaded failed (unknown-error).` }])
        }
    };

    const onSubmit = () => {
        setMessage([]);
        if (stdList.length === 0) {
            return alert("Please select a class to upload.");
        }
        if (!window.confirm(`Are you sure you want to upload ${stdClass} to the parents portal?`)) return;
        setIsLoading(true);
        setMessage(prev => [...prev, { status: "text-info", message: `${stdList.length} students result uploading` }]);
        setCurrentIndex(0);
    };

    useEffect(() => {
        if (currentIndex === null || currentIndex === "end") {
            return
        }
        if (currentIndex > stdList.length - 1) {
            setIsLoading(false)
            setMessage(prev => [...prev, { status: "text-info", message: `Result upload Done.` }])
            setIsDone(false)
            setStdList([])
            setCurrentStudent(null)
            setCurrentIndex("end")
            return
        }
        setCurrentStudent(stdList[currentIndex]);
    }, [currentIndex]);


    useEffect(() => {
        if (!isDone) return

        convertToPDF()
    }, [isDone])

    return (
        <>
            <div style={{ width: "50%", }}>
                <SelectClass section={''} stdClass={stdClass} setStdClass={setStdClass} isUpload={true} />
                {isLoading ? (
                    <button className="btn btn-primary btn-block">
                        <Loader type="TailSpin" color="#FFF" height={20} width={20} />
                        Uploading data please do not close the page. This may take several minute.
                    </button>
                ) : (<button onClick={onSubmit} disabled={isLoading} className="btn btn-primary btn-block mt-3 mb-5">
                    Submit
                </button>
                )}
            </div>
            {
                currentIndex !== null &&

                <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-around' }}>

                    <div ref={ref}>
                        <ResultData id={currentStudent?._id} setIsDone={setIsDone} />
                    </div>

                    <div>
                        {
                            message.map(item => (
                                <ul>
                                    <li className={item.status}>{item.message}</li>
                                </ul>
                            ))
                        }
                    </div>


                </div>
            }

        </>




    );
};

export default UploadResult;