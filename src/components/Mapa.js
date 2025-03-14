import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Polygon,
  HeatmapLayer,
} from "@react-google-maps/api";
import axios from "axios";
import { clusterPoints } from "./../utils/Agrupar";

const Mapa = () => {
  const [reportes, setReportes] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [error, setError] = useState(null);

  const iconosIncidentes = {
    Robo: "https://imgur.com/9y9hNH5.png",
    Pelea: "https://i.imgur.com/x430fbO.png",
    Accidente: "https://imgur.com/Clr4egD.png",
    Incendio: "https://imgur.com/zoZfCwI.png",
    Asalto: "https://imgur.com/9y9hNH5.png",
    Emergencia_Médica: "https://imgur.com/KpXYMsx.png",
    Violencia_Doméstica: "https://imgur.com/pjnB5Ca.png",
    otro: "https://imgur.com/pjnB5Ca.png",
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/reportes/ubicaciones")
      .then((res) => {
        setReportes(res.data);
        setClusters(clusterPoints(res.data, 0.001));
      })
      .catch((err) => {
        console.error("Error al obtener ubicaciones:", err);
        setError("No se pudo cargar los reportes, losiento");
      });
  }, []);

  const heatmapData = reportes.map((reporte) => ({
    location: new window.google.maps.LatLng(
      Number(reporte.latitud),
      Number(reporte.longitud)
    ),
    weight: 1,
  }));

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBZ2aWZ_oe6fEe88s0g-_vahHARCXjoWYY"
      libraries={["visualization"]}
    >
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "80vh" }}
          center={{ lat: -13.05115, lng: -76.430532 }}
          zoom={17}
        >
          {reportes.map((reporte) => {
            const tipoNormalizado = reporte.tipo_incidente.replace(/ /g, "_");
            return (
              <Marker
                key={reporte.id}
                position={{
                  lat: Number(reporte.latitud), // Asegura que sea número
                  lng: Number(reporte.longitud),
                }}
                title={reporte.tipo_incidente} // Muestra un tooltip con el tipo de incidente
                icon={
                  iconosIncidentes[tipoNormalizado] || iconosIncidentes.otro
                }
              />
            );
          })}
          {clusters.map((polygonCoords, index) => (
            <Polygon
              key={index}
              paths={polygonCoords}
              options={{
                fillColor: "rgba(255, 0, 0, 0.3)",
                strokeColor: "red",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillOpacity: 0.35,
              }}
            />
          ))}

          {heatmapData.length > 0 && (
            <HeatmapLayer
              data={heatmapData}
              options={{
                radius: 40,
                opacity: 0.6,
                dissipating: true,
                gradient: [
                  "rgba(0, 255, 255, 0)", // Transparente
                  "rgba(0, 255, 0, 1)", // Verde
                  "rgba(173, 255, 47, 1)", // Verde claro
                  "rgba(255, 255, 0, 1)", // Amarillo
                  "rgba(255, 165, 0, 1)", // Naranja
                  "rgba(255, 69, 0, 1)", // Naranja oscuro
                  "rgba(255, 0, 0, 1)", // Rojo
                  "rgba(139, 0, 0, 1)", // Rojo oscuro
                  /* "rgba(75, 0, 130, 1)", // Índigo
                  "rgba(0, 0, 255, 1)", // Azul */
                ],
              }}
            />
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default Mapa;
