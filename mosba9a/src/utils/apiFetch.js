import axios from "axios";
import { LOGIN_ROUTE, VALIDATION_ROUTE } from "./apiRoutes";

axios.defaults.withCredentials = true;

// Auth admin fetch
export const loginFetch = async (admin) => {
    const { data } = await axios.post(LOGIN_ROUTE, admin);
    return data;
}

export const validationFetch = async () => {
    const { data } = await axios.get(VALIDATION_ROUTE);
    return data;
}