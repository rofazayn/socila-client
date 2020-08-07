import React from 'react';
import { Styled } from './style';
import Wrapper from '../Wrapper';
// import { Switch } from "react-router-dom";
import SearchBar from '../SearchBar';
import TrendingList from '../TrendingList';

const Sidebar = () => {
  return (
    <Styled.Sidebar>
      <Wrapper>
        <SearchBar />
        {/* <Switch><Route path="/" component={} /></Switch> */}
        <TrendingList />
      </Wrapper>
    </Styled.Sidebar>
  );
};

export default Sidebar;
