import axios from "axios";
import { toast } from "react-toastify";
import { routesConstant } from "../../routes/routes";

export function getToken() {
  const token = localStorage.getItem("token");

  if (token) return token;
  return null;
}

const API_URL = import.meta.env.VITE_BASE_URL;
const axiosApi = axios.create({
  baseURL: `${API_URL}/api/v1`,
});

axiosApi.interceptors.request.use((config: any) => {
  if (getToken()) {
    config.headers["x-auth-token"] = getToken();
  }
  return config;
});

axiosApi.interceptors.response.use(
  (resp: any) => resp.data,
  (error: any) => {
    const message =
      error?.response?.data?.error ??
      error?.response?.data?.message ??
      "Something Went Wrong";
      if(error?.response.status===401){
        localStorage.clear();
        window.location.href=routesConstant.LOGIN
      }
      else{
        toast.error(message);
      }
  
    return Promise.reject(error);
  }
);

export default axiosApi