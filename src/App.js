import React from 'react';
import Header from './components/Layout/Header';
import RoomDashboard from './components/RoomDashboard';
import UtilityForm from './components/Utility/Form';
import Profile from './components/Profile';
import SignUp from './components/User/SignUp';
import Checkout from './components/User/SignUp';
import SimpleBottomNavigation from './components/Layout/Footer';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const App = () => {

  const defaultTheme = createTheme();
  return (
    <ThemeProvider theme={defaultTheme}>
    <div>
      {/* <Header /> */}
      <main>
        <RoomDashboard />
        <Checkout/>
        {/* <SignUp /> */}
        {/* <SimpleBottomNavigation/> */}
        {/* <UtilityForm /> */}
        {/* <Profile /> */}
      </main>
  
    </div>
    </ThemeProvider>
  );
};

export default App;
