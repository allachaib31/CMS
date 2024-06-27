//export const HOST = `http://localhost:4000/`;
export const HOST = `/`;
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
export const ADDMONTHLYSUBSCRIPTIONS_ROUTE = `${HOST}api/v1.0/subscriptions/monthly`
export const GETANNUALSUBSCRIPTIONS_ROUTE = `${HOST}api/v1.0/subscriptions/annual`;
export const GETANNUALSUBSCRIPTIONSDETAILS_ROUTE = `${HOST}api/v1.0/subscriptions/annualDetails`;
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