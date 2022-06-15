import axios from "axios";

const instance = axios.create({
    baseURL: 'https://react-burger-5380d-default-rtdb.firebaseio.com/'
})

export default instance;