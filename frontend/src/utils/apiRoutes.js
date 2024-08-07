export const HOST = `http://localhost:4000/`;
//export const HOST = `/`;
// Auth admin Route
export const LOGIN_ROUTE = `${HOST}api/v1.0/auth/login`;
export const VALIDATION_ROUTE = `${HOST}api/v1.0/auth/validation`;

// Manage user Route
export const ADDUSER_ROUTE = `${HOST}api/v1.0/users/addUser`;
export const GETUSER_ROUTE = `${HOST}api/v1.0/users/`;
export const SEARCHUSER_ROUTE = `${HOST}api/v1.0/users/search`;
export const UPDATEUSER_ROUTE = `${HOST}api/v1.0/users`
export const DELETEUSER_ROUTE = `${HOST}api/v1.0/users`;
export const UPDATEPASSWORD_ROUTE = `${HOST}api/v1.0/users/updatePassword`
// Manage admin Route
export const ADDADMIN_ROUTE = `${HOST}api/v1.0/admins/`;
export const GETADMIN_ROUTE = `${HOST}api/v1.0/admins/`;
export const SEARCHADMIN_ROUTE = `${HOST}api/v1.0/admins/search`;
export const UPDATEADMIN_ROUTE = `${HOST}api/v1.0/admins/`
export const DELETEADMIN_ROUTE = `${HOST}api/v1.0/admins/`;
// Manage subscription type
export const GETTYPESUBSCRIPTION_ROUTE = `${HOST}api/v1.0/typeSubscription`;
export const UPDATETYPESUBSCRIPTION_ROUTE = `${HOST}api/v1.0/typeSubscription`;
// Manage subscription
export const ADDFOUNDATIONSUBSCRIPTIONS_ROUTE = `${HOST}api/v1.0/subscriptions/foundation`;
export const ADDMONTHLYSUBSCRIPTIONS_ROUTE = `${HOST}api/v1.0/subscriptions/monthly`;
export const GETREGISTERFINANCIALDATA_ROUTE = `${HOST}api/v1.0/subscriptions/getRegisterFinancialData`
export const GETANNUALSUBSCRIPTIONS_ROUTE = `${HOST}api/v1.0/subscriptions/annual`;
export const GETANNUALSUBSCRIPTIONSDETAILS_ROUTE = `${HOST}api/v1.0/subscriptions/annualDetails`;
export const GETUSERFORFOUNDATIONSUBSCRIPE_ROUTE = `${HOST}api/v1.0/subscriptions/getUserForFoundationSubscripe`;
export const GETSUBSCRIPTIONHISTORY_ROUTE = `${HOST}api/v1.0/subscriptions/history`;
export const SEARCHSUBSCRIPTIONHISTORY_ROUTE = `${HOST}api/v1.0/subscriptions/search`;
export const UPDATECOMMENTSUBSCRIBEHISTORY_ROUTE = `${HOST}api/v1.0/subscriptions/updateCommentSubscribeHistory`;
export const UPDATECOMMENTRECORDANNUAL_ROUTE = `${HOST}api/v1.0/subscriptions/updateCommentRecordAnnual`;
export const GETSUBSCRIPTIONSFORM_ROUTE = `${HOST}api/v1.0/subscriptions/getSubscriptionsForm`;
export const GETOVERDUESUBSCRIPTIONS_ROUTE = `${HOST}api/v1.0/subscriptions/getOverdueSubscriptions`;
export const UPDATEINVOICEOVERDUE_ROUTE = `${HOST}api/v1.0/subscriptions/isInvoiceOverdue`;
export const ADDCOMMENTMONTHLY_ROUTE = `${HOST}api/v1.0/subscriptions/addCommentMonthly`;
// Manage moneyBox
export const GETMONEYBOX_ROUTE = `${HOST}api/v1.0/moneyBox`;
// Manage commodity revenu
export const ADDCOMMODITYREVENUE_ROUTE = `${HOST}api/v1.0/commodityRevenu`;
export const PAYINSTALLMENTSCHEDULE_ROUTE = `${HOST}api/v1.0/commodityRevenu/payInstallmentSchedule`; 
export const GETIDCOMMODITYREVENUE_ROUTE = `${HOST}api/v1.0/commodityRevenu/getIdCommodityRevenue`; 
export const GETCOMMODITYREVENUE_ROUTE = `${HOST}api/v1.0/commodityRevenu/getCommodityRevenue`;
export const GETINSTALLMENTSCHEDULE_ROUTE = `${HOST}api/v1.0/commodityRevenu/getInstallmentSchedule`;
export const GETFORMCONTRIBUTIONPURCHASECOMMODITY_ROUTE = `${HOST}api/v1.0/commodityRevenu/getFormContributionPurchaseCommodity`;
export const GETALLCOMMODITYREVENUEALL_ROUTE = `${HOST}api/v1.0/commodityRevenu/getAllCommodityRevenue`;
export const GETACTIVECOMMODITYREVENUE_ROUTE = `${HOST}api/v1.0/commodityRevenu/getActiveCommodityRevenue`;
export const GETCOMMODITYANDINSTALLMENT_ROUTE = `${HOST}api/v1.0/commodityRevenu/getCommidtyAndInstallment`;
export const ADDCOMMENTCOMMODITYREVENUE_ROUTE = `${HOST}api/v1.0/commodityRevenu/addCommentCommodityRevenue`;
export const ADDCOMMENTINSTALLMENTSCHEDULE_ROUTE = `${HOST}api/v1.0/commodityRevenu/addCommentInstallmentSchedule`;
//Manage Stock
export const ADDSTOCK_ROUTE = `${HOST}api/v1.0/stock/add`;
export const GETACTIVEUSER_ROUTE = `${HOST}api/v1.0/stock/getIdUsers`;
export const GETIDSTOCK_ROUTE = `${HOST}api/v1.0/stock/getIdStock`;
export const GETSTOCK_ROUTE = `${HOST}api/v1.0/stock/getStock`;
// Manage Loans
export const ADDLOANS_ROUTE = `${HOST}api/v1.0/loans`;
export const PAYINSTALLMENTS_ROUTE = `${HOST}api/v1.0/loans/payInstallments`;
export const GETLOANSHISTORY_ROUTE = `${HOST}api/v1.0/loans/history`;
export const GETLOANSID_ROUTE = `${HOST}api/v1.0/loans/getIdLoans`;
export const SEARCHLOANS_ROUTE = `${HOST}api/v1.0/loans/search`;
export const GETRECORDINSTALLMENTS_ROUTE = `${HOST}api/v1.0/loans/getRecordInstallments`;
// Manage reimbursed expenses
export const ADDTYPEEXPENSES_ROUTE = `${HOST}api/v1.0/reimbursedExpenses/addTypeExpenses`;
export const ADDEXPENSES_ROUTE = `${HOST}api/v1.0/reimbursedExpenses/addExpenses`;
export const GETTYPEEXPENSES_ROUTE = `${HOST}api/v1.0/reimbursedExpenses/getTypeExpenses`;
export const GETRECORDREIMBURSEDEXPENSES_ROUTE = `${HOST}api/v1.0/reimbursedExpenses/getRecordReimbursedExpenses`;
export const GETREIMBURSEDEXPENSES_ROUTE = `${HOST}api/v1.0/reimbursedExpenses/getReimbursedExpenses`;
export const DELETETYPEEXPENSES_ROUTE = `${HOST}api/v1.0/reimbursedExpenses/deleteTypeExpenses`;
// Manage unReimbursed expenses
export const ADDTYPEUNREIMBURSEDEXPENSES_ROUTE = `${HOST}api/v1.0/unReimbursedExpenses/addTypeExpenses`;
export const GETTYPEUNREIMBURSEDEXPENSES_ROUTE = `${HOST}api/v1.0/unReimbursedExpenses/getTypeExpenses`;
export const ADDUNREIMBURSEDEXPENSES_ROUTE = `${HOST}api/v1.0/unReimbursedExpenses/addExpenses`;
export const GETRECORDUNRECOVEREEXPENSES_ROUTE = `${HOST}api/v1.0/unReimbursedExpenses/getRecordUnrecovereExpenses`;
export const GETIDUNREIMBURSEDEXPENSES_ROUTE = `${HOST}api/v1.0/unReimbursedExpenses/getIdUnReimbursedExpenses`;
export const SEARCHUNREIMBURSEDEXPENSES_ROUTE = `${HOST}api/v1.0/unReimbursedExpenses/searchUnReimbursedExpenses`;
export const PAYCASHUNREIMBURSEDEXPENSES_ROUTE = `${HOST}api/v1.0/unReimbursedExpenses/payCash`;
export const GETUNREIMBURSEDEXPENSES_ROUTE = `${HOST}api/v1.0/unReimbursedExpenses/getUnReimbursedExpenses`;
export const DELETETYPEUNREIMBURSEDEXPENSES_ROUTE = `${HOST}api/v1.0/unReimbursedExpenses/deleteTypeExpenses`;

//Manage contribution revenue
export const GETCONSOLIDATEDRECORDREVENUES_ROUTE = `${HOST}api/v1.0/contributionRevenue/consolidatedRecordRevenues`;

//Manage contest
export const ADDCONTEST_ROUTE = `${HOST}api/v1.0/addContest`;
export const GETCONTEST_ROUTE = `${HOST}api/v1.0/getContest`;
export const ADDBRANCHE_ROUTE = `${HOST}api/v1.0/addBranche`;
export const GETBRANCHE_ROUTE = `${HOST}api/v1.0/getBranche`;
export const ADDQUESTION_ROUTE = `${HOST}api/v1.0/addQuestion`;
export const GETQUESTIONS_ROUTE = `${HOST}api/v1.0/getQuestions`;
export const REMOVEQUESTION_ROUTE = `${HOST}api/v1.0/removeQuestion`;

//Manage Vote
export const ADDVOTE_ROUTE = `${HOST}api/v1.0/vote/addVote`;
export const GETVOTE_ROUTE = `${HOST}api/v1.0/vote/getVote`;
export const VOTEDETAILS_ROUTE = `${HOST}api/v1.0/vote/voteDetails`;
//Manage advertising
export const ADDADVERTISING_ROUTE = `${HOST}api/v1.0/advertising`;
export const GETALLADVERTISING_ROUTE = `${HOST}api/v1.0/advertising/getAll`;
export const DELETEADVERTISING_ROUTE = `${HOST}api/v1.0/advertising/delete`;
//Manage agreements
export const ADDAGREEMENTS_ROUTE = `${HOST}api/v1.0/agreements/add`
export const GETAGREEMENTS_ROUTE = `${HOST}api/v1.0/agreements/`;
export const UPDATEAGREEMENTSACTIVE_ROUTE = `${HOST}api/v1.0/agreements/`
//Manage familyTree
export const CREATEFAMILYTREE_ROUTE = `${HOST}api/v1.0/familyTree/createNewFamilyTree`;
export const ADDTOFAMILYTREE_ROUTE = `${HOST}api/v1.0/familyTree`;
export const GETFAMILYTREE_ROUTE = `${HOST}api/v1.0/familyTree`;
export const UPDATEFAMILYTREE_ROUTE = `${HOST}api/v1.0/familyTree`;
export const GETFAMILYTREEUSEID = `${HOST}api/v1.0/familyTree/withId`;
export const GETIDFAMILYTREE_ROUTE = `${HOST}api/v1.0/familyTree/getListId`;
export const DELETEFAMILYTREE_ROUTE = `${HOST}api/v1.0/familyTree/delete`

//Manage client Route
//Manage auth
export const LOGINCLIENT_ROUTE = `${HOST}api/v1.0/authClient/login`;
export const VALIDATIONCLIENT_ROUTE = `${HOST}api/v1.0/authClient/validation`;
export const CLIENTINFORMATION_ROUTE = `${HOST}api/v1.0/clientInformation`;
export const CLIENTINFORMATIONAGREEMENTS_ROUTE = `${HOST}api/v1.0/clientInformation/agreements`;
export const GETELECTION_ROUTE = `${HOST}api/v1.0/clientInformation/getElection`;
export const SETVOTE_ROUTE = `${HOST}api/v1.0/clientInformation/vote`;
export const ELECTIONDETAILS_ROUTE = `${HOST}api/v1.0/clientInformation/electionDetails`
export const GETADVERTISING_ROUTE = `${HOST}api/v1.0/clientInformation/getAdvertising`;
export const GETTIMING_ROUTE = `${HOST}api/v1.0/competition/getTiming`;
export const GETUSERCOMPTETIONINFORMATION_ROUTE = `${HOST}api/v1.0/competition/getInformation`;
export const ENTERTOCONTEST_ROUTE = `${HOST}api/v1.0/competition/enterToContest`;
export const GETBRANCHEFORUSER_ROUTE = `${HOST}api/v1.0/competition/getBranches`;
export const GETQUESTIONSCOMPETITION_ROUTE = `${HOST}api/v1.0/competition/getQuestion`;
export const SAVERESPONSE_ROUTE = `${HOST}api/v1.0/competition/saveResponse`;
export const GETUSERRESULT_ROUTE = `${HOST}api/v1.0/competition/userResult`;
export const GETSUBSCRIPTIONCLIENT_ROUTE = `${HOST}api/v1.0/clientInformation/subscribe`;
export const GETCONTESTRESULT_ROUTE = `${HOST}api/v1.0/competition/getContestResult`
//PRINT
export const PRINTUNREIMBURSEDEXPENSES_ROUTE = `${HOST}api/v1.0/unReimbursedExpenses/printUnReimbursedExpenses`;
export const PRINTREIMBURSEDEXPENSES_ROUTE = `${HOST}api/v1.0/reimbursedExpenses/printReimbursedExpenses`;
