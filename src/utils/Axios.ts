import axios from 'axios';

const Axios = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
})

const storedUser = localStorage.getItem("token")
const user = storedUser ? JSON.parse(storedUser) : null;


if (user) {
    Axios.defaults.headers.common['Authorization'] = "JWT " + user.token;
}

export default Axios
