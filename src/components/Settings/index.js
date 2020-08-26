import React from 'react';
import { Styled } from './style';
import { Switch, Route, Redirect } from 'react-router-dom';
import TopBar from '../TopBar';
import { ReactComponent as CogIconSvg } from '../../assets/icons/bx-cog.svg';
import { motion } from 'framer-motion';
import { ReactComponent as SettingsIllustrationSvg } from '../../assets/svg/MeditatingDoodle.svg';
import EmailSettings from '../EmailSettings';
import UsernameSettings from '../UsernameSettings';

const Settings = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Styled.Settings className='settings-page'>
        <TopBar title={'Settings'} icon={<CogIconSvg />} />
        <div className='page-illustration'>
          <SettingsIllustrationSvg />
        </div>
        <Switch>
          <Route exact path='/settings/email' component={EmailSettings} />
          <Route exact path='/settings/username' component={UsernameSettings} />
          <Redirect to='/settings/email' />
        </Switch>
      </Styled.Settings>
    </motion.div>
  );
};

export default Settings;
