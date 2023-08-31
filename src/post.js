import React,{useState,useEffect} from 'react';
import './post.css'
import I2 from "./i2.jfif"
import Moment from "react-moment";
import { db } from './firebase';
import Avator from "@material-ui/core/Avatar";
import FavoriteBorderSharpIcon from '@material-ui/icons/FavoriteBorderSharp';
import { collection, getDocs,setDoc ,doc,addDoc, serverTimestamp, orderBy, onSnapshot, query, deleteDoc} from 'firebase/firestore';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SendIcon from '@mui/icons-material/Send';
import { useUserContext } from './UserContext';
function Post({username,userimage,caption,id}) {
  const user=useUserContext();
  const[comments, setComments] = useState([]);
  const[comment, setComment] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
    // Populate the likes
    useEffect(
      () =>
        onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
          setLikes(snapshot.docs)
        ),
      [db, id]
    );
  
    // Get if the user has liked the post every time the 'likes' changes
    useEffect(
      () =>
        setHasLiked(
          likes.findIndex((like) => like.id === user?.uid) !== -1
        ),
      [likes]
    );
  
    const likePost = async () => {
      if (hasLiked) {
        await deleteDoc(doc(db, "posts", id, "likes", user.uid));
      } else {
        await setDoc(doc(db, "posts", id, "likes", user.uid), {
          userName:user.uid,
        });
      }
    };

  const toggleShowAllComments = () => {
      setShowAllComments(!showAllComments);
  };
  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment('');
    
    await addDoc(collection(db, "posts", id, "comments"), {
        userid:user.email,
        comment: commentToSend,
        timestamp: serverTimestamp()
    })
    console.log("done")
}
  const handleClick = () => {
    // 👇️ toggle
    setIsActive(current => !current);

    // 👇️ or set to true
    // setIsActive(true);
  };

  useEffect(() => 
  onSnapshot(
      query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
      ),
      (snapshot) => setComments(snapshot.docs)
  )
, [db, id]);

  return (

    <div className="post">
        <div className="post-container">

            <div className="post-header">
              <div className='user_info'>
                <Avator/>
                <span className="username">{username}</span>
              </div> 

              <div>
                ...
              </div>

            </div>
            <div className="post-main">
                <img src={userimage}  alt="Post" className="post-image" />
            </div>
            <div className="post-actions">
                   <div className="likes-section">
                    <div className='like_icons'>
                    <span className="like-icon">{
        hasLiked ? <FavoriteIcon onClick={likePost} style={{color:'red'}}/> :<FavoriteBorderSharpIcon onClick={likePost}/>
      } </span>
                    <SendIcon/>
                    </div>

                    <span className="like-count"> {likes.length} like{likes.length === 1 ? "" : "s"}</span>
                </div>
                <div className="post-comments">
                {comments.length > 0 && (
                    <div className="comments-section">
                        <h3>Comments:</h3>
                        {showAllComments
                            ? comments.map((com) => (
                                <p className="comment">
                                  <p style={{padding:'2px'}}>{com.data()?.userid}</p>
                                  {com.data()?.comment}
                                 <span>
                              {<Moment fromNow className="comment_moment">
                            {com.data().timestamp?.toDate()}
                          </Moment>}
                          </span>
                                </p>
                            ))
                            : <p className="comment">
                              
                              <b style={{padding:'2px'}}>{comments[0].data()?.userid}</b>
                              {comments[0].data()?.comment}
                            
                             <span>
                              {<Moment fromNow className="comment_moment">
                            {comments[0].data()?.timestamp?.toDate()}
                          </Moment>}
                          </span>

                          </p>
                        }
                        {comments.length > 1 && (
                            <span className="show-more-button" onClick={toggleShowAllComments}>
                                {showAllComments ? "Show Less" : "Show More"}
                            </span>
                        )}
                    </div>
                )}
            </div>
                <form className="comment-section">
                    
                    <input  placeholder="Add a comment..." type="text" className="comment-input"  value={comment} onChange={(e)=>setComment(e.target.value)} />
                    <button 
                    type="submit" 
                    className="post-comment-button"
                    disabled={!comment.trim()} 
                   
                    onClick={sendComment}
                >Post</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Post