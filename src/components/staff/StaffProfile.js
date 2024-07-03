import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import { useHistory, Link } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import { HOST_URL } from '../../config'
import { useQuery, usePaginatedQuery } from 'react-query'

const fetchStudentProfile = async (key, id) => {
    if (!id) return
    const res = await fetch(`${HOST_URL}/api/staff/single-staff/${id}`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
    })
    return res.json();
}


function StaffProfile() {
    const [{ user }, dispatch] = useStateValue()
    const history = useHistory()
    const { id } = useParams()
    const [profile, setProfile] = useState([])
    const [subjects, setSubject] = useState([])
    const [image, setImage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    // React query fecth data
    const { data, status } = useQuery(['StaffProfile', id], fetchStudentProfile)

    useEffect(() => {

        if (!data) return
console.log(data)
        setProfile(data.staff)

    }, [data])


    useEffect(() => {
        if (!image) {
            return
        }
        else if (image)
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

                fetch(`http://localhost:5000/student/updatephoto/${id}`, {
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

                        setProfile(data)
                        setIsLoading(false)

                    })
                    .catch(err => console.log(err));


            })
            .catch(err => {
                console.log(err)
            })


    }, [image])

    const updatePic = file => {
        setImage(file)

    }

    return (
        <div className='profile' >

            <div className='profile_top'>

                <div className='profile_image'>
                    {
                        isLoading ? <div ><img src={profile?.photo} alt='' /><Loader className='loader' type="TailSpin" color="#00BFFF" height={40} width={40} /> </div> :
                            <img src={profile?.photo} alt='' />
                    }

                    {user?.role === 'admin' &&
                        <>
                            <input type="file" accept="image/*" id="input" onChange={e => updatePic(e.target.files[0])} />
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
                        {(user?.role === 'admin' || user?.role === 'super-admin') && <i className="fas fa-fw fa-user-edit" onClick={() => history.push(`/adminportal/staffprofileupdate/${profile.user._id}`)}></i>}
                        {/* <FontAwesomeIcon icon={faUserEdit} className='addphoto_icon'/> */}

                    </div>
                    <h5>Sex: {profile?.sex}</h5>
                    <h5>Phone: {profile?.phone}</h5>
                    <h5>Email: {profile?.email}</h5>
                    <h5>Class: {profile?.classTeacher}</h5>
                    <h5>StateOfOrigin: {profile?.stateOfOrigin}</h5>
                </div>
            </div>

        </div>
    );
}

export default StaffProfile;
