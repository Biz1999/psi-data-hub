import axios from "axios";

const token = process.env.ACCESS_TOKEN;

const api = axios.create({
  baseURL: "https://psi-app.tec.br/apiv1/api/v1",
  headers: { Authorization: `Bearer ${token}` },
});

export default api;
