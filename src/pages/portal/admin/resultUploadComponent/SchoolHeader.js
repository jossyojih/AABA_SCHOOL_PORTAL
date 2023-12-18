import React from 'react'
import Logo from '../../../../assets/aabaLogo.jpg'

function SchoolHeader({ data }) {

    return (
        <div className='schoolHeader'>
            <div className='schoolHeader_header'>
                <img src={Logo} alt='logo' className='logo' />
                <div className='schoolHeader_schoolName'>
                    <h1>AABA MEMORIAL SCHOOL</h1>
                    <h6><span>motto:</span> Learning For Service</h6>
                    <p>Plot 2D Gibson Jalo Way, Army Barracks Road
                        Jimeta-Yola, Adamawa State</p>
                    <p>Tel: 09134445086, 09134445087</p>
                    <p>Website: <span>www.aabaschool.com
                    </span></p>

                    {/* <p>Email: <span>info@qualisroyalacademy.com</span></p> */}
                </div>
                {
                    data.photo !== "https://res.cloudinary.com/jossyjoe/image/upload/v1606258324/UserIcon_tmu1v6.jpg" ?
                        <img src={data?.photo} alt='student img' className='studentPhoto' /> :
                        <div className='studentPhoto'></div>
                }

            </div>
        </div>
    )
}

export default SchoolHeader
