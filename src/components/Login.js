import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const initialFormValues = {
        username: '',
        password: ''
};

const initialFormErrors = {
    error: ''
};

const Login = (props) => {
    const [formValues, setFormValues] = useState(initialFormValues);
    const [formErrors, setFormErrors] = useState(initialFormErrors);

    const { push } = useHistory();

    const handleChange = (e) => {
      setFormValues({
        ...formValues,
          [e.target.name]: e.target.value,
        }
      );
    };

    const handleLogin = (e) => {
        e.preventDefault();
        //Create http request using form values. if form values meet fitting credentials, a token, role, and username are returned by the API.
      axios
        .post("http://localhost:5000/api/login", formValues)
        .then((res) => {
            const { role, token, username } = res.data;
            // Saving the role, token, and username from the API to local storage.
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            localStorage.setItem('username', username);
            //set form back to blank inputs
            setFormValues(initialFormValues);
            //redirect the user to the '/view' page.
            push('/view');
        })
          .catch((err) => {
              setFormErrors({
                  ...formErrors,
                  //If there is an error, error value in formErrors will be changed to the present error's message
                  error: err.response.data.error
              });
          });
    };


    return(<ComponentContainer>
        <ModalContainer>
            <h1>Welcome to Blogger Pro</h1>
            <h2>Please enter your account information.</h2>
            <form onSubmit={handleLogin}>
                <label> Username:
                    <input
                        name='username'
                        type='text'
                        value={formValues.username}
                        onChange={handleChange}
                        id='username'
                    />
                </label>
                <label> Password:
                    <input
                        name='password'
                        type='password'
                        value={formValues.password}
                        onChange={handleChange}
                        id='password'
                    />
                </label>
                <button onClick={handleLogin} id='submit'>Login</button>
                {/* p element only renders if there is an error present */}
                {formErrors.error && <p id='error'>{formErrors.error}</p>}
            </form>

        </ModalContainer>
    </ComponentContainer>);
}

export default Login;

//Task List
//1. Build login form DOM from scratch, making use of styled components if needed. Make sure the username input has id="username" and the password input as id="password".
//2. Add in a p tag with the id="error" under the login form for use in error display.
//3. Add in necessary local state to support login form and error display.
//4. When login form is submitted, make an http call to the login route. Save the auth token on a successful response and redirect to view page.
//5. If the response is not successful, display an error statement. **a server provided error message can be found in ```err.response.data```**
//6. MAKE SURE TO ADD id="username", id="password", id="error" AND id="submit" TO THE APPROPRIATE DOM ELEMENTS. YOUR AUTOTESTS WILL FAIL WITHOUT THEM.

const ComponentContainer = styled.div`
    height: 70%;
    justify-content: center;
    align-items: center;
    display:flex;
`

const ModalContainer = styled.div`
    width: 500px;
    background: white;
    padding: 2rem;
    text-align: center;
`

const Label = styled.label`
    display: block;
    text-align: left;
    font-size: 1.5rem;
`

const FormGroup = styled.form`
    padding:1rem;
`

const Input = styled.input`
    font-size: 1rem;
    padding: 1rem 0;
    width:100%;
`

const Button = styled.button`
    padding:1rem;
    width: 100%;
`
