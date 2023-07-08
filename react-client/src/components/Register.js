import { useState } from "react";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");
    const navigate = useNavigate();

    function handleRegistrationSubmit(e) {
        e.preventDefault();
        AuthService.registerUser(username, password, "basicuser").then(async (response) => {
            const jsonResponse = await response.json();
            setStatus(JSON.stringify(jsonResponse));

            if(response.ok) {
                navigate("/home");
            }
        });
    }

    return (
        <div>
            <form onSubmit={handleRegistrationSubmit}>
                <input type="text" name="username" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
                <input type="password" name="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit"> Submit </button>
            </form>

            <h3> {status} </h3>
        </div>
    )
}

export default Register;