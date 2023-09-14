import {  Card } from 'antd'
import ControlPanel from '../components/ControlPanel'
import ParticipantPanel from '../components/ParticipantPanel'

const Conference = () => {
  return (
  <div className="bg-[#001528] flex flex-col justify-between text-white h-screen">

    <div className="text-center">
        RoomName
     </div>
    <div className="flex-grow-1 flex flex-row items-stretch justify-stretch py-6">
    <ParticipantPanel/>

    <Card  size="small" className='flex-grow-1 bg-[#001528] border-none'>
        and raises the spyglass.
    </Card>

    <Card title="Comments" size="small">
        and raises the spyglass.
    </Card>
    
    </div>

    <ControlPanel/>
  </div>
  )
}

export default Conference
