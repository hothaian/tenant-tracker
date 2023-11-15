import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import RoomDashboard from './components/RoomDashboard';
import UtilityForm from './components/Utility/Form';
import Profile from './components/Profile';
import SignUp from './components/User/SignUp';
import Checkout from './components/User/SignUp';

const App = () => {
  return (
    <div>
      <Header />
      <main>
        <RoomDashboard />
        <Checkout/>
        {/* <SignUp /> */}
        
        {/* <UtilityForm /> */}
        {/* <Profile /> */}
      </main>
      <Footer />
    </div>
  );
};

export default App;
