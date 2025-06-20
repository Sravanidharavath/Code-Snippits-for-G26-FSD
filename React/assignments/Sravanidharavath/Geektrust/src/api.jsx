// api.js
import axios from "axios";
const BASE_URL = "https://findfalcone.geektrust.com";

export const getPlanets = () => axios.get(`${BASE_URL}/planets`);
export const getVehicles = () => axios.get(`${BASE_URL}/vehicles`);
export const getToken = () => axios.post(`${BASE_URL}/token`, {}, { headers: { Accept: "application/json" } });
export const findFalcone = (token, planet_names, vehicle_names) => axios.post(`${BASE_URL}/find`, { token, planet_names, vehicle_names }, { headers: { Accept: "application/json", "Content-Type": "application/json" } });