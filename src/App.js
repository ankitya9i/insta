import React,{useEffect, useState} from 'react'
import { Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import { Link} from "react-router-dom";
import Posts from './Posts';
import './App.css';
import Login from "./Login"
import {onAuthStateChanged } from "firebase/auth";
import { doc } from 'firebase/firestore';
import { collection, getDocs } from "firebase/firestore"; 
import { db } from './firebase';
import Header from './Header';
import Uploadpost from './Uploadpost';
import {auth } from "./firebase";
import Extra from "./Extra"
import { useUserContext } from './UserContext';
function App() {
 const user = useUserContext();

if (user) {
  // If the user is logged in, render the router with routes
  return (
<Router>
    <div className="app">
      <Switch>
      <Route path="/Login">
          <Login/>
        </Route>
        <Route path="/Uploadpost">
          <Uploadpost/>
          </Route>
        <Route path="/">
          <div className='main'>
            <Header/>
           <Posts user={user}/>
           <Extra/>
          </div>

        </Route>
       
        </Switch>
      </div>
    </Router>
  );
} else {
  // If the user is not logged in, render the login page
  return <Login/>;
}
}

export default App;
