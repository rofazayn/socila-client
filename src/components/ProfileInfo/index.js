import React, { useContext, useState, useEffect } from "react";
import { Styled } from "./style";
import { AuthContext } from "../../context/auth-context";
import {
  Typography,
  Button,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import { ReactComponent as EditIcon } from "../../assets/icons/bx-edit.svg";
import { ReactComponent as FollowIcon } from "../../assets/icons/bx-user-plus.svg";
import { ReactComponent as CameraIconSvg } from "../../assets/icons/bx-camera.svg";
import { ReactComponent as UserXIconSvg } from "../../assets/icons/bx-user-x.svg";
import { ReactComponent as GroupIconSvg } from "../../assets/icons/bx-group.svg";
import { ReactComponent as UserIconSvg } from "../../assets/icons/bx-user.svg";

import dayjs from "../../helpers/dayjs";
import Avatar from "../Avatar";
import CoverImage from "../CoverImage";
import AvatarChanger from "../AvatarChanger";
import CoverChanger from "../CoverChanger";
import { Formik } from "formik";
import useUser from "../../hooks/useUser";
import { firestore } from "../../firebase/index";
import CustomDialog from "../layout/CustomDialog";
import { Link, NavLink } from "react-router-dom";

const ProfileInfo = ({ user }) => {
  const { userDetails } = useContext(AuthContext);
  const { userActions } = useUser();

  const isCurrentUser = () => {
    if (user.userId === userDetails.userId) {
      return true;
    }

    return false;
  };

  const [openAvatarDialog, setOpenAvatarDialog] = useState(false);

  function handleAvatarClickOpen() {
    setOpenAvatarDialog(true);
  }

  const [openCoverDialog, setOpenCoverDialog] = useState(false);

  function handleCoverClickOpen() {
    setOpenCoverDialog(true);
  }

  const [isUserFollowed, setUserFollowed] = useState(false);

  useEffect(() => {
    function isUserFollowed() {
      if (
        userDetails.following &&
        userDetails.following.find((cUser) => cUser.followingId === user.userId)
      ) {
        return setUserFollowed(true);
      }
      return setUserFollowed(false);
    }

    isUserFollowed();
  }, [userDetails.following, userDetails.followingCount]);

  const handleFollow = (values) => {
    let isFollowing = isUserFollowed;
    if (!isFollowing) {
      return userActions.followUser(values.follower, values.following);
    }
    return userActions.unfollowUser(values.follower, values.following);
  };

  // Live followers & following updates
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {
    let userRef = firestore.collection("users").doc(user.userId);

    let subscribeToUser = null;

    subscribeToUser = userRef.onSnapshot((doc) => {
      setFollowersCount(doc.data().followerCount);
      setFollowingCount(doc.data().followingCount);
    });

    return () => subscribeToUser;
  }, []);

  const [openFollowersDialog, setOpenFollowersDialog] = useState(false);
  const [userFollowers, setUserFollowers] = useState([]);

  const fetchUserFollowers = () => {
    let userFollowersRef = firestore
      .collection("users")
      .doc(user.userId)
      .collection("followers")
      .limit(10);

    userFollowersRef
      .get()
      .then((snapshot) => {
        let fetchedFollowers = [];
        snapshot.docs.map(async (doc) => {
          let followerDetails = await firestore
            .collection("users")
            .doc(doc.data().followerId)
            .get()
            .then((doc) => {
              if (doc.exists) {
                return doc.data();
              }
              return;
            });
          fetchedFollowers.push(followerDetails);
        });
        setUserFollowers(fetchedFollowers);
      })
      .then(() => {
        setTimeout(() => setOpenFollowersDialog(true), 500);
      })
      .catch((err) => console.error(err));
  };

  const [openFollowingDialog, setOpenFollowingDialog] = useState(false);
  const [userFollowing, setUserFollowing] = useState([]);

  const fetchUserFollowing = () => {
    let userFollowingRef = firestore
      .collection("users")
      .doc(user.userId)
      .collection("following")
      .limit(10);

    userFollowingRef
      .get()
      .then((snapshot) => {
        let fetchedFollowing = [];
        snapshot.docs.map(async (doc) => {
          let followingDetails = await firestore
            .collection("users")
            .doc(doc.data().followingId)
            .get()
            .then((doc) => {
              if (doc.exists) {
                return doc.data();
              }
              return;
            });
          fetchedFollowing.push(followingDetails);
        });
        setUserFollowing(fetchedFollowing);
      })
      .then(() => {
        setTimeout(() => setOpenFollowingDialog(true), 500);
      })
      .catch((err) => console.error(err));
  };

  return (
    <Styled.ProfileInfo>
      <div className="profile-images">
        <div className="cover">
          <CoverImage imgUrl={user.coverImage || null} />
          {isCurrentUser() ? (
            <IconButton
              className="cover-change-button fancy-button"
              onClick={handleCoverClickOpen}
            >
              <CameraIconSvg />
            </IconButton>
          ) : null}
        </div>
        <div className="pic">
          <Avatar imgUrl={user.profileImage || null} size="96px" />
          {isCurrentUser() ? (
            <IconButton
              className="profile-change-button fancy-button"
              onClick={handleAvatarClickOpen}
            >
              <CameraIconSvg />
            </IconButton>
          ) : null}
        </div>
      </div>
      <div className="profile-details">
        <div className="info">
          <div className="name">
            <Typography variant="subtitle1" className="full-name">
              {user.fullName}
            </Typography>
            <Typography variant="body2" className="username">
              @{user.username}
            </Typography>
          </div>
          <div className="rest">
            <Typography variant="body2" className="joined">
              Joined <span>{dayjs(user.createdAt).format("MMM YYYY")}</span>
            </Typography>
          </div>
        </div>
        {user.bio && (
          <div className="bio">
            <Typography variant="body1" className="bio">
              {user.bio}
            </Typography>
          </div>
        )}
      </div>
      <div className="profile-actions">
        <div className="actions">
          {/* <NavLink to='/profile/' className='profile-link' exact> */}
          <Button className="fancy-button">Posts</Button>
          {/* </NavLink> */}
          {/* <NavLink to='/profile/followings' className='profile-link' exact> */}
          <Button
            className="fancy-button"
            onClick={() => {
              fetchUserFollowing();
            }}
          >
            <span className="count">{followingCount}</span> Following
          </Button>
          {/* </NavLink> */}

          {/* <NavLink to='/profile/followers' className='profile-link' exact> */}
          <Button
            className="fancy-button"
            onClick={() => {
              fetchUserFollowers();
            }}
          >
            <span className="count">{followersCount}</span> Followers
          </Button>
          {/* </NavLink> */}
        </div>
        {isCurrentUser() ? (
          <div className="actions edit-profile">
            <NavLink exact to="/profile/edit">
              <Button className="fancy-button" startIcon={<EditIcon />}>
                Edit my profile
              </Button>
            </NavLink>
          </div>
        ) : (
          <div className="actions edit-profile">
            <Formik
              initialValues={{
                follower: userDetails,
                following: user,
              }}
              onSubmit={handleFollow}
            >
              {({ values, handleSubmit, isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                  <input
                    type="hidden"
                    name="follower"
                    value={values.follower}
                  />
                  <input
                    type="hidden"
                    name="following"
                    value={values.following}
                  />
                  <Button
                    type="submit"
                    className={`fancy-button ${
                      isUserFollowed && "--following"
                    }`}
                    disabled={isSubmitting}
                    startIcon={
                      isSubmitting ? (
                        <CircularProgress size={18} />
                      ) : isUserFollowed ? (
                        <UserXIconSvg />
                      ) : (
                        <FollowIcon />
                      )
                    }
                  >
                    {isUserFollowed ? "Unfollow" : "Follow"}
                  </Button>
                </form>
              )}
            </Formik>
          </div>
        )}
      </div>
      <AvatarChanger
        openAvatarDialog={openAvatarDialog}
        setOpenAvatarDialog={setOpenAvatarDialog}
      />
      <CoverChanger
        openCoverDialog={openCoverDialog}
        setOpenCoverDialog={setOpenCoverDialog}
      />
      <CustomDialog
        icon={<GroupIconSvg />}
        title={`${user.firstName}'s followers.`}
        open={openFollowersDialog}
        setOpen={setOpenFollowersDialog}
        className="follow-dialog"
      >
        <div className="dialog-content">
          {userFollowers.length > 0
            ? userFollowers.map((follower) => (
                <li className="fancy-li" key={follower.userId}>
                  <div className="li-header">
                    <Avatar
                      imgUrl={follower.profileImage}
                      alt={`${follower.fullName}`}
                      size="56px"
                    />
                  </div>
                  <div className="li-content">
                    <Typography variant="body2" className="full-name">
                      {follower.fullName}
                    </Typography>
                    <Typography variant="body2" className="username">
                      @{follower.username}
                    </Typography>
                  </div>
                  <div className="li-footer">
                    <Link to={`/users/${follower.userId}`}>
                      <IconButton size="medium">
                        <UserIconSvg />
                      </IconButton>
                    </Link>
                  </div>
                </li>
              ))
            : "No followers at the moment!"}
        </div>
      </CustomDialog>

      <CustomDialog
        icon={<GroupIconSvg />}
        title={`${user.firstName}'s following.`}
        open={openFollowingDialog}
        setOpen={setOpenFollowingDialog}
        className="follow-dialog"
      >
        <div className="dialog-content">
          {userFollowing.length > 0
            ? userFollowing.map((following) => (
                <li className="fancy-li" key={following.userId}>
                  <div className="li-header">
                    <Avatar
                      imgUrl={following.profileImage}
                      alt={`${following.fullName}`}
                      size="56px"
                    />
                  </div>
                  <div className="li-content">
                    <Typography variant="body2" className="full-name">
                      {following.fullName}
                    </Typography>
                    <Typography variant="body2" className="username">
                      @{following.username}
                    </Typography>
                  </div>
                  <div className="li-footer">
                    <Link to={`/users/${following.userId}`}>
                      <IconButton size="medium">
                        <UserIconSvg />
                      </IconButton>
                    </Link>
                  </div>
                </li>
              ))
            : "No one is following at the moment!"}
        </div>
      </CustomDialog>
    </Styled.ProfileInfo>
  );
};

export default ProfileInfo;
