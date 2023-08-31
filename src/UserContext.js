import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from './firebase'; // Import your Firebase instance
import { onAuthStateChanged } from 'firebase/auth';
const UserContext = createContext();

export const useUserContext = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [user, setuser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {   
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
             setuser(user);
              // ...
              
            } else {
              // User is signed out
              // ...
            }
          });
          

        return () => unsubscribe();
    }, []);







    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
};
