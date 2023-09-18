import React from 'react';
import { StreamManager } from 'openvidu-browser';
import OpenViduVideoComponent from './OpenViduVideoComponent';

interface UserVideoProps {
  streamManager: StreamManager; // Replace 'any' with the actual type of 'streamManager'
}

const UserVideoComponent: React.FC<UserVideoProps> = ({ streamManager }) => {
  // const getNicknameTag = () => {
  //   // Gets the nickName of the user
  //   return JSON.parse(streamManager.stream.connection.data).clientData;
  // };

  return (
    <div>
      {streamManager !== undefined ? (
        <div className="streamcomponent">
          <OpenViduVideoComponent streamManager={streamManager} />
          <div>
            {/* <p>{getNicknameTag()}</p> */}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;
