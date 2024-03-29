import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import './Student.css'
import Loader from 'react-loader-spinner'
import { useHistory, Link } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import { HOST_URL } from '../../config'
import { useQuery } from 'react-query'
import StdPortalNav from '../navbar/StdPortalNav';

const fetchStudentProfile = async (key, id) => {
    const res = await fetch(`${HOST_URL}/api/users/single-student/${id}`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
    })
    return res.json();
}


function StudentProfile() {
    const [{ user }, dispatch] = useStateValue()
    const history = useHistory()
    const { id } = useParams()
    const [profile, setProfile] = useState([])
    const [subjects, setSubject] = useState([])
    const [image, setImage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    // React query fecth data
    const { data, status } = useQuery(['StudentProfile', id], fetchStudentProfile)

    useEffect(() => {

        // localStorage.setItem("route", `/studentportal/studentprofile/${id}`)
    }, [])


    useEffect(() => {

        if (!data) return
        setProfile(data.student)

    }, [data])


    useEffect(() => {
        if (!image) return

        setIsLoading(true)
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "instaclone")
        data.append("cloud_name", "jossyjoe")
        fetch("https://api.cloudinary.com/v1_1/jossyjoe/image/upload", {
            method: "post",
            body: data
        })
            .then(res => res.json())
            .then(data => {

                fetch(`${HOST_URL}/api/admin/update-student-photo/${id}`, {
                    method: 'put',
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("jwt")
                    },
                    body: JSON.stringify({

                        imgUrl: data.url,
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        setProfile(data.data)
                        setIsLoading(false)

                    })
                    .catch(err => console.log(err));


            })
            .catch(err => {
                console.log(err)
            })


    }, [image])

    const updatePic = (e, file) => {
        e.preventDefault()
        setImage(file)

    }

    return (
        <div className='profile' >
            <StdPortalNav id={id} />

            {
                status === 'loading' ?
                    <div className="alert alert-primary" role="alert" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Loader type="TailSpin" color="#FFF" height={20} width={20} /> <span style={{ marginLeft: '1rem' }}> Loading... Please wait</span>
                    </div> :

                    <div className='profile_top'>

                        <div className='profile_image'>
                            {
                                isLoading ? <div ><img src={profile?.photo} alt='' /><Loader className='loader' type="TailSpin" color="#00BFFF" height={40} width={40} /> </div> :
                                    <img src={profile?.photo} alt='' />
                            }

                            {user?.role === 'admin' &&
                                <>
                                    <input type="file" accept="image/*" id="input" onChange={e => updatePic(e, e.target.files[0])} />
                                    <div className="label">
                                        <label className="image-upload" htmlFor="input">
                                            <i className="fas fa-fw fa-camera"></i>
                                            {/* <FontAwesomeIcon icon={faCamera} className='addphoto_icon'/> */}
                                        </label>
                                    </div>
                                </>
                            }


                        </div>
                        <div className='profile_details'>
                            <div className='profile_details_name'>
                                <h4>{profile?.firstname} {profile?.lastname} {profile?.middlename}</h4>
                                {(user?.role === 'admin' || user?.role === 'super-admin') &&
                                    <i className="fas fa-fw fa-user-edit" onClick={() => history.push(`/adminportal/studentprofileupdate/${profile._id}`)}></i>}
                                {/* <FontAwesomeIcon icon={faUserEdit} className='addphoto_icon'/> */}

                            </div>
                            <h5>Sex: {profile?.sex}</h5>
                            <h5>Section: {profile?.section}</h5>
                            <h5>Class: {profile?.stdClass}</h5>
                            <h5>StateOfOrigin: {profile?.stateOfOrigin}</h5>
                        </div>
                    </div>
            }
        </div>
    );
}

export default StudentProfile;
