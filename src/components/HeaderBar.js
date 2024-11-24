// src/HeaderBar.js
import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import TareIcon from '@mui/icons-material/RestartAlt';

function HeaderBar({onTare}) {
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        if (newValue === 3) {
          setValue(0);
          onTare();
        } else {
          setValue(newValue);
        }
      }}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)', // optional shadow for styling,
        backgroundColor: "#575960"
      }}
    >
      <BottomNavigationAction label="Home" icon={<HomeIcon/>} sx={{"&.Mui-selected": {color: "#88A3D3"}, color: "#27282B"}}/>
      <BottomNavigationAction label="Search" icon={<SearchIcon/>} sx={{"&.Mui-selected": {color: "#88A3D3"}, color: "#27282B"}}/>
      <BottomNavigationAction label="Settings" icon={<SettingsIcon/>} sx={{"&.Mui-selected": {color: "#88A3D3"}, color: "#27282B"}}/>
      <BottomNavigationAction label="Tare" icon={<TareIcon/>} sx={{"&.Mui-selected": {color: "#88A3D3"}, color: "#27282B"}}/>
    </BottomNavigation>
  );
}

export default HeaderBar;
