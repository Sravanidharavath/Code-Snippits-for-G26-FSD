/* Home.jsx */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPlanets, getVehicles, getToken, findFalcone } from "../api";
import PlanetSelector from "../components/PlanetSelector";
import VehicleDropdown from "../components/VehicleDropdown";

export default function Home() {
  const [planets, setPlanets] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selectedPlanets, setSelectedPlanets] = useState(["", "", "", ""]);
  const [selectedVehicles, setSelectedVehicles] = useState(["", "", "", ""]);
  const [totalTime, setTotalTime] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getPlanets().then(res => setPlanets(res.data));
    getVehicles().then(res => setVehicles(res.data));
  }, []);

  useEffect(() => {
    let time = 0;
    selectedPlanets.forEach((planetName, index) => {
      const planet = planets.find(p => p.name === planetName);
      const vehicle = vehicles.find(v => v.name === selectedVehicles[index]);
      if (planet && vehicle) {
        time += planet.distance / vehicle.speed;
      }
    });
    setTotalTime(time);
  }, [selectedPlanets, selectedVehicles]);

  const setPlanet = (index, value) => {
    const updated = [...selectedPlanets];
    updated[index] = value;
    setSelectedPlanets(updated);
  };

  const setVehicle = (index, value) => {
    const updated = [...selectedVehicles];
    updated[index] = value;
    setSelectedVehicles(updated);
  };

  const handleSubmit = async () => {
    const token = (await getToken()).data.token;
    const response = await findFalcone(token, selectedPlanets, selectedVehicles);
    navigate("/result", { state: { result: response.data, time: totalTime } });
  };

  return (
    <div className="app-container">
      <h1>🚀 Finding Falcone!</h1>
      <PlanetSelector planets={planets} selectedPlanets={selectedPlanets} setPlanet={setPlanet} />
      <VehicleDropdown
        vehicles={vehicles}
        selectedPlanets={selectedPlanets.map(name => planets.find(p => p.name === name))}
        selectedVehicles={selectedVehicles}
        setVehicle={setVehicle}
      />
      <div>Time taken: {totalTime}</div>
      <button onClick={handleSubmit}>Find Falcone!</button>
    </div>
  );
}