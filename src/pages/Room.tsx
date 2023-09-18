import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { useParams } from "react-router-dom";
import { Room as RoomType } from "../utils/types";
import { getRoomById, getUserRooms } from "../utils/helpers";
import { Alert, Button, Card, Input, Space, Spin } from "antd";
// import {HiHome} from "react-icons/hi2"
import { BsLink45Deg } from "react-icons/bs"
import Title from "antd/es/typography/Title";
import ActionButton from "../components/ActionButton";

const Room = () => {
  const { user } = useContext(UserContext);
  const { roomId } = useParams()
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
    return <Spin />
  }

  if (loading && !room) {
    return <Alert showIcon type="error" message="This room does not exist" />
  }

  return (
    <div>
      <Navbar />

      <div className=" w-full bg-emerald-50">
      <div className="max-w-screen-xl mx-auto py-14">
        <div className="">
          <Title  className='text-neutral-600'>{room?.name}</Title>
          <p>0 Session</p>
        </div>
        <div className=" max-w-96 flex flex-col gap-y-2">
          <label htmlFor="" >Invite Participants</label>
          <div className="flex gap-x-4"><Input defaultValue={`${APP_URL}/${roomId}`} prefix={<BsLink45Deg size={24}/>} size="large" readOnly/> <ActionButton text="Copy"/> </div>
          <button className=" py-3 bg-violet-500 text-center text-white rounded-md font-semibold ">Start</button>
        </div>

        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
          {userRooms.map((room) => <Card><Title level={3} >{room.name}</Title></Card>)}
        </div>
      </div>
    </div>

      <Footer />
    </div>
  )
}

export default Room
