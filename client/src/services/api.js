import axios from 'axios';

const api = axios.create({
    baseURL: "https://donateitprojetofcamara.herokuapp.com"
})

export default api;