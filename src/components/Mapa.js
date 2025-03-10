import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";

const Mapa = () => {
  const [reportes, setReportes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/reportes/ubicaciones")
      .then((res) => setReportes(res.data))
      .catch((err) => {
        console.error("Error al obtener ubicaciones:", err);
        setError("No se pudo cargar los reportes, losiento");
      });
  }, []);

  return (
    <LoadScript googleMapsApiKey="AIzaSyBZ2aWZ_oe6fEe88s0g-_vahHARCXjoWYY">
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <GoogleMap
          mapContainerStyle={{ width: "80%", height: "80vh" }}
          center={{ lat: -12.04318, lng: -77.02824 }}
          zoom={14}
        >
          {reportes.map((reporte) => (
            <Marker
              key={reporte.id}
              position={{
                lat: Number(reporte.latitud), // Asegura que sea número
                lng: Number(reporte.longitud),
              }}
              title={reporte.tipo_incidente} // Muestra un tooltip con el tipo de incidente
            />
          ))}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default Mapa;
