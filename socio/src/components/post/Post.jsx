import "./post.css"
import { MoreVert , FavoriteBorder , ThumbUpOffAlt , BookmarkBorderOutlined , DeleteSharp} from "@mui/icons-material"
import { useEffect, useState , useContext } from "react"
import axios from "axios"
import {format} from "timeago.js"
import {Link} from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";

export default function Post({post}) {
  const PF = process.env.REACT_APP_PUBLIC_URL;
  const [like , setLike] = useState(post.likes.length)
  const [isLiked , setisLiked] = useState(false)
  const [user , setUser] = useState({})
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setisLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(()=>{
    const fetchUser = async () =>{ 
      try {
        const res = await axios.get(`http://localhost:8800/api/users?userId=${post.userId}`);
        setUser(res.data);
      } catch (error) {
        console.log("Error fetching posts in post:", error);
      }
    }
    fetchUser();
  },[post.userId])
  
  const likeHandler =()=>{
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1)
    setisLiked(isLiked ? 0 : 1)
  }

  const deletePost = async () => {
    try {
      await axios.delete(`http://localhost:8800/api/posts/${post._id}`, {
        data: { userId: currentUser._id }, 
      });
      console.log("Post deleted successfully.");
      window.location.reload();
    } catch (err) {
      console.log("Error deleting post:", err);
    }
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
            <div className="postTopLeft">
              <Link to = {`profile/${user.username}`}>
                <img className = "postProfileImg" src={user.profilePicture ? PF + user.profilePicture : PF+"no_avatar.png"} alt = ""/>
              </Link>
                <span className="postUsername">{user.username}</span>
                <span className="postTime">{format(post.createdAt)}</span>
            </div>
            <div className="postTopRight">
              {currentUser._id === post.userId ? (
                <DeleteSharp onClick={deletePost} style = {{color : "red" , cursor : "pointer"}} className="deleteIcon"/>
                ) : 
                (
                  <></>
                )}
            </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.desc}</span>
          <img src={PF+post.img} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="bottomLeft">
            <FavoriteBorder onClick = {likeHandler} className="LikeIcon"/>
            <ThumbUpOffAlt onClick = {likeHandler} className="CommentIcon"/>
            <div className="LikeCounter">{like} likes</div>
          </div>
          <div className="bottomRight">
            <BookmarkBorderOutlined className="BookmarkIcon"/>
          </div>
        </div>
      </div>
    </div>
  )
}
