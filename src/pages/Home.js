import React from "react";
import Mapa from "../components/Mapa";
import ReportesLista from "../components/ReportesLista";

const Home = () => {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-grow">
        <Mapa />
        <ReportesLista />
      </div>
    </div>
  );
};

export default Home;
