import React from 'react';
import './LoadingScreen.css';
import LoadingText from './LoadingText';

function LoadingScreen() {
  return (
    <div className="loading-screen">
      {/* My loading indicator. I should paint it */}
      {/* <h2>Loading...</h2> */}
      <LoadingText />
    </div>
  );
}

export default LoadingScreen;
