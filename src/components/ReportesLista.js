import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const ReportesLista = () => {
  const [reportes, setReportes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/reportes/listar").then((res) => {
      setReportes(res.data);
    });

    socket.on("estado_actualizado", (data) => {
      setReportes((prev) =>
        prev.map((rep) =>
          rep.id === data.id ? { ...rep, estado: data.estado } : rep
        )
      );
    });

    return () => socket.off("estado_actualizado");
  }, []);

  const actualizarEstado = (id, estado) => {
    axios.put(`http://localhost:5000/api/reportes/${id}/estado`, { estado });
  };

  return (
    <div className="w-1/3 bg-white p-4">
      <h2 className="text-xl font-bold">Lista de Reportes</h2>
      {reportes.map((reporte) => (
        <div key={reporte.id} className="border-b py-2">
          <p>
            <strong>Tipo:</strong> {reporte.tipo_incidente}
          </p>
          <p>
            <strong>Estado:</strong> {reporte.estado}
          </p>
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
        </div>
      ))}
    </div>
  );
};

export default ReportesLista;
