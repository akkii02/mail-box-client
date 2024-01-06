import React from 'react';
import Navbar from "../Header/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import Inbox from '../Inbox/Inbox';

const RootLayout = (props) => {
  return (
    <>
      <Navbar/>
      <Sidebar/>
      <Inbox/>
      <div>{props.children}</div>
    </>
  );
};

export default RootLayout;