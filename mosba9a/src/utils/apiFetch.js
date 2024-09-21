import axios from "axios";
import { ACTIVEUSER_ROUTE, ADDADMIN_ROUTE, ADDBRANCHE_ROUTE, ADDCONTEST_ROUTE, ADDQUESTION_ROUTE, ADDUSER_ROUTE, DELETEADMINS_ROUTE, DELETEUSER_ROUTE, FORGETPASSWORD_ROUTE, GETADMINS_ROUTE, GETBRANCHEID_ROUTE, GETBRANCHEUSERID_ROUTE, GETBRANCHEUSER_ROUTE, GETBRANCHE_ROUTE, GETCONTEST_ROUTE, GETLASTCONTEST_ROUTE, GETQUESTIONSCOMPETITION_ROUTE, GETQUESTIONS_ROUTE, GETTIMING_ROUTE, GETUSERRESULTBRANCHE_ROUTE, GETUSERRESULT_ROUTE, GETUSERS_ROUTE, LOGINUSER_ROUTE, LOGIN_ROUTE, REMOVEBRANCHE_ROUTE, REMOVECONTEST_ROUTE, REMOVEQUESTION_ROUTE, SAVERESPONSE_ROUTE, VALIDATIONUSER_ROUTE, VALIDATION_ROUTE } from "./apiRoutes";

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

export const addAdminFetch = async (inputs) => {
    const data  = await  axios.post(ADDADMIN_ROUTE, inputs);
    return data;
}

export const getAdminFetch = async () => {
    const data = await axios.get(GETADMINS_ROUTE);
    return data;
}
export const deleteAdminFetch = async (id) => {
    const data = await axios.delete(`${DELETEADMINS_ROUTE}?id=${id}`);
    return data;
}

export const addContestFetch = async (input) => {
    const data = await axios.post(ADDCONTEST_ROUTE,input);
    return data;
}
export const getContestFetch = async () => {
    const data = await axios.get(GETCONTEST_ROUTE);
    return data;
};
export const addBrancheFetch = async (input) => {
    const data = await axios.post(ADDBRANCHE_ROUTE, input);
    return data;
}
export const getBrancheFetch = async (id) => {
    const data = await axios.get(`${GETBRANCHE_ROUTE}?idContest=${id}`);
    return data;
}
export const addQuestionFetch = async (inputs) => {
    const data = await axios.post(ADDQUESTION_ROUTE, inputs);
    return data;
}
export const getQuestionsFetch = async (idBranche) => {
    const data = await axios.get(`${GETQUESTIONS_ROUTE}?idBranche=${idBranche}`);
    return data;
}
export const removeQuestionFetch = async (idQuestion) => {
    const data = await axios.delete(`${REMOVEQUESTION_ROUTE}?idQuestion=${idQuestion}`);
    return data;
}
export const removeContestFetch = async (id) => {
    const data = await axios.delete(`${REMOVECONTEST_ROUTE}?id=${id}`);
    return data;
}
export const removeBrancheFetch = async (id) => {
    const data = await axios.delete(`${REMOVEBRANCHE_ROUTE}?id=${id}`);
    return data;
}
export const getBrancheUserIdFetch = async (id) => {
    const data = await axios.get(`${GETBRANCHEUSERID_ROUTE}?id=${id}`);
    return data;
}
//Manage user
export const loginUserFetch = async (user) => {
    const { data } = await axios.post(LOGINUSER_ROUTE, user);
    return data;
}
export const forgetPasswordFetch = async (inputs) => {
    const data = await axios.post(FORGETPASSWORD_ROUTE, inputs);
    return data;
}
export const validationUserFetch = async () => {
    const { data } = await axios.get(VALIDATIONUSER_ROUTE);
    return data;
}

export const addUserFetch = async (inputs) => {
    const data  = await  axios.post(ADDUSER_ROUTE, inputs);
    return data;
}
export const getUsersFetch = async () => {
    const data = await axios.get(GETUSERS_ROUTE);
    return data;
}
export const deleteUsersFetch = async (id) => {
    const data = await axios.delete(`${DELETEUSER_ROUTE}?id=${id}`);
    return data;
}
export const activeUserFetch = async (inputs) => {
    const data = await axios.post(ACTIVEUSER_ROUTE,inputs)
    return data;
}

//Manage competition
export const getTimingFetch = async () => {
    const data = await axios.get(GETTIMING_ROUTE);
    return data;
}
export const getBrancheUserFetch = async (id) => {
    const data = await axios.get(`${GETBRANCHEUSER_ROUTE}?id=${id}`);
    return data;
}
export const getQuestionsCompetitionFetch = async (id,idBranche) => {
    const data = await axios.get(`${GETQUESTIONSCOMPETITION_ROUTE}?id=${id}&idBranche=${idBranche}`)
    return data;
}
export const saveResponseFetch = async (inputs) => {
    const data = await axios.post(SAVERESPONSE_ROUTE, inputs);
    return data;
}
export const getUserResultFetch = async (id) =>{
    const data = await axios.get(`${GETUSERRESULT_ROUTE}?id=${id}`)
    return data
}
export const getLastContestFetch = async () => {
    const data = await axios.get(GETLASTCONTEST_ROUTE);
    return data;
}
export const getBrancheIdFetch = async (id) =>{
    const data = await axios.get(`${GETBRANCHEID_ROUTE}?id=${id}`)
    return data
}
export const getUserResultBranche = async (id) =>{
    const data = await axios.get(`${GETUSERRESULTBRANCHE_ROUTE}?id=${id}`)
    return data
}