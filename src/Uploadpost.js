import React,{useState} from 'react'
import "./Uploadpost.css" 
import {storage} from "./firebase";
import {db} from "./firebase";
import { Firestore } from 'firebase/firestore';
import { collection, addDoc } from "firebase/firestore"; 
import {ref,uploadBytes,getDownloadURL } from "firebase/storage";
import Button from '@mui/material/Button';
import { useUserContext } from './UserContext';
function Uploadpost({handleClosefromchild}) {
  const [open, setopen] = useState(false);
 
  const user=useUserContext();
    const [image,setimage]=useState(null);
    const [process,setprocess]=useState(0);
    const [caption, setcaption] = useState('')
    const handlechange=(e)=>{
    }
    const handleupload=()=>{
      setopen(true);
      if(image==null) return;
console.log("reached here",user);
const imageref=ref(storage,`images/${image.name}`);
uploadBytes(imageref,image).then((snapshot)=>{
  setprocess((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

  alert("success ",user);  

  getDownloadURL(imageref)
  .then((url) => {
    const setdata=async ()=>{
      const docRef = await addDoc(collection(db,"posts"),{
          caption:caption,
          usename:user.email,
          userurl:url,
          userimage:user.photoURL,
       } )
    }
    setdata();

  });
  setcaption("");
  setimage(null);
  handleClosefromchild(false);
 
});
  


    }
  return (
      <div className="post-upload-container">
            <h2>Upload Post</h2>
            <div className="upload-form">
                <input
                    type="file"
                    accept="image/*"
                    onChange={(event)=>{setimage(event.target.files[0])}}
                />
                <input
                    type="text"
                    className="caption-input"
                    placeholder="Add a caption..."
                    value={caption}
                    onChange={e=>setcaption(e.target.value)}
                />
                <button
                    className="upload-button"
                    disabled={!image || !caption.trim()}
                    onClick={handleupload}
                >
                  
                    Upload
                </button>
            </div>
        </div>
 
  )
}

export default Uploadpost
