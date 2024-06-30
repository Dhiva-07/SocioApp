import "./sidebar.css"
import Friend from "../Friend/Friend"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
export default function Sidebar() {
  const [followings, setFollowings] = useState([]);
  const [followers, setFollowers] = useState([]);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if(user && user._id){
    const getFollowings = async () => {
      try {
        const friendList = await axios.get(`http://localhost:8800/api/users/followings/${user._id}`);
        setFollowings(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFollowings();
   }
  }, [user]);
  useEffect(() => {
    if(user && user._id){
    const getFollowers = async () => {
      try {
        const friendList = await axios.get(`http://localhost:8800/api/users/followers/${user._id}`);
        setFollowers(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFollowers();
   }
  }, [user]);
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <h3 className="sidebarHeading">User Friends : </h3>
        <ul className="sidebarFriendList">
          {followings.map((friend) => (
            <Link
            to={"/profile/" + friend.username}
            style={{ textDecoration: "none" }}
            key={friend._id}
            >
            <Friend key = {friend.id} user = {friend}/>
            </Link>
          ))}
          {followers.map((friend) => (
            <Link
            to={"/profile/" + friend.username}
            style={{ textDecoration: "none" }}
            key={friend._id}
            >
            <Friend key = {friend.id} user = {friend}/>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  )
}
