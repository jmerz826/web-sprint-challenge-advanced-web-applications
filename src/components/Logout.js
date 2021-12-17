import React, {useEffect} from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import { useHistory } from 'react-router-dom';

const Logout = (props) => {       
    const { push } = useHistory();

    // code exectued when 'logout' is clicked, then immediately mounted
    useEffect(() => {
      axiosWithAuth()
        .post("/logout")
        .then((res) => {
          // removing authentication token from local storage. Protected routes are now inaccessible, until another successful login
          localStorage.removeItem("token");
          //redirected to login page
          push("/login");
        }).catch(err => {
            console.error(err);
        })
    }, []);

    return (
        <div></div>
    );
}

export default Logout;

// Task List
// 1. On mount, execute a http request to the logout endpoint.
// 2. On a successful request, remove the token from localStorage and redirect to the login page.