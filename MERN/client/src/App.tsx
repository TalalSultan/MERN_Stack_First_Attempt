import React, { useEffect, useState } from 'react'
import Login from './components/login'
import Profile from './components/profile'
import Register from './components/register'

type neededValues = {
  status: string,
  username: string,
  email: string,
  clickedRegister: boolean
  
}
export default function App() {
  const [valueFromLogin, setValueFromLogin] = useState({
    status: '',
    username: '',
    email: '',
    clickedRegister: false
  });

  const [status, setStatus] = useState({
    isLoggedIn: false,
    isInRegester: false,
  })
  const handleLogin = (value: neededValues) => {
    setValueFromLogin({ ...value });

    setStatus((prevStatus) => ({
      ...prevStatus,
      isLoggedIn: value.status == "200",
      isInRegester: value.clickedRegister,
    }));
    console.log(value.status)

    if (value.status === "403") {
      alert("wrong credentials");
    }
  };

  const [valueFromRegister, setValueFromRegister] = useState({
    status: ""

  })
  const handleRegister = (value: any) => {
    console.log("im here");
    console.log(value);
    setValueFromRegister({ status: value.status })
    if (value.status == "200") {
      alert("done registered")
    }
    if (value.status == "400") {
      alert("user already exist")
    }
    if (value.clickedLogin) {
      setStatus((prevStatus) => ({
        ...prevStatus,
        isLoggedIn: false,
        isInRegester:false,
      }));
    }
  }

  useEffect(() => {
    if (status.isLoggedIn) {
      console.log("App: now logged in")
    }
  }, [status.isLoggedIn])

  return (
    <div>
      {status.isLoggedIn ?
        <Profile name={valueFromLogin.username} email={valueFromLogin.email} /> :
        status.isInRegester ?
          <Register onReturnValue={handleRegister} /> :
          <Login onReturnValue={handleLogin} />}


    </div>
  )
}
