import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

function VideoChat({ roomId }) {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: `https://jitsi-test.39.yt/${roomId}` }}
        style={styles.webview}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default VideoChat;
