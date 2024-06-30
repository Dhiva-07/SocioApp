import Share from "../share/Share"
import "./feed.css"
import Post from "../post/Post"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { AuthContext } from "../../context/AuthContext"

export default function Feed({username}) {
  const [posts,setPosts] = useState([]);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => { 
      try {
        const res = username
        ? await axios.get("http://localhost:8800/api/posts/profile/" + username)
        : await axios.get("http://localhost:8800/api/posts/timeline/" + user._id);
        setPosts(res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        }));
      } catch (error) {
        console.log("Error fetching posts in feed :", error);
      }
    };
    fetchPosts();
  },[username , user._id])
  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share/>}
        {posts.map((p)=>(
          <Post key={p._id} post={p}/>
        ))}
      </div>
    </div>
  )
}
