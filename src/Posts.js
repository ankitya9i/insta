import React from 'react'
import {useState,useEffect} from 'react'
import { collection, getDocs } from "firebase/firestore"; 
import { db } from './firebase';
import Postme from "./post";
import Stories from './Stor';
import "./posts.css"
function Posts({user}) {
    const [posts, setpost] = useState([]);
    useEffect(()=>{
      const getposts=async()=>{
        const data=await getDocs(collection(db,"posts"));
        setpost(data.docs.map((doc)=>({
          ...doc.data(), id:doc.id
      })))
    
};
getposts();
console.log(posts);
},[]);
  return (
    <div className='userfeed'>
          <Stories/>
           {posts.map(post=>(
 <Postme key={post.id} username={post.usename} userimage={post.userurl} caption={post.caption} id={post.id}/>
      )
      )}
      
    </div>
  )
}

export default Posts
