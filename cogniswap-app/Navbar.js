import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Font from 'expo-font';

  const fontFiles = {
    'AdventPro-ExtraBold': require('./assets/fonts/AdventPro-ExtraBold.ttf'),
  };

const Navbar = () => {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
      // Load fonts
      async function loadFonts() {
        await Font.loadAsync(fontFiles);
        setFontsLoaded(true);
      }
  
      loadFonts();
    }, []);
  
    if (!fontsLoaded) {
      return null;
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CogniSwap</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 36,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    elevation: 2,
  },
  title: {
    fontSize: 30,
    color: '#02809c',
    fontFamily: 'AdventPro-ExtraBold',
  },
});

export default Navbar;
