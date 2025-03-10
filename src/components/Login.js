import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-6 bg-white shadow-md">
        <h2 className="text-2xl font-bold">Login</h2>
        <input
          className="block w-full mt-2 p-2 border"
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="block w-full mt-2 p-2 border"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 mt-4"
          onClick={handleLogin}
        >
          Ingresar
        </button>
      </div>
    </div>
  );
};

export default Login;
