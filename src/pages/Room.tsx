import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useParams } from "react-router-dom";
import { Room as RoomType} from "../utils/types";
import { getRoomById, getUserRooms } from "../utils/helpers";
import { Alert, Button, Card, Input, Space, Spin } from "antd";
// import {HiHome} from "react-icons/hi2"
import {BsLink45Deg} from "react-icons/bs"
import Title from "antd/es/typography/Title";

const Room = () => {
  const {user} = useContext(UserContext);
  const {roomId} = useParams()
  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState<RoomType>()
  const [userRooms, setUserRooms] = useState<RoomType[]>([])
  const APP_URL = import.meta.env.VITE_APP_BASE_URL;

  useEffect(() => { 
    const getData = async () => {
      try {
        const room = await getRoomById(roomId as string);
        setRoom(room);
        console.log('room', room)

        if (user) {
          const userRooms = await getUserRooms(user.data.id);
          setUserRooms(userRooms)
          console.log('userRooms', userRooms)

        }
      } catch (error) {
        console.log(error);
      }
    }

    getData();
    setLoading(false)

  }, [roomId, user])
 
  if (loading) {
    return <Spin/>
  }
  
  if (!room) {
    return <Alert showIcon type="error" message="This room does not exist" />
  }

  return (
    <div>
    <Navbar/>

    <div className="showcase">
      <div className="showcase-content row">
        <div className="left col-12 col-md-6">
          <h1>{room.name}</h1>
         
          <Space.Compact style={{ width: '100%' }}>
      <Input prefix={<BsLink45Deg size={28}/>} defaultValue={`${APP_URL}/${roomId}`}readOnly />
      <Button size="large" type="primary">Copy</Button>
    </Space.Compact>
        </div>
        <div className="right col-12 col-md-6">
        </div>
      </div>
    <div></div>
      <div className="">
        {userRooms.map((room) => <Card key={room.id}>
                <Title>{room.name}</Title>
        </Card>)}
      </div>
    </div>

 

    <Footer/>
  </div>
  )
}

export default Room
