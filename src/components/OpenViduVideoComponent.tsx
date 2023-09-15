import { StreamManager } from 'openvidu-browser';
import React, { useEffect, useRef } from 'react';

interface OpenViduVideoProps {
  streamManager: StreamManager; // Replace 'any' with the actual type of 'streamManager'
}

const OpenViduVideoComponent: React.FC<OpenViduVideoProps> = ({ streamManager }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return <video autoPlay={true} ref={videoRef} />;
};

export default OpenViduVideoComponent;
