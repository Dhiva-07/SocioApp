import { useContext, useState } from "react";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import "./topbar.css";

export default function Topbar() {
  const { user, dispatch } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_URL;
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
    navigate("/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      try {
        const res = await axios.get(`http://localhost:8800/api/users/search?query=${query}`);
        setSearchResults(res.data);
      } catch (err) {
        console.log(err);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleResultClick = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">ConnectEdge</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchicon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
            value={searchQuery}
            onChange={handleSearch}
          />
          {searchQuery && (
            <div className="searchDropdown">
              <ul className="searchResultsList">
                {searchResults.map((result) => (
                  <Link to={`/profile/${result.username}`} style={{ textDecoration: "none"}}>
                  <li key={result._id} onClick={handleResultClick}>
                      <img
                        src={
                          result.profilePicture
                            ? PF + result.profilePicture
                            : PF + "no_avatar.png"
                        }
                        alt=""
                        className="searchResultImg"
                      />
                      <span className="searchResultName">{result.username}</span>
                  </li>
                </Link>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarIcons">
        </div>
        <div className="topbarProfile" onClick={toggleDropdown}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "no_avatar.png"
            }
            alt=""
            className="topbarImg"
          />
          {dropdownOpen && (
            <div className="dropdownMenu">
              <Link to={`/profile/${user.username}`} className="dropdownItem">
                View Profile
              </Link>
              <span className="dropdownItem" onClick={handleLogout}>
                Logout
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
