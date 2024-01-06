import React, { useState } from 'react';
import Navbar from "../Header/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import Inbox from '../Inbox/Inbox';
import Draft from '../Draft/Draft'
import Sent from '../Sent/Sent';

const RootLayout = (props) => {
  const [activeTab, setActiveTab] = useState('inbox');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Navbar/>
      <Sidebar onTabChange={handleTabChange} />
      {activeTab === 'inbox' && <Inbox />}
      {activeTab === 'draft' && <Draft />}
      {activeTab === 'sent' && <Sent/>}
      <div>{props.children}</div>
    </>
  );
};

export default RootLayout;
