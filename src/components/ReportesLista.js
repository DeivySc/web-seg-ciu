import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import {
  ArrowPathIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";

const socket = io("http://localhost:5000");

const ReportesLista = () => {
  const [reportes, setReportes] = useState([]);

  const getIconForEstado = (estado) => {
    switch (estado) {
      case "resuelto":
        return <CheckCircleIcon className="w-8 h-8 text-green-500" />;
      case "pendiente":
        return <ExclamationCircleIcon className="w-8 h-8 text-red-500" />;
      case "en proceso":
        return <ArrowPathIcon className="w-8 h-8 text-yellow-500" />;
      default:
        return null;
    }
  };

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
    <ul class="w-full space-y-4">
      {reportes.map((reporte) => (
        <li class="pb-3 sm:pb-4 bg-white rounded-lg shadow-md p-2 flex flex-col items-center">
          <div class="flex items-center space-x-4 rtl:space-x-reverse">
            <div class="shrink-0">{getIconForEstado(reporte.estado)}</div>
            <div class="flex-1 min-w-0 text-center">
              <p class="text-sm font-medium text-gray-900 truncate">
                {reporte.tipo_incidente}
              </p>
              <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                email@flowbite.com
              </p>
            </div>
            <div class="inline-flex items-center text-[11px] font-bold text-gray-900">
              {reporte.estado}
            </div>
          </div>
          <div class="mt-2 flex space-x-2">
            <button
              onClick={() => actualizarEstado(reporte.id, "Atendido")}
              className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Atendido
            </button>
            <button
              onClick={() => actualizarEstado(reporte.id, "Descartado")}
              className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Descartar
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ReportesLista;

/* 
<div className="w-full p-4">
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
*/
