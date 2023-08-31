import React  ,{useState} from 'react'
import { signInWithEmailAndPassword ,createUserWithEmailAndPassword} from "firebase/auth";
import "./login.css"
import {useNavigate} from "react-router-dom"
import {auth } from "./firebase";
function Login() {
   
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   
    const signIn = e => {
         alert("yes this is working")
        e.preventDefault();
         signInWithEmailAndPassword(auth,email, password)
            .then(auth => {
               if(auth){
                alert("success");
               }
            })
            .catch(error => alert(error.message))
    }
    const signup=e=>{
e.preventDefault();
createUserWithEmailAndPassword(auth,email,password).then(
    auth=>{
        
    }
).catch(error=>alert(error.meassage))

    }
  return (
    
    <div className='Login'>
      <div class="container">
    <div class="box">
        <a class="heading" href='/' ></a>
        <form class="login-form">
            <div class="field">
                <input id="username" type="name" placeholder="Phone number, username, or email" value={email} onChange={e => setEmail(e.target.value)}/>
                <label for="username">Phone number, username, or email </label>
            </div>
            <div class="field">
                <input id="password" type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)}/>
                <label for="password">Password</label>
            </div>
            <button class="login-button" title="login" type='submit' onClick={signIn} >Log In</button>
            <div class="separator">
                <div class="line"></div>
                <p>OR</p>
                <div class="line"></div>
            </div>
            <div class="other">
                <button class="fb-login-btn" type="button">
                    <i class="fa fa-facebook-official fb-icon"></i>
                    <span class="">Log in with Facebook</span>
                </button>
                <a class="forgot-password" href='/' >Forgot password?</a>
            </div>
        </form>
    </div>
    <div class="box">
        <p>Don't have an account? <button class="signup" onClick={signup}>Sign Up</button> </p>
    </div>
</div>
    </div>
  )
}

export default Login
