import "./profile.css";
import React, { useEffect, useState } from 'react';
import Topbar from '../../components/Topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import axios from "axios";
import { useParams } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_URL;
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    profilePicture: "",
    coverPicture: "",
    city: "",
    from: "",
    relationship: "",
    desc: ""
  });
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/users?username=${username}`);
        setUser(res.data);
        setFormData({
          profilePicture: res.data.profilePicture || "",
          coverPicture: res.data.coverPicture || "",
          city: res.data.city || "",
          from: res.data.from || "",
          relationship: res.data.relationship || "",
          desc: res.data.desc || ""
        });
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [username]);

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleCloseClick = () => {
    setEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleSave = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("userId", user._id);
    formDataToSend.append("profilePicture", formData.profilePicture);
    formDataToSend.append("coverPicture", formData.coverPicture);
    formDataToSend.append("city", formData.city);
    formDataToSend.append("from", formData.from);
    formDataToSend.append("relationship", formData.relationship);
    formDataToSend.append("desc", formData.desc);

    try {
      await axios.put(`http://localhost:8800/api/users/${user._id}`, formData);
      window.location.reload();
    } catch (error) {
      console.log("Error updating user:", error);
    }
  };

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img className="profileCoverImg" src={user.coverPicture ? PF + user.coverPicture : PF + "no_cover.jpg"} alt="" />
              <img className="profileUserImg" src={user.profilePicture ? PF + user.profilePicture : PF + "no_avatar.png"} alt="" />
              {username === user.username && (
                <FontAwesomeIcon icon={faPencilAlt} className="editIcon" onClick={handleEditClick} />
              )}
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
      {editMode && (
        <div className="editSection">
          <FontAwesomeIcon icon={faTimes} className="closeIcon" onClick={handleCloseClick} />
          <div className="editItem">
            <label>Profile Picture:</label>
            <input type="file" name="profilePicture" onChange={handleChange} />
          </div>
          <div className="editItem">
            <label>Cover Picture:</label>
            <input type="file" name="coverPicture" onChange={handleChange} />
          </div>
          <div className="editItem">
            <label>City:</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} />
          </div>
          <div className="editItem">
            <label>From:</label>
            <input type="text" name="from" value={formData.from} onChange={handleChange} />
          </div>
          <div className="editItem">
            <label>Relationship:</label>
            <select name="relationship" value={formData.relationship} onChange={handleChange}>
              <option value="1">Single</option>
              <option value="2">Married</option>
              <option value="3">Other</option>
            </select>
          </div>
          <div className="editItem">
            <label>Description:</label>
            <input type="text" name="desc" value={formData.desc} onChange={handleChange} />
          </div>
          <button className="saveButton" onClick={handleSave}>Save</button>
        </div>
      )}
    </>
  );
}
