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


  const handleRegistrationComplete = (roomId) => {
    setIsRegistered(true);
    setRoomId(roomId);
    setLoading(false);
    console.log('Received roomId:', roomId);
  };

  console.log('loading:', loading);

  return (
    <div className="app">
      <Navbar />
      {isRegistered ? (
        <>
          {loading ? (
            <>
            {console.log('LoadingScreen is rendered:', loading)}
            <LoadingScreen />
            </>
          ) : (
            <VideoChat roomId={roomId} />
          )}
        </>
      ) : (
        <RegistrationTable onRegistrationComplete={handleRegistrationComplete} setLoading={setLoading} />
      )}
    </div>
  );
};

export default App;
