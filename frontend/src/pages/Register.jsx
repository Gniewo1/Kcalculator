import React, { useState } from "react";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://127.0.0.1:8000/auth/register/", {
      username,
      password,
    });
    localStorage.setItem("token", res.data.token);
    alert("Utworzono konto: " + res.data.user.username);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Login" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Hasło" />
      <button type="submit">Zarejestruj</button>
    </form>
  );
}