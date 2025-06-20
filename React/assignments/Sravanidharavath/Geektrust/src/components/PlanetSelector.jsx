/* PlanetSelector.jsx */
import React from "react";

export default function PlanetSelector({ planets, selectedPlanets, setPlanet }) {
  return (
    <div className="select-section">
      <h2>Select planets you want to search in:</h2>
      {selectedPlanets.map((planet, index) => (
        <div key={index}>
          <label>Destination {index + 1}: </label>
          <select value={planet} onChange={e => setPlanet(index, e.target.value)}>
            <option value="">-- Select Planet --</option>
            {planets.map(p => (
              <option key={p.name} value={p.name}>{p.name}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}