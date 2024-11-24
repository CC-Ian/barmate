// // src/App.js
// import React, {useState} from 'react';
// import { Box, Container } from '@mui/material';
// import HomeIcon from '@mui/icons-material/Home';
// import SearchIcon from '@mui/icons-material/Search';
// import SettingsIcon from '@mui/icons-material/Settings';
// import HeaderBar from './components/HeaderBar';

// function App() {
//   // State to track selected icon.
//   const [selectedIcon, setSelectedIcon] = useState(0);

//   const style = {
//     backgroundColor: '#1F1F1F'
//   }

//   // Function to conditionally render the correct icon.
//   const renderIcon = () => {
//     switch (selectedIcon) {
//       case 0:
//         return <HomeIcon sx={{ fontSize: 80 }} />;
//       case 1:
//         return <SearchIcon sx={{ fontSize: 80 }} />;
//       case 2:
//         return <SettingsIcon sx={{ fontSize: 80 }} />;
//       default:
//         return <HomeIcon sx={{ fontSize: 80 }} />;
//     }
//   };

//   return (
//     // <div style={style}>
//       <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
//         {/* Main content */}
//         <Container sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//           {renderIcon()}
//         </Container>

//         {/* Bottom header bar */}
//         <HeaderBar setSelectedIcon={setSelectedIcon}/>
//       </Box>
//     // </div>
    
//   );
// }

// export default App;


import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography } from '@mui/material';
import HeaderBar from './components/HeaderBar'; // Assuming HeaderBar is still defined as part of your components
import io from 'socket.io-client';

// Helper function to convert grams to pounds and ounces
const gramsToPoundsOunces = (grams) => {
  const totalOz = grams / 28.3495; // Convert grams to ounces
  const lbs = Math.round(totalOz / 16); // Get whole pounds
  const oz = Math.round(totalOz % 16); // Get remainder ounces
  return { lbs, oz, totalOz };
};

function App() {
  // State to track the weight in grams.
  const [weight, setWeight] = useState(0); // Example weight in grams for demonstration
  const [offset, setOffset] = useState(0);
  const [avgOffset, setAvgOffset] = useState(0);

   // Moving average buffer and index (useRef ensures persistence across renders)
   const movingAverageBuffer = useRef(new Array(80).fill(0));
   const movingAverageIndex = useRef(0);

     // Function to compute the average of the buffer
  const calculateMovingAverage = () => {
    const sum = movingAverageBuffer.current.reduce((acc, val) => acc + val, 0);
    return sum / movingAverageBuffer.current.length;
  };

  // Connect to the websocket to transmit weight data.
  useEffect(() => {
    const socket = io('http://barmate.local:3002');

    socket.on('weight_update', (data) => {
      setWeight(data.weight);

      // Next reading into the moving average buffer
      movingAverageBuffer.current[movingAverageIndex.current] = (data.weight - offset);
      movingAverageIndex.current = (movingAverageIndex.current + 1) % 80;
    });

    // Cleanup function when the component is unmounted
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleTare = () => {
    setOffset(weight);
    setAvgOffset(calculateMovingAverage() - Math.floor(calculateMovingAverage()));
  };

  // Convert grams to lbs and oz
  const { lbs, oz, totalOz } = gramsToPoundsOunces(weight - offset);

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top section: Grams display */}
      <Box sx={{
        backgroundColor: '#3F4045', // Blue color
        flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'
      }}>
        <Container sx={{ textAlign: 'center'}}>
          <Typography variant="h2" sx={{ color: '#426BB3', fontWeight: 'bold' }}>
            {/* {(weight - offset).toFixed(2)} g */}
            {Math.floor(weight - offset) + (calculateMovingAverage() - Math.floor(calculateMovingAverage() - avgOffset) ).toFixed(2).substring(1)} g
          </Typography>
        </Container>
      </Box>

      {/* Bottom section: Pounds/oz display */}
      <Box sx={{
        backgroundColor: '#3F4045', // Orange color
        flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'
      }}>
        <Container sx={{ textAlign: 'center', position: 'relative', height: '50vh'}}>
          <Typography variant="h2" sx={{ color: '#736EAF', fontWeight: 'bold' }}>
            {lbs} lbs {oz} oz
          </Typography>
            <Typography variant="body1" sx={{ color: '#5F5AA2', fontSize: '1rem', marginTop: 2 }}>
              {totalOz.toFixed(2)} oz
            </Typography>
        </Container>
      </Box>

      {/* Header Bar */}
      <Box sx={{ }}>
        <HeaderBar onTare={handleTare} />
      </Box>
    </Box>
  );
}

export default App;
