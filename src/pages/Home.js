import React from "react";
import Mapa from "../components/Mapa";
import ReportesLista from "../components/ReportesLista";

const Home = () => {
  return (
    <div class="p-4">
      <div class="grid grid-cols-3 gap-4 mb-4">
        <div class="flex items-center col-span-2 justify-center rounded-sm bg-gray-50 ">
          <Mapa />
        </div>
        <div class="w-full max-w-4xl h-[80vh] overflow-y-auto rounded-sm bg-gray-50 p-6">
          <ReportesLista />
        </div>
      </div>
    </div>
  );
};

export default Home;
