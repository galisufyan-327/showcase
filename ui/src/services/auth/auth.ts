import api from "../../common/helpers/api_helper";
import { RegisterUser, LoginTypes } from "./auth.types";

const registerUser = (body: RegisterUser) => api.post("/signup", body);
const loginUser = (body: LoginTypes) => api.post("/login", body);

export { registerUser, loginUser };
