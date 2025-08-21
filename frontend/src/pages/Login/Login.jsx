import { useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import { useNavigate } from 'react-router-dom';
import "./Login.css";


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://127.0.0.1:8000/auth/login/", {
      username,
      password,
    });
    localStorage.setItem("token", res.data.token);
    alert("Login as " + res.data.user.username);
    navigate('/');

  };

  return (
    <>
    <Navbar/>
      <form className="login" onSubmit={handleSubmit}>
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Login" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Log In</button>
      </form>
    </>
  );
}