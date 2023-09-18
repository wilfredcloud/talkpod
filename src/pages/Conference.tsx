import { Button, Card, Form, Input } from 'antd'
import OvApi from '../utils/OvApi'
import { OpenVidu, StreamManager } from 'openvidu-browser';
import { useEffect, useRef, useState } from 'react';

interface ParticipantProps {
  stream: StreamManager
}
const Participant:React.FC<ParticipantProps> = ({stream}) => {

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(()=> {
    if (videoRef.current) {
      stream.addVideoElement(videoRef.current)
    }
  }, [stream])

  return (
      <div
      className="bg-neutral-800 rounded-md flex flex-col items-center justify-center w-72"
      style={{ aspectRatio: '16/9' }} // Maintain a 16:9 aspect ratio for each participant
  >
      {/* <Avatar size="large" className='h-20 w-20 flex justify-center items-center text-xl'>{1}</Avatar>
       <p className='text-center'>Participant gletieo</p> */}
       
       <video ref={videoRef} autoPlay playsInline muted className='w-full h-auto' />

  </div>
  )
}



const Conference = () => {
  const [subscribers, setSubscribers] = useState<StreamManager[]>([])
  const createSession = async (value: Record<string, string>) => {
    let token;
    try {
      const response = await OvApi.post('/api/sessions', value);
      token = await createToken(response.data.sessionId, value)
    } catch (error) {
      token = await createToken(value.customSessionId, value)
    }

    
    // console.log(response.data);
     

    joinSession(token, { name: value.participant })

  }

  const createToken = async (sessionId: string, value: Record<string, string>) => {
    const response = await OvApi.post(`/api/sessions/${sessionId}/connection`,
      { data: value.participant });

    return response.data.token;

  }

  const joinSession = async (token: string, data: Record<string, string>) => {
 
    const OV = new OpenVidu();
    const session = OV.initSession();

    // On every new Stream received...
    session.on('streamCreated', (event) => {
      // Subscribe to the Stream to receive it. Second parameter is undefined
      // so OpenVidu doesn't create an HTML video by its own
     const subscriber =  session.subscribe(event.stream, undefined);

     console.log("STREAMCREATED------")
     console.log(subscriber);
     setSubscribers([...subscribers, subscriber]);
  
    });

    await session.connect(token, data);

    const publisher = await OV.initPublisherAsync(undefined, {
      audioSource: undefined, // The source of audio. If undefined default microphone
      videoSource: undefined, // The source of video. If undefined default webcam
      publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
      publishVideo: true, // Whether you want to start publishing with your video enabled or not
      resolution: '640x480', // The resolution of your video
      frameRate: 30, // The frame rate of your video
      insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
      mirror: false, // Whether to mirror your local video or not
    });

    session.publish(publisher);

    setSubscribers([...subscribers, publisher]);


  }




  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center'>
      <Card>
        <Form layout='vertical' onFinish={createSession}>
          <Form.Item name="customSessionId" label="Session Name" >
            <Input placeholder='Enter room name' />
          </Form.Item>
          <Form.Item name="participant" label="Participant" >
            <Input placeholder='Enter participant name' />
          </Form.Item>

          <Button htmlType='submit' type='primary' className='w-full'>Start</Button>
        </Form>


      </Card>

      {subscribers.map((sub, index) => <Participant key={index} stream={sub} />)}






    </div>
  )
}

export default Conference
