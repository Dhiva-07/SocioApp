import "./rightbar.css"
import {Users} from "../../dummydata"
import Online from "../online/Online"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {Add , Remove } from "@mui/icons-material"

export default function Rightbar({user}) {
const PF = process.env.REACT_APP_PUBLIC_URL;
const [followings, setFollowings] = useState([]);
const [followers, setFollowers] = useState([]);
const { user: currentUser, dispatch } = useContext(AuthContext);
const [followed, setFollowed] = useState(false);

useEffect(() => {
  setFollowed(currentUser.followings.includes(user?._id));
}, [currentUser, user]);

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
const handleClick = async () => {
  try {
    if (followed) {
      await axios.put(`http://localhost:8800/api/users/${user._id}/unfollow`, {
        userId: currentUser._id,
      });
      dispatch({ type: "UNFOLLOW", payload: user._id });
    } else {
      await axios.put(`http://localhost:8800/api/users/${user._id}/follow`, {
        userId: currentUser._id,
      });
      dispatch({ type: "FOLLOW", payload: user._id });
    }
    setFollowed(!followed);
  } catch (err) {
    console.log(err);
  }
};

  const HomeRightBar =()=>{
    return(
    <>
        <img className="rightbarAd" src="ad.png" alt="" />
    </>
    );
  };
  const ProfileRightBar =()=>{
    return(
      <>
      {user.username && user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
          {followed ? "Unfollow" : "Follow"}
          {followed ? <Remove /> : <Add />}
        </button>
        )}
      <h4 className="rightBarTitle">User Information</h4>
      <div className="rightBarInfo">
        <div className="rightBarInfoItem">
          <span className="rightBarInfoKey">City:</span>
          <span className="rightBarInfoValue">{user.city}</span>
        </div>
        <div className="rightBarInfoItem">
          <span className="rightBarInfoKey">From:</span>
          <span className="rightBarInfoValue">{user.from}</span>
        </div>
        <div className="rightBarInfoItem">
          <span className="rightBarInfoKey">Relationship:</span>
          <span className="rightBarInfoValue">
          {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : "-"}
          </span>
        </div>
      </div>
      {followings.length > 0 && (
        <>
      <h3 className="rightFriendTitle">FOLLOWING : </h3>
      <div className="rightBarFollowings">
      {followings.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
              key={friend._id}
            >
              <div className="rightBarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "no_avatar.png"
                  }
                  alt=""
                  className="rightBarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
      </div>
      </>
      )}
      {followers.length > 0 && (
  <>
    <h3 className="rightFriendTitle">FOLLOWERS :</h3>
    <div className="rightBarFollowings">
      {followers.map((friend) => (
        <Link
          to={"/profile/" + friend.username}
          style={{ textDecoration: "none" }}
          key={friend._id}
        >
          <div className="rightBarFollowing">
            <img
              src={
                friend.profilePicture
                  ? PF + friend.profilePicture
                  : PF + "no_avatar.png"
              }
              alt=""
              className="rightBarFollowingImg"
            />
            <span className="rightbarFollowingName">{friend.username}</span>
          </div>
        </Link>
      ))}
    </div>
  </>
)}
      </>
    )
  }
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user? <ProfileRightBar/> : <HomeRightBar/>}
      </div>
    </div>
  )
}
