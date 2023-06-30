import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LETTERS = ['L', 'o', 'a', 'd', 'i', 'n', 'g', '.', '.', '.'];

const LoadingText = () => {
  const [letterIndex, setLetterIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setLetterIndex((index) => index + 1);
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <View style={styles.loadingText}>
      {LETTERS.slice(0, letterIndex).map((letter, index) => (
        <Text key={index} style={styles.loadingLetter}>
          {letter}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingLetter: {
    color: '#02809c',
    fontFamily: 'AdventPro-ExtraBold',
    fontSize: 24,
  },
});

export default LoadingText;
