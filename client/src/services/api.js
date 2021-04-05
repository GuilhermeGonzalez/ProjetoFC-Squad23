import axios from 'axios';

const api = axios.create({
    baseURL: "donateitprojetofcamara.herokuapp.com"
})

export default api;