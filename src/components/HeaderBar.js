// src/HeaderBar.js
import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';

function HeaderBar({setSelectedIcon}) {
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        setSelectedIcon(newValue);
      }}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)', // optional shadow for styling
      }}
    >
      <BottomNavigationAction label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction label="Search" icon={<SearchIcon />} />
      <BottomNavigationAction label="Notifications" icon={<NotificationsIcon />} />
      <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />
    </BottomNavigation>
  );
}

export default HeaderBar;
