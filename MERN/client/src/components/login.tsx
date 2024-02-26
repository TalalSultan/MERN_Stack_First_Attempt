import React, { useEffect, useState } from 'react'
import './login.css'
import axios from 'axios'


type neededValues = {
    status: string,
    username: string,
    email: string,
    clickedRegister: boolean
}
function Login({ onReturnValue }: any) {


    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (event: any) => {
        // event.preventDefault();
        const value = event.target.value;
        setData({
            ...data,
            [event.target.name]: value
        })
    }
    const handleSubmit = (event: any) => {
        event.preventDefault();

        axios.post("/auth/login", { email: data.email, password: data.password }).then((res) => {

            onReturnValue({ status: res.status, username: res.data.username, email: res.data.email })
        }).catch((error) => {
            console.log("got an error");
            console.log(error);
            onReturnValue({ status: error.response.status });
        })
    };
    const handleRegister = (event: any) => {
        event.preventDefault();
        onReturnValue({...onReturnValue,clickedRegister:true})
    }

    return (
        <div className="container">
            <div className='box'>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input type='email' name='email' placeholder='Email' value={data.email} onChange={handleChange} required /><br />
                    <input type="password" name="password" placeholder="Password" value={data.password} onChange={handleChange} required /><br />
                    <button type="button" onClick={handleSubmit}> Login </button><br />
                    <button type="button" onClick={handleRegister} className='Register'> Register </button>
                </form>
            </div>
        </div>
    )
}

export default Login
