import React, { useState, useEffect } from 'react';
import './App.css';
import RegistrationTable from './RegistrationTable';
import Navbar from './Navbar';
import LoadingScreen from './LoadingScreen';
import VideoChat from './VideoChat';

function App() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 6000);
  }, []);

  const handleRegistrationComplete = () => {
    setIsRegistered(true);
  };

  return (
    <div className="app">
      <Navbar />
      {isRegistered ? (
        <>
          {loading ? (
            <LoadingScreen />
          ) : (
            <VideoChat />
          )}
        </>
      ) : (
        <RegistrationTable onRegistrationComplete={handleRegistrationComplete} />
      )}
    </div>
  );
};

export default App;
