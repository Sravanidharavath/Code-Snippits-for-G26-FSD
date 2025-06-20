/* VehicleDropdown.jsx */
import React from "react";

export default function VehicleDropdown({ vehicles, selectedPlanets, selectedVehicles, setVehicle }) {
  return (
    <div className="vehicle-section">
      {selectedPlanets.map((planetName, index) => {
        const planet = selectedPlanets[index];
        return (
          <div key={index} className="radio-group">
            {vehicles.map(vehicle => (
              vehicle.max_distance >= planet?.distance && vehicle.total_no > 0 && (
                <label key={vehicle.name} style={{ marginRight: '15px' }}>
                  <input
                    type="radio"
                    name={`vehicle-${index}`}
                    value={vehicle.name}
                    checked={selectedVehicles[index] === vehicle.name}
                    onChange={() => setVehicle(index, vehicle.name)}
                  />
                  {vehicle.name} ({vehicle.total_no})
                </label>
              )
            ))}
          </div>
        );
      })}
    </div>
  );
}
