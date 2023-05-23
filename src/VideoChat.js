import { JitsiMeeting } from '@jitsi/react-sdk';

function VideoChat() {
  return (
    <JitsiMeeting
      domain={process.env.JITSI_DOMAIN}
      roomName="my-room"
      configOverwrite={{
          startWithAudioMuted: false,
          disableModeratorIndicator: false,
          startScreenSharing: false,
          enableEmailInStats: false
      }}
      interfaceConfigOverwrite={{
          DISABLE_JOIN_LEAVE_NOTIFICATIONS: true
      }}
      userInfo={{
          displayName: "Write your name",
          email: ""
      }}
      onApiReady={ (externalApi) => {
          // here you can attach custom event listeners to the Jitsi Meet External API
          // you can also store it locally to execute commands
      } }
      getIFrameRef = { (iframeRef) => {
        iframeRef.style.height = '600px';
        iframeRef.style.width = '600px';
      } }
    />
  );
}

export default VideoChat;