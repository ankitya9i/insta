import React from 'react'
import "./extra.css"
import Avator from "@material-ui/core/Avatar";
import { useEffect } from 'react';
import { useState } from 'react';
import { faker } from '@faker-js/faker';
import { blue } from '@material-ui/core/colors';
import { useUserContext } from './UserContext';
function Extra() {
  const user=useUserContext();
  const [suggestions, setsuggestions] = useState([]);
  useEffect(() => {
      const suggestions = [...Array(5)].map((_, i) => ({
        avatar: faker.internet.avatar(),
        userName: faker.internet.userName(),
        id: i,
      }));
  
      setsuggestions(suggestions);
    }, []);
  return (
    <div className="user-section">
            <div className="user-profile">
            <li 
                        suggested_user
                        className='suggested_user_contain' >
                        <div className='user_info'>
                        <Avator src={user.photoURL}/>
                        <div className='user_name'>
                        
                        {user.email}
                        </div>

                        </div>
                        <div style={{color:'blue',
                          }}>
                          Switch
                        </div>
                        </li>
             
            </div>
            <div className="suggested-users">
                <h3>Suggested Users</h3>
                <ul>
                    {suggestions.map(user => (
                        <li 
                        suggested_user
                        className='suggested_user_contain' key={user.id}>
                        <div className='user_info'>
                        <Avator/>

                        <div className='user_name'>
                        <b>{user.userName}</b>
                        <span>suggested for you</span>
                        </div>

                        </div>
                        <div style={{color:'blue'}}>
                          follow
                        </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
  )
}

export default Extra
