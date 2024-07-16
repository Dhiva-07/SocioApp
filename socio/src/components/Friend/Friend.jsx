import "./friend.css"
export default function Friend({user}) {
  const PF = process.env.REACT_APP_PUBLIC_URL;
  return (
    <li className="sidebarFriend">
        <img className="sidebarFriendImg" src={user.profilePicture 
        ? PF + user.profilePicture
        : PF + "no_avatar.png"
        } alt="" />
        <span className="sidebarFriendName">{user.username}</span>
    </li>
  )
}
