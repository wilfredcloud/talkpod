import { Avatar, Dropdown, MenuProps } from 'antd'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { getUserHomeRoom } from '../utils/helpers';
import { UserContext } from '../contexts/UserContext';

const UserDropdown = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const openRooms = async () => {
        try {
            const room = await getUserHomeRoom(user?.data.id as string)
            navigate(`/${room.id}`)
        } catch (error) {
            console.log(error)
        }
    }

    const logout = () => {
        setUser(null);
        navigate('/')
    }
    const items: MenuProps['items'] = [
        {
            key: 'Rooms',
            label: <button onClick={openRooms}>Rooms</button>
        },
        {
            key: 'Logout',
            label: <button onClick={logout}>Logout</button>
        }
    ]
    return (
        <Dropdown menu={{ items }} placement='bottom'>
            <div className='flex items-center justify-center gap-x-2'>
                <Avatar style={{ backgroundColor: "#8852FF", color: "white" }}>C</Avatar> Clement</div>
        </Dropdown>
    )
}

export default UserDropdown
