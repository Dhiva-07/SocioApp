import "./share.css"
import { Cancel, EmojiEmotions, Label, PermMedia, Room } from "@mui/icons-material"
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Share() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_URL;
  const desc = useRef();
  const [file,setFile] = useState(null);
  const submitHandler = async (e)=>{
    e.preventDefault();
    const newPost = {
        userId : user._id,
        desc : desc.current.value
    }
    if (file) {
        const data = new FormData();
        const fileName = Date.now() + file.name;
        data.append("name", fileName);
        data.append("file", file);
        newPost.img = fileName;
        console.log(newPost);
        try {
          await axios.post("/upload", data);
          window.location.reload();
        } catch (err) {}
    }
    try{
        await axios.post("/posts" , newPost);
    }catch(err){

    }
  }

  return (
    <div className="share">
        <div className="shareWrapper">
            <div className="shareTop">
                <img src=
                {user.profilePicture
                ? PF + user.profilePicture
                : PF + "no_avatar.png"
                } 
                alt="" className="shareProfileImg" />
                <input placeholder={"Add Description"}
                 className="shareProfile"
                 ref = {desc}  
                />
            </div>
            <hr className="shareHr" />
            {file && (
            <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
            </div>
             )}
            <form className="shareBottom" onSubmit={submitHandler}>
                <div className="shareOptions">
                    <label htmlFor="file" className="shareOption">
                        <PermMedia className="shareIcon" id = "icon_1" />
                        <span className="shareOptionText">Photo or Video</span>
                        <input type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e)=>{
                            setFile(e.target.files[0]);
                        }} style={{display:"none"}} />
                    </label>
                    <div className="shareOption">
                        <Label className="shareIcon" id = "icon_2" />
                        <span className="shareOptionText">Tag</span>
                    </div>
                    <div className="shareOption">
                        <Room className="shareIcon" id = "icon_3" />
                        <span className="shareOptionText">Location</span>
                    </div>
                    <div className="shareOption">
                        <EmojiEmotions className="shareIcon" id = "icon_4" />
                        <span className="shareOptionText">Feelings</span>
                    </div>
                </div>
                <button className="shareButton" type="submit">Share</button>
            </form>
        </div>
    </div>
  )
}
