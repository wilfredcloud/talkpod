import Axios from "./Axios"
import { Room } from "./types"

export const getToken = async () => {

}

export const createSession = async () => {

}

export const createConnection = async () => {

}

export const getUserHomeRoom = async (userId: string): Promise<Room> => {
    try {
        const response = await Axios.get(`/users/${userId}/homeroom`);
        const room: Room = response.data;
        return room;
    } catch (error) {
        console.log(error);
        throw error
    }
}
