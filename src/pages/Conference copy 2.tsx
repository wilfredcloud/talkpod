import { OpenVidu, Publisher, Session, StreamManager, Subscriber } from 'openvidu-browser';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import UserVideoComponent from '../components/UserVideoComponent';

const APPLICATION_SERVER_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000';

interface SessionProps {
  id: string;
  userName: string;
  session: Session | null;
  mainStreamManager: any;
  publisher: Publisher | null;
  subscribers: Subscriber[];
  currentVideoDevice: MediaDeviceInfo | null;
}

const App: React.FC = () => {
  const [sessionProps, setSessionProps] = useState<SessionProps>({
    id: 'SessionA',
    userName: 'Participant' + Math.floor(Math.random() * 100),
    session: null,
    mainStreamManager: null,
    publisher: null,
    subscribers: [],
    currentVideoDevice: null,
  });

  const handleChangeSessionId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSessionProps({ ...sessionProps, id: e.target.value });
  };

  const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSessionProps({ ...sessionProps, userName: e.target.value });
  };

  const handleMainVideoStream = (stream: any) => {
    if (sessionProps.mainStreamManager !== stream) {
      setSessionProps({ ...sessionProps, mainStreamManager: stream });
    }
  };

  const deleteSubscriber = (streamManager: any) => {
    const subscribers = sessionProps.subscribers.slice();
    const index = subscribers.indexOf(streamManager);
    if (index !== -1) {
      subscribers.splice(index, 1);
      setSessionProps({ ...sessionProps, subscribers });
    }
  };

  const joinSession = async () => {
    try {
      const OV = new OpenVidu();
      const mySession = OV.initSession();

      mySession.on('streamCreated', (event) => {
        const subscriber = mySession.subscribe(event.stream, undefined);
        setSessionProps({ ...sessionProps, subscribers: [...sessionProps.subscribers, subscriber] });
      });

      mySession.on('streamDestroyed', (event) => {
        deleteSubscriber(event.stream.streamManager);
      });

      mySession.on('exception', (exception) => {
        console.warn(exception);
      });

      const sessionId = await createSession(sessionProps.id);
      const token = await createToken(sessionId);

      mySession
        .connect(token, { clientData: sessionProps.userName })
        .then(async () => {
          const publisher = await OV.initPublisherAsync(undefined, {
            audioSource: undefined,
            videoSource: undefined,
            publishAudio: true,
            publishVideo: true,
            resolution: '640x480',
            frameRate: 30,
            insertMode: 'APPEND',
            mirror: false,
          });

          mySession.publish(publisher);

          const devices = await OV.getDevices();
          const videoDevices = devices.filter((device) => device.kind === 'videoinput');
          const currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
          const currentVideoDevice = videoDevices.find((device) => device.deviceId === currentVideoDeviceId);

          setSessionProps({
            ...sessionProps,
            session: mySession,
            currentVideoDevice,
            mainStreamManager: publisher,
            publisher,
          });
        })
        .catch((error) => {
          console.log('There was an error connecting to the session:', error.code, error.message);
        });
    } catch (e) {
      console.error(e);
    }
  };

  const leaveSession = () => {
    const mySession = sessionProps.session;

    if (mySession) {
      mySession.disconnect();
    }

    setSessionProps({
      id: 'SessionA',
      userName: 'Participant' + Math.floor(Math.random() * 100),
      session: null,
      mainStreamManager: null,
      publisher: null,
      subscribers: [],
      currentVideoDevice: null,
    });
  };

  const switchCamera = async () => {
    try {
      const OV = new OpenVidu();
      const devices = await OV.getDevices();
      const videoDevices = devices.filter((device) => device.kind === 'videoinput');

      if (videoDevices && videoDevices.length > 1) {
        const newVideoDevice = videoDevices.filter((device) => device.deviceId !== sessionProps.currentVideoDevice?.deviceId);

        if (newVideoDevice.length > 0) {
          const newPublisher = OV.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          });

          await sessionProps.session?.unpublish(sessionProps.mainStreamManager);
          await sessionProps.session?.publish(newPublisher);

          setSessionProps({
            ...sessionProps,
            currentVideoDevice: newVideoDevice[0],
            mainStreamManager: newPublisher,
            publisher: newPublisher,
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const createSession = async (sessionId: string) => {
    const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions', { customSessionId: sessionId }, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data; // The sessionId
  };

  const createToken = async (sessionId: string) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections',
      {},
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return response.data; // The token
  };

  return (
    <div className="container">
      {sessionProps.session === null ? (
        <div id="join">
          <div id="img-div">
            <img src="resources/images/openvidu_grey_bg_transp_cropped.png" alt="OpenVidu logo" />
          </div>
          <div id="join-dialog" className="jumbotron vertical-center">
            <h1> Join a video session </h1>
            <form className="form-group" onSubmit={joinSession}>
              <p>
                <label>Participant: </label>
                <input
                  className="form-control"
                  type="text"
                  id="userName"
                  value={sessionProps.userName}
                  onChange={handleChangeUserName}
                  required
                />
              </p>
              <p>
                <label> Session: </label>
                <input
                  className="form-control"
                  type="text"
                  id="sessionId"
                  value={sessionProps.id}
                  onChange={handleChangeSessionId}
                  required
                />
              </p>
              <p className="text-center">
                <input className="btn btn-lg btn-success" name="commit" type="submit" value="JOIN" />
              </p>
            </form>
          </div>
        </div>
      ) : null}

      {sessionProps.session !== null ? (
        <div id="session">
          <div id="session-header">
            <h1 id="session-title">{sessionProps.id}</h1>
            <input
              className="btn btn-large btn-danger"
              type="button"
              id="buttonLeaveSession"
              onClick={leaveSession}
              value="Leave session"
            />
            <input
              className="btn btn-large btn-success"
              type="button"
              id="buttonSwitchCamera"
              onClick={switchCamera}
              value="Switch Camera"
            />
          </div>

          {sessionProps.mainStreamManager !== null ? (
            <div id="main-video" className="col-md-6">
              <UserVideoComponent streamManager={sessionProps.mainStreamManager} />
            </div>
          ) : null}
          <div id="video-container" className="col-md-6">
            {sessionProps.publisher !== null ? (
              <div className="stream-container col-md-6 col-xs-6" onClick={() => handleMainVideoStream(sessionProps.publisher)}>
                <UserVideoComponent streamManager={sessionProps.publisher} />
              </div>
            ) : null}
            {sessionProps.subscribers.map((sub) => (
              <div key={sub.id} className="stream-container col-md-6 col-xs-6" onClick={() => handleMainVideoStream(sub)}>
                <span>{sub.id}</span>
                <UserVideoComponent streamManager={sub} />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default App;
