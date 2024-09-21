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
    ADDCOMMENTMONTHLY_ROUTE,
    ADDLOANS_ROUTE,
    GETLOANSHISTORY_ROUTE,
    GETLOANSID_ROUTE,
    SEARCHLOANS_ROUTE,
    GETRECORDINSTALLMENTS_ROUTE,
    ADDTYPEEXPENSES_ROUTE,
    ADDEXPENSES_ROUTE,
    GETTYPEEXPENSES_ROUTE,
    GETRECORDREIMBURSEDEXPENSES_ROUTE,
    GETREIMBURSEDEXPENSES_ROUTE,
    DELETETYPEEXPENSES_ROUTE,
    ADDTYPEUNREIMBURSEDEXPENSES_ROUTE,
    GETTYPEUNREIMBURSEDEXPENSES_ROUTE,
    ADDUNREIMBURSEDEXPENSES_ROUTE,
    GETRECORDUNRECOVEREEXPENSES_ROUTE,
    GETIDUNREIMBURSEDEXPENSES_ROUTE,
    SEARCHUNREIMBURSEDEXPENSES_ROUTE,
    PAYCASHUNREIMBURSEDEXPENSES_ROUTE,
    GETUNREIMBURSEDEXPENSES_ROUTE,
    GETUSERFORFOUNDATIONSUBSCRIPE_ROUTE,
    GETREGISTERFINANCIALDATA_ROUTE,
    PAYINSTALLMENTS_ROUTE,
    DELETETYPEUNREIMBURSEDEXPENSES_ROUTE,
    GETCONSOLIDATEDRECORDREVENUES_ROUTE,
    ADDCONTEST_ROUTE,
    GETCONTEST_ROUTE,
    ADDBRANCHE_ROUTE,
    GETBRANCHE_ROUTE,
    ADDQUESTION_ROUTE,
    GETQUESTIONS_ROUTE,
    REMOVEQUESTION_ROUTE,
    ADDVOTE_ROUTE,
    GETVOTE_ROUTE,
    VOTEDETAILS_ROUTE,
    ADDAGREEMENTS_ROUTE,
    GETAGREEMENTS_ROUTE,
    UPDATEAGREEMENTSACTIVE_ROUTE,
    CREATEFAMILYTREE_ROUTE,
    ADDTOFAMILYTREE_ROUTE,
    GETFAMILYTREE_ROUTE,
    UPDATEFAMILYTREE_ROUTE,
    GETFAMILYTREEUSEID,
    GETIDFAMILYTREE_ROUTE,
    LOGINCLIENT_ROUTE,
    VALIDATIONCLIENT_ROUTE,
    CLIENTINFORMATION_ROUTE,
    CLIENTINFORMATIONAGREEMENTS_ROUTE,
    GETELECTION_ROUTE,
    SETVOTE_ROUTE,
    ELECTIONDETAILS_ROUTE,
    ADDADVERTISING_ROUTE,
    GETALLADVERTISING_ROUTE,
    DELETEADVERTISING_ROUTE,
    GETADVERTISING_ROUTE,
    PRINTUNREIMBURSEDEXPENSES_ROUTE,
    PRINTREIMBURSEDEXPENSES_ROUTE,
    GETTIMING_ROUTE,
    GETUSERCOMPTETIONINFORMATION_ROUTE,
    ENTERTOCONTEST_ROUTE,
    GETBRANCHEFORUSER_ROUTE,
    GETQUESTIONSCOMPETITION_ROUTE,
    SAVERESPONSE_ROUTE,
    GETUSERRESULT_ROUTE,
    DELETEFAMILYTREE_ROUTE,
    GETSUBSCRIPTIONCLIENT_ROUTE,
    GETCONTESTRESULT_ROUTE,
    ADDSTOCK_ROUTE,
    GETACTIVEUSER_ROUTE,
    GETIDSTOCK_ROUTE,
    GETSTOCK_ROUTE,
    GETMEMBERFAMILYTREE_ROUTE,
    ADDNEWRELATION_ROUTE,
    ADDADDITIONALSTOCK,
    ADDBLOODMONEY_ROUTE,
    PAYBLOODMONEY_ROUTE,
    GETPAYMENTBLOODMONEY_ROUTE,
    GETRECORDBLOODMONEY_ROUTE,
    PAYAMOUNT_ROUTE,
    PAYCLIENTMONTHLY_ROUTE,
    ADDADS_ROUTE,
    DELETEADS_ROUTE,
    GETADS_ROUTE,
    GETADSCLIENT_ROUTE,
    UPLOADIMAGE_ROUTE,
    UPLOADCLIENTIMAGE_ROUTE,
    ENDDATEUSER_ROUTE,
    GETENDUSER_ROUTE,
    WITHDRAWBALANCE_ROUTE,
    CURRENTPRICE_ROUTE,
    SELLSTOCK_ROUTE,
    GETSTOCKCONTRIBUTIONRECORD,
    GETREGISTERSHAREHOLDERSSHARES_ROUTE,
    GETACTIVESTOCK_ROUTE,
    ADDAGREEMENTSFAMILY_ROUTE,
    GETAGREEMENTSFAMILY_ROUTE,
    UPDATEAGREEMENTSACTIVEFAMILY_ROUTE
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

export const uploadClientImageFetch = async (input) => {
    const data = await axios.post(UPLOADCLIENTIMAGE_ROUTE, input);
    return data;
}
export const uploadImageFetch = async (input) => {
    const data = await axios.post(UPLOADIMAGE_ROUTE, input);
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
export const getRegisterFinancialDataFetch = async () => {
    const data = await axios.get(GETREGISTERFINANCIALDATA_ROUTE);
    return data;
}
export const getUserForFoundationSubscripeFetch = async () => {
    const data = await axios.get(GETUSERFORFOUNDATIONSUBSCRIPE_ROUTE);
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
export const endDateUserFetch = async (inputs) => {
    const data = await axios.post(ENDDATEUSER_ROUTE, inputs);
    return data;
}
export const getEndUserFetch = async () => {
    const data = await axios.get(GETENDUSER_ROUTE);
    return data;
}
// Manage moneyBox
export const getMoneyBoxFetch = async () => {
    const data = await axios.get(GETMONEYBOX_ROUTE);
    return data;
}
export const withdrawBalanceFetch = async (inputs) => {
    const data = await axios.post(WITHDRAWBALANCE_ROUTE, inputs);
    return data;
}
// Manage commodity revenu
export const addCommodityRevenueFetch = async (inputs) => {
    const data = await axios.post(ADDCOMMODITYREVENUE_ROUTE,inputs);
    return data;
}
export const payAmountFetch = async (inputs) => {
    const data = await axios.post(PAYAMOUNT_ROUTE, inputs);
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
//Manage Stock
export const addStockFetch = async (inputs) => {
    const data = await axios.post(ADDSTOCK_ROUTE, inputs);
    return data;
}
export const addAdditionalStockFetch = async (inputs) => {
    const data = await axios.post(ADDADDITIONALSTOCK, inputs);
    return data;
}
export const getActiveUserFetch = async () => {
    const data = await axios.get(GETACTIVEUSER_ROUTE);
    return data;
}
export const getIdStockFetch = async (inputs) => {
    const data = await axios.get(`${GETIDSTOCK_ROUTE}?month=${inputs.month}&year=${inputs.year}`);
    return data;
}
export const getStockFetch = async (id) => {
    const data = await axios.get(`${GETSTOCK_ROUTE}?id=${id}`);
    return data;
}
export const currentPriceFetch = async (input) => {
    const data = await axios.post(CURRENTPRICE_ROUTE, input);
    return data;
}
export const sellStockFetch = async (inputs) => {
    const data = await axios.post(SELLSTOCK_ROUTE, inputs);
    return data;
}
export const getStockContributionRecord = async () => {
    const data = await axios.get(GETSTOCKCONTRIBUTIONRECORD);
    return data;
}
export const getRegisterShareholdersSharesFetch = async (id) => {
    const data = await axios.get(`${GETREGISTERSHAREHOLDERSSHARES_ROUTE}?id=${id}`);
    return data;
}
export const getActiveStockFetch = async (date) => {
    const data = await axios.get(`${GETACTIVESTOCK_ROUTE}?date=${date}`);
    return data;
}
// Manage Loans
export const addLoansFetch = async (inputs) => {
    const data = await axios.post(ADDLOANS_ROUTE,inputs);
    return data;
}
export const payInstallmentsFetch = async (inputs) => {
    const data = await axios.post(PAYINSTALLMENTS_ROUTE,inputs);
    return data;
}
export const getLoansHistoryFetch = async () => {
    const data = await axios.get(GETLOANSHISTORY_ROUTE);
    return data;
}
export const getIdLoansFetch = async () => {
    const data = await axios.get(GETLOANSID_ROUTE);
    return data;
}
export const searchLoansFetch = async (id) => {
    const data = await axios.get(`${SEARCHLOANS_ROUTE}?id=${id}`);
    return data;
}
export const getRecordInstallmentsFetch = async (id) => {
    const data = await axios.get(`${GETRECORDINSTALLMENTS_ROUTE}?id=${id}`);
    return data;
}

//Manage reimbursed expenses
export const addTypeExpensesFetch = async (inputs) => {
    const data = await axios.post(ADDTYPEEXPENSES_ROUTE, inputs);
    return data;
}
export const addExpensesFetch = async (inputs) => {
    const data = await axios.post(ADDEXPENSES_ROUTE, inputs);
    return data;
}
export const getTypeExpensesFetch = async () => {
    const data = await axios.get(GETTYPEEXPENSES_ROUTE);
    return data;
}
export const getRecordReimbursedExpensesFetch = async () => {
    const data = await axios.get(GETRECORDREIMBURSEDEXPENSES_ROUTE);
    return data;
}
export const getReimbursedExpensesFetch = async (inputs) => {
    const data = await axios.get(`${GETREIMBURSEDEXPENSES_ROUTE}?month=${inputs.month}&year=${inputs.year}`);
    return data;
}
export const deleteTypeExpensesFetch = async (inputs) => {
    const data = await axios.delete(`${DELETETYPEEXPENSES_ROUTE}?id=${inputs.id}`);
    return data;
}
//Manage unReimbursed expenses
export const addTypeUnReimbursedExpensesFetch = async (inputs) => {
    const data = await axios.post(ADDTYPEUNREIMBURSEDEXPENSES_ROUTE, inputs);
    return data;
}
export const deleteTypeUnReimbursedExpensesFetch = async (inputs) => {
    const data = await axios.delete(`${DELETETYPEUNREIMBURSEDEXPENSES_ROUTE}?id=${inputs.id}`);
    return data;
}
export const getTypeUnReimbursedExpensesFetch = async () => {
    const data = await axios.get(GETTYPEUNREIMBURSEDEXPENSES_ROUTE);
    return data;
}
export const addUnReimbursedExpensesFetch = async (inputs) => {
    const data = await axios.post(ADDUNREIMBURSEDEXPENSES_ROUTE, inputs);
    return data;
}
export const getRecordUnrecovereExpensesFetch = async () => {
    const data = await axios.get(GETRECORDUNRECOVEREEXPENSES_ROUTE);
    return data;
}
export const getIdUnReimbursedExpensesFetch = async () => {
    const data = await axios.get(GETIDUNREIMBURSEDEXPENSES_ROUTE);
    return data;
}
export const searchUnReimbursedExpensesFetch = async (id) => {
    const data = await axios.get(`${SEARCHUNREIMBURSEDEXPENSES_ROUTE}?id=${id}`);
    return data;
}
export const payCashUnReimbursedExpensesFetch = async (id) => {
    const data = await axios.post (PAYCASHUNREIMBURSEDEXPENSES_ROUTE, id);
    return data;
}
export const getUnReimbursedExpensesFetch = async (inputs) => {
    const data = await axios.get(`${GETUNREIMBURSEDEXPENSES_ROUTE}?month=${inputs.month}&year=${inputs.year}`);
    return data;
}
//Manage bloodMoney
export const addBloodMoneyFetch = async (inputs) => {
    const data = await axios.post(ADDBLOODMONEY_ROUTE,inputs);
    return data;
}
export const payBloodMoneyFetch = async (inputs) => {
    const data = await axios.post(PAYBLOODMONEY_ROUTE,inputs);
    return data;
}
export const getPaymentBloodMoneyFetch = async () => {
    const data = await axios.get(GETPAYMENTBLOODMONEY_ROUTE);
    return data;
}
export const getRecordBloodMoneyFetch = async () => {
    const data = await axios.get(GETRECORDBLOODMONEY_ROUTE);
    return data;
}
//Manage contribution revenue
export const getConsolidatedRecordRevenuesFetch = async () => {
    const data = await axios.get(GETCONSOLIDATEDRECORDREVENUES_ROUTE);
    return data;
}

//Manage contest
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
export const addVoteFetch = async (inputs) => {
    const data = await axios.post(ADDVOTE_ROUTE, inputs);
    return data;
}
export const getVoteFetch = async () => {
    const data = await axios.get(GETVOTE_ROUTE);
    return data;
}
export const voteDetailsFetch = async (id) => {
    const data = await axios.get(`${VOTEDETAILS_ROUTE}?id=${id}`);
    return data;
}
export const addAgreementsFetch = async (inputs) => {
    const data = await axios.post (ADDAGREEMENTS_ROUTE,inputs);
    return data;
}

export const getAgreementsFetch = async () => {
    const data = await axios.get (GETAGREEMENTS_ROUTE);
    return data;
}

export const updateAgreementsActiveFetch = async (inputs) => {
    const data = await axios.patch(UPDATEAGREEMENTSACTIVE_ROUTE, inputs);
    return data;
}
export const addAgreementsFamilyFetch = async (inputs) => {
    const data = await axios.post (ADDAGREEMENTSFAMILY_ROUTE,inputs);
    return data;
}

export const getAgreementsFamilyFetch = async () => {
    const data = await axios.get (GETAGREEMENTSFAMILY_ROUTE);
    return data;
}

export const updateAgreementsActiveFamilyFetch = async (inputs) => {
    const data = await axios.patch(UPDATEAGREEMENTSACTIVEFAMILY_ROUTE, inputs);
    return data;
}
//Manage advertising
export const addAdvertisingFetch = async (inputs) => {
    const data = await axios.post(ADDADVERTISING_ROUTE,inputs);
    return data;
}
export const getAdvertisingFetch = async () => {
    const data = await axios.get(GETALLADVERTISING_ROUTE);
    return data;
}
export const deleteAdvertisingFetch = async (id) => {
    const data = await axios.delete(`${DELETEADVERTISING_ROUTE}?id=${id}`);
    return data;
}  
export const addAdsFetch = async (inputs) => {
    const data = await axios.post(ADDADS_ROUTE, inputs);
    return data;
}
export const getAdsFetch = async () => {
    const data = await axios.get(GETADS_ROUTE);
    return data;
}
export const deleteAdsFetch = async (id) => {
    const data = await axios.delete(`${DELETEADS_ROUTE}?id=${id}`);
    return data;
}
//Manage family tree
export const createFamilyTreeFetch = async (inputs) => {
    const data = await axios.post(CREATEFAMILYTREE_ROUTE, inputs);
    return data;
}
export const addToFamilyTreeFetch = async (inputs) => {
    const data = await axios.post(ADDTOFAMILYTREE_ROUTE, inputs);
    return data;
}
export const addNewRelationFetch = async (inputs) => {
    const data = await axios.post(ADDNEWRELATION_ROUTE, inputs);
    return data;
}
export const getMemberFamilyTreeFetch = async (id) => {
    const data = await axios.get(`${GETMEMBERFAMILYTREE_ROUTE}?idFamilyTree=${id}`);
    return data;
}
export const getFamilyTreeFetch = async () => {
    const data = await axios.get(GETFAMILYTREE_ROUTE);
    return data;
}
export const updateFamilyTreeFetch = async (inputs) => {
    const data = await axios.patch(UPDATEFAMILYTREE_ROUTE,inputs);
    return data;
}
export const getFamilyTreeUseIdFetch = async (id) => {
    const data = await axios.get(`${GETFAMILYTREEUSEID}?id=${id}`);
    return data;
}
export const getIdFamilyTreeFetch = async () => {
    const data = await axios.get(GETIDFAMILYTREE_ROUTE);
    return data;
}
export const deleteFamilyTreeFetch = async (id) => {
    const data = await axios.delete(`${DELETEFAMILYTREE_ROUTE}?id=${id}`);
    return data;
}

// Auth client fetch
export const loginClientFetch = async (user) => {
    const { data } = await axios.post(LOGINCLIENT_ROUTE, user);
    return data;
}

export const validationClientFetch = async () => {
    const { data } = await axios.get(VALIDATIONCLIENT_ROUTE);
    return data;
}

export const clientInformationFetch = async () => {
    const  data = await axios.get(CLIENTINFORMATION_ROUTE);
    return data;
}

export const clientInformationAgreementsFetch = async () => {
    const data = await axios.get(CLIENTINFORMATIONAGREEMENTS_ROUTE);
    return data;
}

export const getElectionFetch = async () => {
    const data = await axios.get(GETELECTION_ROUTE);
    return data;
}

export const setVoteFetch = async (input) => {
    const data = await axios.post(SETVOTE_ROUTE, input);
    return data;
}
export const electionDetailsFetch = async (id) => {
    const data = await axios.get(`${ELECTIONDETAILS_ROUTE}?id=${id}`);
    return data;
}
export const getClientAdvertisingFetch = async () => {
    const data = await axios.get(GETADVERTISING_ROUTE);
    return data;
}
export const getClientAdsFetch = async () => {
    const data = await axios.get(GETADSCLIENT_ROUTE);
    return data;
}
export const getTimingFetch = async () => {
    const data = await axios.get(GETTIMING_ROUTE);
    return data;
}
export const getUserComptetionInformationFetch = async (id) => {
    const data = await axios.get(`${GETUSERCOMPTETIONINFORMATION_ROUTE}?idCompetition=${id}`);
    return data;
}
export const enterToContestFetch = async (inputs) => {
    const data = await axios.post(ENTERTOCONTEST_ROUTE, inputs);
    return data;
}
export const getBrancheForUserFetch = async (id) => {
    const data = await axios.get(`${GETBRANCHEFORUSER_ROUTE}?idContest=${id}`)
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
export const getUserResultFetch = async (id) => {
    const data = await axios.get(`${GETUSERRESULT_ROUTE}?id=${id}`)
    return data;
}
export const getSubscribeClientFetch = async (input) => {
    const data = await axios.post(`${GETSUBSCRIPTIONCLIENT_ROUTE}`, input);
    return data;
}
export const payClientMonthlyFetch = async (inputs) => {
    const data = await axios.post(`${PAYCLIENTMONTHLY_ROUTE}`, inputs);
    return data;
}
export const getContestResultFetch = async (id) => {
    const data = await axios.get(`${GETCONTESTRESULT_ROUTE}?id=${id}`);
    return data;
}
//PRINT
export const printUnReimbursedExpensesFetch = async (input) => {
    const data = await axios.get(`${PRINTUNREIMBURSEDEXPENSES_ROUTE}?from=${input.from}&to=${input.to}`)
    return data;
}
export const printReimbursedExpensesFetch = async (input) => {
    const data = await axios.get(`${PRINTREIMBURSEDEXPENSES_ROUTE}?from=${input.from}&to=${input.to}`)
    return data;
}