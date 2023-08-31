import React from 'react'
import "./stories.css"
function Storyy({img,userName}) {
    
  return (
    <div className="one_story">
    <img
      className="avatar"
      src={img}
      alt=""
    />
    <p className="user_name_story">{userName}</p>
  </div>
  )
}

export default Storyy