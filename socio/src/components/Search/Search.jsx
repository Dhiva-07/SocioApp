import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./search.css";
export default function Search() {
  const [users, setUsers] = useState([]);
  const location = useLocation();
  const PF = process.env.REACT_APP_PUBLIC_URL;
  const query = new URLSearchParams(location.search).get("query");
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/users/search?query=${query}`);
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (query) {
      fetchUsers();
    }
  }, [query]);

  return (
    <div className="searchResults">
      <h2>Search Results</h2>
      <ul className="userList">
        {users.map((user) => (
          <li key={user._id}>
            <Link to={`/profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "no_avatar.png"
                }
                alt=""
              />
              <span>{user.username}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
