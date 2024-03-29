import React, { useContext, useEffect, useState } from 'react';
import { BsPencilSquare, BsInbox, BsFileText, BsTrash } from 'react-icons/bs';
import Mailbox from '../Mail/Mailbox';
import { useSelector } from 'react-redux';
import reRenderContext from "../store/reRenderContext";

const Sidebar = ({ onTabChange }) => {
  const userEmail = useSelector((state) => state.auth.userId);
  const replacedSenderMail = userEmail.replace(/[@.]/g, '');
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [count, setCount] = useState(0);
  const { iSReRender } = useContext(reRenderContext);

  const handleComposeClick = () => {
    setShowComposeModal(true);
  };

  const handleCloseComposeModal = () => {
    setShowComposeModal(false);
  };

  const handleInboxClick = () => {
    onTabChange('inbox');
  };

  const handleDraftClick = () => {
    onTabChange('draft');
  };

  const handleSentClick = () => {
    onTabChange('sent');
  };

  const unreadCount = count;

  useEffect(() => {
    const fetchEmails = async (folder) => {
      console.log("folder",folder)
      try {
        const response = await fetch(
          `https://mailboxclient-d7818-default-rtdb.firebaseio.com/${folder}${replacedSenderMail}.json`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch ${folder} emails`);
        }

        const data = await response.json();

        if (data) {
          const unreadEmails = Object.values(data).filter((item) => item.emailIsNew);
          const emailIsNewArray = unreadEmails.map((item) => item.emailIsNew);
          setCount(emailIsNewArray.length);
        }
      } catch (error) {
        console.error(`Error fetching ${folder} emails:`, error);
      }
    };

    fetchEmails('inbox'); 
  }, [iSReRender]);

  return (
    <div className="sidebar bg-light" style={{ "width": "15%", "height": "80vh", "marginTop": "2%", "float": "left" }}>
      <button className="btn btn-primary btn-block mb-3 m-5" onClick={handleComposeClick}>
        <BsPencilSquare /> Compose
      </button>

      <ul className="list-group m-1">
        <li className="list-group-item" onClick={handleInboxClick}>
          <BsInbox /> Inbox <span className='bg-dark' style={{ "color": "white", "margin": "2px", "padding": "3px", "borderRadius": "50px" }}>{unreadCount}</span>
        </li>
        <li className="list-group-item" onClick={handleDraftClick}>
          <BsFileText /> Draft
        </li>
        <li className="list-group-item" onClick={handleSentClick}>
          <BsFileText /> Sent
        </li>
        <li className="list-group-item">
          <BsTrash /> Trash
        </li>
      </ul>

      <Mailbox
        showComposeModal={showComposeModal}
        handleCloseComposeModal={handleCloseComposeModal}
      />
    </div>
  );
};

export default Sidebar;
