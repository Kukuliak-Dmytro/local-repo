import axios from "axios";

const axiosClient=axios.create({
    baseURL:'https://api.escuelajs.co/api/v1',
    headers:{
        'Content-Type':'application/json',
    },
    timeout:15000,
})

export default axiosClient;
