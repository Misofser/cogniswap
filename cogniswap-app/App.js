import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import LoadingScreen from './LoadingScreen';
import VideoChat from './VideoChat';
import RegistrationTable from './RegistrationTable';
import Navbar from './Navbar';

const App = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [roomId, setRoomId] = useState('');

  const handleRegistrationComplete = async (roomId) => {
    setIsRegistered(true);
    setRoomId(roomId);
    setLoading(false);
    console.log('Received roomId:', roomId);
  };

  console.log('isRegistered:', isRegistered);

  return (
    
    <View style={styles.container}>
      <Navbar />
      {loading ? (
        <LoadingScreen />
      ) : isRegistered ? (
        <VideoChat roomId={roomId} />
      ) : (
        <RegistrationTable
          onRegistrationComplete={handleRegistrationComplete}
          setLoading={setLoading}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
