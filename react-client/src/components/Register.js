import { useState } from "react";
import AuthService from "../services/AuthService";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleRegistrationSubmit(e) {
        e.preventDefault();
        AuthService.registerUser(username, password, "basicuser").then(async (response) => {
            console.log(response);
        });
    }

    return (
        <div>
            <form onSubmit={handleRegistrationSubmit}>
                <input type="text" name="username" placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
                <input type="password" name="password" placeholder="password" onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit"> Submit </button>
            </form>
        </div>
    )
}

export default Register;