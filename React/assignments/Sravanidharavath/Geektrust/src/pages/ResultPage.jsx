/* ResultPage.jsx */
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResultPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleRestart = () => {
    navigate("/");
  };

  return (
    <div className="app-container">
      <h1>Finding Falcone!</h1>
      {state?.result?.status === "success" ? (
        <div className="result-container">
          <p>Success! Congratulations on Finding Falcone. King Shan is mighty pleased.</p>
          <p>Time taken: {state.time}</p>
          <p>Planet found: {state.result.planet_name}</p>
        </div>
      ) : (
        <div className="result-container">
          <p>Failure! Could not find Falcone.</p>
        </div>
      )}
      <button onClick={handleRestart}>Start Again</button>
    </div>
  );
}