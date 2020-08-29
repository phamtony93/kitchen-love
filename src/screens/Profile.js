import React from 'react'
import { Image } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const Profile = () => {
    let profile = JSON.parse(localStorage.getItem("profile"))
    console.log(profile.photoUrl)
    return (
        <div className="mt-4">
            <Image className="my-2" roundedCircle src={profile.photoUrl} style={{height: "200px"}}/>
            <div>Name: {profile.displayName}</div>
            <div className="my-2">Email: {profile.email}</div>
        </div>
    )
}

export default Profile