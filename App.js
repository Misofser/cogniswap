import React from 'react';
import { View, StyleSheet } from 'react-native';
import RegistrationTable from './RegistrationTable';

const App = () => {
  return (
    <View style={styles.container}>
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