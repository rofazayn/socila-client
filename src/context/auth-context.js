import React, { createContext, useState, useReducer } from 'react';
import { useEffect } from 'react';
import fb from '../firebase';
import userReducer from '../reducers/userReducer';
import { userTypes } from '../constants';
import { auth } from 'firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userDetails, userDetailsDispatch] = useReducer(userReducer, null);

  useEffect(() => {
    console.log(userDetails);
  }, [userDetails]);

  useEffect(() => {
    let unsubscribe;

    unsubscribe = auth().onAuthStateChanged((user) => {
      console.log(user);
    });

    return () => {
      unsubscribe();
    };
  });

  useEffect(() => {
    const unsubscribeFromAuth = fb.auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        fb.firestore()
          .collection('users')
          .doc(user.uid)
          .onSnapshot((doc) => {
            if (doc.exists) {
              userDetailsDispatch({
                type: userTypes.SET_USER,
                payload: doc.data(),
              });
            }
          });
        fb.firestore()
          .collection('likes')
          .where('userId', '==', user.uid)
          .onSnapshot((likes) => {
            let userLikes = [];
            likes.forEach((like) =>
              userLikes.push({ likeId: like.id, ...like.data() })
            );
            return userDetailsDispatch({
              type: userTypes.SET_USER_LIKES,
              payload: userLikes,
            });
          });
        fb.firestore()
          .collection('users')
          .doc(user.uid)
          .collection('following')
          .onSnapshot((users) => {
            let usersFollowing = [];
            users.forEach((user) => usersFollowing.push(user.data()));
            return userDetailsDispatch({
              type: userTypes.SET_USER_FOLLOWING,
              payload: usersFollowing,
            });
          });
      } else {
        setCurrentUser(false);
        userDetailsDispatch({ type: userTypes.CLEAR_USER, payload: false });
      }
    });
    return () => unsubscribeFromAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userDetails,
        userDetailsDispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
