import axios from 'axios';

const axiosWithAuth = () => {
    const token = localStorage.getItem('token');

    // Returns axios element containing the storage from local storage and declaring the base URL for CRUD methods.
    return axios.create({
        headers: {
            authorization: token
        },
        baseURL: 'http://localhost:5000/api'
    });
};

export default axiosWithAuth;

//Task List:
//1. Complete axiosWithAuth