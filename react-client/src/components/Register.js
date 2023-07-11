import { useState } from "react";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router";
import './css/register.css';
import './css/style.css';
import authorizationServerUrl from "../authorization/links/authorizationServerUrl";
import { Link } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState([]);
    const navigate = useNavigate();

    function handleRegistrationSubmit(e) {
        e.preventDefault();
        AuthService.registerUser(username, password, "basicuser").then(async (response) => {
            const jsonResponse = await response.json();
            setStatus(Object.entries(jsonResponse));

            if (response.ok) {
                navigate("/home");
            }
        });
    }

    return (
        <div>
            <div className="login-page">
                <div className="form">
                    <h1>Gizmo</h1>
                    <h2>Please Register</h2>
                    <div className="error-container">
                        {status.map(([key, value]) => (
                            <div className="error" key={key}>
                                {value}
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleRegistrationSubmit} className="login-form">
                        <div>
                            <input type="text" name="username" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div>
                            <input type="password" name="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <input className="button" type="submit" value="Submit" />
                        <Link className="link-text" to={authorizationServerUrl() + "/login"}>
                            Have an account? Login.
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;