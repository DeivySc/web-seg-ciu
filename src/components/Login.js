import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [celular, setCelular] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(null);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        celular,
        contraseña,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.error || "Error al iniciar sesión");
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-md lg:max-w-4xl">
        <div
          className="hidden lg:block lg:w-1/2 bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')",
          }}
        ></div>
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">
            Seguridad Ciudadana
          </h2>
          <p className="text-xl text-gray-600 text-center">Bienvenido!</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 lg:w-1/4"></span>
            <span className="text-xs text-center text-gray-500 uppercase">
              Iniciar Sesión
            </span>
            <span className="border-b w-1/5 lg:w-1/4"></span>
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Número de Celular
            </label>
            <input
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full"
              type="text"
              autoComplete="off"
              value={celular}
              onChange={(e) => setCelular(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <div className="flex justify-between">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Contraseña
              </label>
              <a href="#" className="text-xs text-gray-500">
                ¿Recordar Contraseña?
              </a>
            </div>
            <input
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full"
              type="password"
              autoComplete="off"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
            />
          </div>
          <div className="mt-8">
            <button
              className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
              onClick={handleLogin}
            >
              Ingresar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
