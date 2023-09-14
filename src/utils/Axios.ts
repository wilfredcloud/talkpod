import axios from 'axios';

const Axios = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL,
})

const token = localStorage.getItem("token")

if (token) {
    Axios.defaults.headers.common['Authorization'] = "JWT " + token;
}

export default Axios
