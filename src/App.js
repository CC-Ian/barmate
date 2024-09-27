// src/App.js
import React, {useState} from 'react';
import { Box, Container } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import HeaderBar from './components/HeaderBar';

function App() {
  // State to track selected icon.
  const [selectedIcon, setSelectedIcon] = useState(0);

  // Function to conditionally render the correct icon.
  const renderIcon = () => {
    switch (selectedIcon) {
      case 0:
        return <HomeIcon sx={{ fontSize: 80 }} />;
      case 1:
        return <SearchIcon sx={{ fontSize: 80 }} />;
      case 2:
        return <NotificationsIcon sx={{ fontSize: 80 }} />;
      case 3:
        return <SettingsIcon sx={{ fontSize: 80 }} />;
      default:
        return <HomeIcon sx={{ fontSize: 80 }} />;
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      {/* Main content */}
      <Container sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {renderIcon()}
      </Container>

      {/* Bottom header bar */}
      <HeaderBar setSelectedIcon={setSelectedIcon}/>
    </Box>
  );
}

export default App;
