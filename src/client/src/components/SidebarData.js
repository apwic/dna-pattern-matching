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
    path: '/DNATest',
    icon: <FaIcons.FaDna />,
    cName: 'nav-text'
  },
  {
    title: 'Add Disease',
    path: '/AddDisease',
    icon: <FaIcons.FaPlus />,
    cName: 'nav-text'
  },
  {
    title: 'History',
    path: '/History',
    icon: <FaIcons.FaClock />,
    cName: 'nav-text'
  }
];