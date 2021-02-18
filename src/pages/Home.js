import React from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Videos from '../components/Videos/Videos';

const Home = ({toggleSidebar}) => {
  return (
    <div style={{ display: 'flex', width: '100%'}} onClick={toggleSidebar}>
      <Sidebar />
      <Videos/>
    </div>
  );
};

export default Home;
