import React from 'react'
import { Faker, faker } from '@faker-js/faker'
import { useEffect } from 'react';
import { useState } from 'react';
import Storyy from './Storyy';
import "./story.css"
function Stor() {
    const [suggestions, setSuggestions] = useState([]);
    useEffect(() => {
        const suggestions = [...Array(20)].map((_, i) => ({
          avatar: faker.internet.avatar(),
          userName: faker.internet.userName(),
          id: i,
        }));
    
        setSuggestions(suggestions);
      }, []);
    
  return (
    <div
    className="story"
  >
 
    {suggestions.map((profile) => (
      <Storyy
        key={profile.id}
        img={profile.avatar}
        userName={profile.userName}
      />
    ))}
  </div>
  )
}

export default Stor