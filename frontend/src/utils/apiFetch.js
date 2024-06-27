import axios from "axios";
import {
    ADDADMIN_ROUTE,
    ADDFOUNDATIONSUBSCRIPTIONS_ROUTE,
    ADDMONTHLYSUBSCRIPTIONS_ROUTE,
    ADDUSER_ROUTE,
    UPDATEPASSWORD_ROUTE,
    DELETEADMIN_ROUTE,
    DELETEUSER_ROUTE,
    GETADMIN_ROUTE,
    GETANNUALSUBSCRIPTIONS_ROUTE,
    GETSUBSCRIPTIONHISTORY_ROUTE,
    GETTYPESUBSCRIPTION_ROUTE,
    GETUSER_ROUTE,
    LOGIN_ROUTE, 
    SEARCHADMIN_ROUTE,
    SEARCHUSER_ROUTE,
    UPDATEADMIN_ROUTE,
    UPDATETYPESUBSCRIPTION_ROUTE,
    UPDATEUSER_ROUTE,
    VALIDATION_ROUTE,
    SEARCHSUBSCRIPTIONHISTORY_ROUTE,
    UPDATECOMMENTSUBSCRIBEHISTORY_ROUTE,
    GETANNUALSUBSCRIPTIONSDETAILS_ROUTE,
    UPDATECOMMENTRECORDANNUAL_ROUTE,
    GETSUBSCRIPTIONSFORM_ROUTE,
    GETOVERDUESUBSCRIPTIONS_ROUTE,
    UPDATEINVOICEOVERDUE_ROUTE,
    GETMONEYBOX_ROUTE,
    ADDCOMMODITYREVENUE_ROUTE,
    GETIDCOMMODITYREVENUE_ROUTE,
    GETCOMMODITYREVENUE_ROUTE,
    GETINSTALLMENTSCHEDULE_ROUTE,
    GETFORMCONTRIBUTIONPURCHASECOMMODITY_ROUTE,
    GETALLCOMMODITYREVENUEALL_ROUTE,
    ADDCOMMENTCOMMODITYREVENUE_ROUTE,
    GETACTIVECOMMODITYREVENUE_ROUTE,
    GETCOMMODITYANDINSTALLMENT_ROUTE,
    PAYINSTALLMENTSCHEDULE_ROUTE,
    ADDCOMMENTINSTALLMENTSCHEDULE_ROUTE,
    ADDCOMMENTMONTHLY_ROUTE
} from "./apiRoutes";


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

// Manage user fetch
export const addUserFetch = async (user) => {
    const data = await axios.post(ADDUSER_ROUTE, user);
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
    const data = await axios.put(`${UPDATEUSER_ROUTE}`, user);
    return data;
}
export const deleteUserFetch = async (id) => {
    const data = await axios.delete(`${DELETEUSER_ROUTE}?id=${id}`);
    return data;
}
export const updatePasswordFetch = async (input) => {
    const data = await axios.patch(`${UPDATEPASSWORD_ROUTE}`, input);
    return data;
}
// Manage admin fetch
export const addAdminFetch = async (admin) => {
    const data = await axios.post(ADDADMIN_ROUTE, admin);
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
    const data = await axios.patch(UPDATEADMIN_ROUTE, admin);
    return data;
}
export const deleteAdminFetch = async (id) => {
    const data = await axios.delete(`${DELETEADMIN_ROUTE}?id=${id}`);
    return data;
}
// Manage subscription type
export const getTypeSubscriptionFetch = async () => {
    const data = await axios.get(GETTYPESUBSCRIPTION_ROUTE);
    return data;
}
export const updateTypeSubscriptionFetch = async (typeSubscription) => {
    const data = await axios.patch(UPDATETYPESUBSCRIPTION_ROUTE, typeSubscription);
    return data;
}
// Manage subscription
export const addFoundationSubscriptionsFetch = async (foundationSubscription) => {
    const data = await axios.post(ADDFOUNDATIONSUBSCRIPTIONS_ROUTE, foundationSubscription);
    return data;
}
export const addMonthlySubscriptionsFetch = async (monthlySubscription) => {
    const data = await axios.post(ADDMONTHLYSUBSCRIPTIONS_ROUTE, monthlySubscription);
    return data;
}
export const getAnnualSubscriptionsFetch = async (year) => {
    const data = await axios.get(`${GETANNUALSUBSCRIPTIONS_ROUTE}?year=${year}`);
    return data;
}
export const getAnnualSubscriptionsDetailsFetch = async (input) => {
    const data = await axios.get(`${GETANNUALSUBSCRIPTIONSDETAILS_ROUTE}?idUser=${input.idUser}&typeSearch=${input.typeSearch}&startYear=${input.startYear}&endYear=${input.endYear}`);
    return data;
}
export const getSubscriptionHistoryFetch = async (currentPage) => {
    const data = await axios.get(`${GETSUBSCRIPTIONHISTORY_ROUTE}?page=${currentPage}`);
    return data;
}
export const searchSubscriptionHistoryFetch = async (search) => {
    const data = await axios.get(`${SEARCHSUBSCRIPTIONHISTORY_ROUTE}?searchMethod=${search.searchMethod}&searchValue=${search.searchValue}`);
    return data;
}
export const updateCommentSubscribeHistoryFetch = async (input) => {
    const data = await axios.patch(UPDATECOMMENTSUBSCRIBEHISTORY_ROUTE,input);
    return data;
}
export const updateCommentRecordAnnualFetch = async (input) => {
    const data = await axios.patch(UPDATECOMMENTRECORDANNUAL_ROUTE, input);
    return data;
}
export const getSubscriptionsFormFetch = async (input) => {
    const data = await axios.post(`${GETSUBSCRIPTIONSFORM_ROUTE}`,input);
    return data;
}
export const getOverdueSubscriptionsFetch = async () => {
    const data = await axios.get(`${GETOVERDUESUBSCRIPTIONS_ROUTE}`);
    return data;
}
export const updateInvoiceOverdueFetch = async (input) => {
    const data = await axios.patch(UPDATEINVOICEOVERDUE_ROUTE,input);
    return data;
}
export const addCommentMonthlyFetch = async (comment) => {
    const data = await axios.patch(ADDCOMMENTMONTHLY_ROUTE,comment);
    return data;
}
// Manage moneyBox
export const getMoneyBoxFetch = async () => {
    const data = await axios.get(GETMONEYBOX_ROUTE);
    return data;
}
// Manage commodity revenu
export const addCommodityRevenueFetch = async (inputs) => {
    const data = await axios.post(ADDCOMMODITYREVENUE_ROUTE,inputs);
    return data;
}
export const payInstallmentScheduleFetch = async (idInstallmentSchedule) => {
    const data = await axios.post(PAYINSTALLMENTSCHEDULE_ROUTE,{
        idInstallmentSchedule
    });
    return data;
}
export const getIdCommodityRevenueFetch = async (inputs) => {
    const data = await axios.get(`${GETIDCOMMODITYREVENUE_ROUTE}?month=${inputs.month}&year=${inputs.year}`);
    return data;
}
export const getCommodityRevenueFetch = async (id) => {
    const data = await axios.get(`${GETCOMMODITYREVENUE_ROUTE}?id=${id}`);
    return data;
}
export const getInstallmentScheduleFetch = async (id) => {
    const data = await axios.get(`${GETINSTALLMENTSCHEDULE_ROUTE}?id=${id}`);
    return data;
}
export const getFormContributionPurchaseCommodityFetch = async (id) => {
    const data = await axios.get(`${GETFORMCONTRIBUTIONPURCHASECOMMODITY_ROUTE}?id=${id}`);
    return data;
}
export const getAllCommodityRevenueFetch = async () => {
    const data = await axios.get(GETALLCOMMODITYREVENUEALL_ROUTE);
    return data;
}
export const getActiveCommodityRevenueFetch = async (date) => {
    const data = await axios.get(`${GETACTIVECOMMODITYREVENUE_ROUTE}?date=${date}`);
    return data;
}
export const getCommidtyAndInstallmentFetch = async (id) => {
    const data = await axios.get(`${GETCOMMODITYANDINSTALLMENT_ROUTE}?id=` + id);
    return data;
}
export const addCommentCommodityRevenueFetch = async (inputs) => {
    const data = await axios.patch(ADDCOMMENTCOMMODITYREVENUE_ROUTE,inputs);
    return data;
}
export const addCommentInstallmentScheduleFetch = async (inputs) => {
    const data = await axios.patch(ADDCOMMENTINSTALLMENTSCHEDULE_ROUTE,inputs);
    return data;
}