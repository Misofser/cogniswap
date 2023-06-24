import React, { useState, useEffect } from 'react';
import './App.css';
import LoadingScreen from './LoadingScreen';
import RegistrationTable from './RegistrationTable';
import Navbar from './Navbar';
import VideoChat from './VideoChat';

function App() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [roomId, setRoomId] = useState('');


  const handleRegistrationComplete = async (roomId) => {
    setIsRegistered(true);
    setRoomId(roomId);
    setLoading(false);
    console.log('Received roomId:', roomId);
  };

  useEffect(() => {
    console.log('loading:', loading);
  }, [loading]);

  console.log('isRegistered:', isRegistered);

  return (
    <div className="app">
      <Navbar />
      {loading ? (
        <LoadingScreen />
      ) : isRegistered ? (
        <VideoChat roomId={roomId} />
      ) : (
        <RegistrationTable onRegistrationComplete={handleRegistrationComplete} setLoading={setLoading} />
      )}
    </div>
  );
};

export default App;
