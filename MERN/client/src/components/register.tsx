import React, { useState } from 'react'
import './register.css'
import axios from 'axios'
interface RegisterProps {
    onReturnValue: (value: any) => void; // Add this line
}
const Register: React.FC<RegisterProps> = ({ onReturnValue }: any) => {
    const [passwordState, setPasswordState] = useState({
        value: "",
        validations: {
            lowercase: false,
            uppercase: false,
            number: false,
            length: false,
        }
    })
    const [infoState, setInfoState] = useState({
        username: "",
        email: ""
    })

    const handleOnfocus = (event: any) => {
        const msg = document.getElementById("message")
        if (msg) {
            msg.style.display = "block";
        }
    }
    const handleOnBlur = () => {
        const msg = document.getElementById("message");
        if (msg) {
            msg.style.display = "none";
        }
    }
    // 
    const handleOnKeyUp = (event: any) => {
        // Access the password value using the event object
        const password = event.target.value;

        // Logic to check for lowercase, uppercase, number, and length
        const hasLowercase = /[a-z]/g.test(password);
        const hasUppercase = /[A-Z]/g.test(password);
        const hasNumber = /[0-9]/g.test(password);
        const hasValidLength = password.length >= 8;

        // Update state with validation status
        setPasswordState({
            value: password,
            validations: {
                lowercase: hasLowercase,
                uppercase: hasUppercase,
                number: hasNumber,
                length: hasValidLength,
            },
        });
    };
    // When the user clicks on the password field, show the message box
    const handleSubmit = (event: any) => {
        event.preventDefault();

        axios.post("/auth/register", { email: infoState.email, password: passwordState.value, username: infoState.username }).then((res) => {

            onReturnValue({ status: res.status })
        }).catch((error) => {
            console.log("got an error");
            console.log(error);
            onReturnValue({ status: error.response.status });
        })

    }
    const handleLogin = (event: any) => {

        onReturnValue({ ...onReturnValue, clickedLogin: true });

    }
    return (
        <div className='container'>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name='username' placeholder="username"
                    value={infoState.username}
                    onChange={(e) => setInfoState({ ...infoState, username: e.target.value })} required /><br />
                <input type="email" name="email" placeholder="Email"
                    value={infoState.email}
                    onChange={(e) => setInfoState({ ...infoState, email: e.target.value })}
                    required /><br />
                <input
                    type="password"
                    id="password"
                    placeholder="password"
                    name="password"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                    onFocus={handleOnfocus}
                    onBlur={handleOnBlur}
                    onKeyUp={handleOnKeyUp}
                    value={passwordState.value}
                    onChange={(e) => setPasswordState({ ...passwordState, value: e.target.value })}
                    required
                />
                <br />
                <input type="submit" value="register" />
                <button onClick={handleLogin}>Sign In</button>
            </form>



            <div id="message">
                <h3>Password must contain the following:</h3>
                <p id="letter" className={passwordState.validations.lowercase ? "valid" : "invalid"}>
                    A <b>lowercase</b> letter
                </p>
                <p id="capital" className={passwordState.validations.uppercase ? "valid" : "invalid"}>
                    A <b>capital (uppercase)</b> letter
                </p>
                <p id="number" className={passwordState.validations.number ? "valid" : "invalid"}>
                    A <b>number</b>
                </p>
                <p id="length" className={passwordState.validations.length ? "valid" : "invalid"}>
                    Minimum <b>8 characters</b>
                </p>
            </div>
        </div>

    )
}
export default Register