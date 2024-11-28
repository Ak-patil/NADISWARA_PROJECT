import axios from "axios";
import {
  errorHandler,
  requestHandler,
  successHandler,
} from "./NetworkInterceptors";

export const BASE_API_CONFIG = {
  applicationName: "Dev",
  requestTimeOut: 20 * 1000,
};

const axiosInstance = axios.create({
  baseURL: "https://nadiswarapro-backend.online",
  timeout: BASE_API_CONFIG.requestTimeOut,
  // headers: { 'api-token': AppConfig.API_TOKEN }
});

// Add interceptors
axiosInstance.interceptors.request.use((request) => requestHandler(request));
axiosInstance.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error)
);

export default axiosInstance;
