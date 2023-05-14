import React, { useState } from 'react';
import './App.css';
import RegistrationTable from './RegistrationTable';
import Navbar from './Navbar';
import LoadingScreen from './LoadingScreen';

function App() {
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegistrationComplete = () => {
    setIsRegistered(true);
  };

  return (
    <div>
      <Navbar />
      {isRegistered ? (
        <LoadingScreen />
      ) : (
        <RegistrationTable onRegistrationComplete={handleRegistrationComplete} />
      )}
    </div>
  );
}

export default App;
