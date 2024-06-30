import "./profile.css"
import React, { useEffect, useState } from 'react'
import Topbar from '../../components/Topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import axios from "axios"
import { useParams } from "react-router"

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_URL;
  const [user , setUser] = useState({});
  const username = useParams().username;
  useEffect(()=>{
    const fetchUser = async () =>{ 
      try {
        const res = await axios.get(`http://localhost:8800/api/users?username=${username}`);
        setUser(res.data);
      } catch (error) {
        console.log("Error fetching posts in post:", error);
      }
    }
    fetchUser();
  },[username])

  return (
    <>
    <Topbar/>
    <div className="profile">
    <Sidebar/>
    <div className="profileRight">
        <div className="profileRightTop">
            <div className="profileCover">
            <img className = "profileCoverImg" src=
            {
              user.coverPicture
                ? PF + user.coverPicture
                : PF + "no_cover.jpg"
            }
             alt="" />
            <img className = "profileUserImg" src=
            {
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "no_avatar.png"
            }
             alt="" />
            </div>
        </div>
        <div className="profileInfo">
            <h4 className="profileInfoName">{user.username}</h4>
            <span className="profileInfoDesc">{user.desc}</span>
        </div>
        <div className="profileRightBottom">
        <Feed username={username}/>
        <Rightbar user = {user}/>
        </div>
    </div>
    </div>
    </>
  )
}
