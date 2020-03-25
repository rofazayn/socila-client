import React from 'react';
import { Styled } from './style';
import TopBar from '../TopBar';
import { ReactComponent as UserIconSvg } from '../../assets/icons/bx-user.svg';
import { motion } from 'framer-motion';
import ProfileInfo from '../ProfileInfo';

const Profile = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Styled.Profile className='profile-page'>
        <TopBar title={'Profile'} icon={<UserIconSvg />} />
        <ProfileInfo />
        {/* <ProfileActions />
        <ProfileContent /> */}
      </Styled.Profile>
    </motion.div>
  );
};

export default Profile;
