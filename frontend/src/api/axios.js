import axios from "axios";

const API=axios.create({
    baseURL:"http://localhost:5000/api/expenses",
});

API.interceptors.request.use(async(config)=>{
    const user=JSON.parse(localStorage.getItem("user"));

    if(user && user.token){
        config.headers.Authorization=`bearer ${user.token}`;
    }
    return config;
});

export default API;