import axios from "axios";

const instance = axios.create({
    baseURL: 'https://react-burger-1f4f6-default-rtdb.firebaseio.com/'
})

export default instance;