import React from 'react';
import { View, StyleSheet } from 'react-native';
import RegistrationTable from './RegistrationTable';
import Navbar from './Navbar';

const App = () => {
  return (
    <View style={styles.container}>
      <Navbar />
      <RegistrationTable />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
