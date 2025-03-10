import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const Reportes = () => {
  const [reportes, setReportes] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/reportes/listar").then((res) => {
      setReportes(res.data);
    });

    socket.on("connect", () => {
      console.log("Conectado al servidor:", socket.id);
    });

    socket.on("nuevo_reporte", (data) => {
      setReportes((prev) => [data, ...prev]);
    });

    socket.on("estado_actualizado", (data) => {
      setReportes((prev) =>
        prev.map((rep) =>
          rep.id === data.id ? { ...rep, estado: data.estado } : rep
        )
      );
    });

    return () => {
      socket.off("nuevo_reporte");
      socket.off("estado_actualizado");
    };
  }, []);

  const actualizarEstado = (id, estado) => {
    axios.put(`http://localhost:5000/api/reportes/${id}/estado`, { estado });
  };

  const reportesFiltrados = reportes.filter((reporte) => {
    return (
      (filtroEstado ? reporte.estado === filtroEstado : true) &&
      (filtroTipo ? reporte.tipo_incidente === filtroTipo : true)
    );
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Gestión de Reportes</h2>

      {/* Filtros */}
      <div className="mb-4 flex gap-4">
        <select
          className="p-2 border"
          onChange={(e) => setFiltroEstado(e.target.value)}
        >
          <option value="">Filtrar por estado</option>
          <option value="Pendiente">Pendiente</option>
          <option value="Atendido">Atendido</option>
          <option value="Descartado">Descartado</option>
        </select>

        <select
          className="p-2 border"
          onChange={(e) => setFiltroTipo(e.target.value)}
        >
          <option value="">Filtrar por tipo</option>
          <option value="Robo">Robo</option>
          <option value="Pelea">Pelea</option>
          <option value="Accidente">Accidente</option>
        </select>
      </div>

      {/* Tabla de Reportes */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Fecha</th>
            <th className="border p-2">Tipo</th>
            <th className="border p-2">Ubicación</th>
            <th className="border p-2">Estado</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reportesFiltrados.map((reporte) => (
            <tr key={reporte.id} className="border">
              <td className="border p-2">
                {new Date(reporte.fecha).toLocaleString()}
              </td>
              <td className="border p-2">{reporte.tipo_incidente}</td>
              <td className="border p-2">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${reporte.latitud},${reporte.longitud}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Ver Mapa
                </a>
              </td>
              <td className="border p-2">{reporte.estado}</td>
              <td className="border p-2">
                <button
                  onClick={() => actualizarEstado(reporte.id, "Atendido")}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Atendido
                </button>
                <button
                  onClick={() => actualizarEstado(reporte.id, "Descartado")}
                  className="bg-red-500 text-white px-2 py-1 ml-2 rounded"
                >
                  Descartar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reportes;
