import axios from "axios";
import { ADDADMIN_ROUTE, ADDUSER_ROUTE, DELETEADMIN_ROUTE, DELETEUSER_ROUTE, GETADMIN_ROUTE, GETUSER_ROUTE, LOGIN_ROUTE, SEARCHADMIN_ROUTE, SEARCHUSER_ROUTE, UPDATEADMIN_ROUTE, UPDATEUSER_ROUTE, VALIDATION_ROUTE } from "./apiRoutes";

axios.defaults.withCredentials = true;

// Auth admin fetch
export const loginFetch = async (admin) => {
    const  { data }  = await axios.post(LOGIN_ROUTE,admin);
    return data;
}

export const validationFetch = async() => {
    const  { data }  = await axios.get(VALIDATION_ROUTE);
    return data;
}

// Manage user fetch
export const addUserFetch = async (user) => {
    const data  = await axios.post(ADDUSER_ROUTE,user);
    return data;
}
export const getUserFetch = async (currentPage) => {
    const data = await axios.get(`${GETUSER_ROUTE}?page=${currentPage}`);
    return data;
}
export const searchUserFetch = async (search) => {
    const data = await axios.get(`${SEARCHUSER_ROUTE}?searchMethod=${search.searchMethod}&searchValue=${search.searchValue}`);
    return data;
}
export const updateUserFetch = async (user) => {
    const data = await axios.put(`${UPDATEUSER_ROUTE}`,user);
    return data;
}
export const deleteUserFetch = async (id) => {
    const data = await axios.delete(`${DELETEUSER_ROUTE}?id=${id}`);
    return data;
}
// Manage admin fetch
export const addAdminFetch = async (admin) => {
    const data = await axios.post(ADDADMIN_ROUTE,admin);
    return data;
}
export const getAdminFetch = async (currentPage) => {
    const data = await axios.get(`${GETADMIN_ROUTE}?page=${currentPage}`);
    return data;
}
export const searchAdminFetch = async (search) => {
    const data = await axios.get(`${SEARCHADMIN_ROUTE}?searchMethod=${search.searchMethod}&searchValue=${search.searchValue}`);
    return data;
}
export const updateAdminFetch = async (admin) => {
    const data = await axios.patch(UPDATEADMIN_ROUTE,admin);
    return data;
}
export const deleteAdminFetch = async (id) => {
    const data = await axios.delete(`${DELETEADMIN_ROUTE}?id=${id}`);
    return data;
}
