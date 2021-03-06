import React from 'react';
import { Styled } from './style';
import TopBar from '../TopBar';
import { ReactComponent as HomeIconSvg } from '../../assets/icons/bx-home.svg';
// import Wrapper from '../Wrapper';
import { motion } from 'framer-motion';
import PostsList from '../PostsList';
import PostCreator from '../PostCreator';
import { useFetchPosts } from '../../hooks/usePosts';

const Home = () => {
  const { posts } = useFetchPosts();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Styled.Home className='home-page'>
        <TopBar title={`Home`} icon={<HomeIconSvg />} />
        <PostCreator />
        <PostsList posts={posts} />
      </Styled.Home>
    </motion.div>
  );
};

export default Home;
