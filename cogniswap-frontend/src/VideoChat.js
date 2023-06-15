import { JitsiMeeting } from '@jitsi/react-sdk';
import './VideoChat.css';

function VideoChat({ roomId }) {
  return (
    <div className="video-chat">
      <JitsiMeeting
        domain={process.env.JITSI_DOMAIN}
        roomName={roomId}
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
          iframeRef.style.height = '630px';
        //  iframeRef.style.width = '800px';
        } }
        frameStyle={{ display: 'block', width: '100%', height: '100%' }}
      />
    </div>
  );
}

export default VideoChat;
