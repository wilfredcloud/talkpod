import axios from 'axios';

const OvApi = axios.create({
    baseURL: import.meta.env.VITE_APP_APPLICATION_SERVER_URL,
    auth: {
        username: import.meta.env.VITE_APP_OPENVIDU_USERNAME,
        password: import.meta.env.VITE_APP_OPENVIDU_PASSWORD,
    },
})

export default OvApi
