import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import LoadingText from './LoadingText';

function LoadingScreen() {
  return (
    <View style={styles.loadingScreen}>
      <LoadingText />
      {/* <Text>Loading...</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingScreen;
