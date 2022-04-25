import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'DNA Test',
    path: '/dnatest',
    icon: <FaIcons.FaDna />,
    cName: 'nav-text'
  },
  {
    title: 'History',
    path: '/history',
    icon: <FaIcons.FaClock />,
    cName: 'nav-text'
  }
];