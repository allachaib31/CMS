//export const HOST = `http://localhost:5000/`;
export const HOST = `/`;
export const LOGIN_ROUTE = `${HOST}api/v1.0/auth/loginAdmin`;
export const VALIDATION_ROUTE = `${HOST}api/v1.0/auth/validation`;
export const ADDADMIN_ROUTE = `${HOST}api/v1.0/addAdmin`;
export const GETADMINS_ROUTE = `${HOST}api/v1.0/getAdmins`;
export const DELETEADMINS_ROUTE = `${HOST}api/v1.0/deleteAdmin`;
//Manage contest
export const ADDCONTEST_ROUTE = `${HOST}api/v1.0/addContest`;
export const GETCONTEST_ROUTE = `${HOST}api/v1.0/getContest`;
export const ADDBRANCHE_ROUTE = `${HOST}api/v1.0/addBranche`;
export const GETBRANCHE_ROUTE = `${HOST}api/v1.0/getBranche`;
export const ADDQUESTION_ROUTE = `${HOST}api/v1.0/addQuestion`;
export const GETQUESTIONS_ROUTE = `${HOST}api/v1.0/getQuestions`;
export const REMOVEQUESTION_ROUTE = `${HOST}api/v1.0/removeQuestion`;
export const REMOVECONTEST_ROUTE = `${HOST}api/v1.0/removeContest`;
export const REMOVEBRANCHE_ROUTE = `${HOST}api/v1.0/removeBranche`;
export const GETBRANCHEUSERID_ROUTE = `${HOST}api/v1.0/getBrancheUserId`;

//Manage client
export const LOGINUSER_ROUTE = `${HOST}api/v1.0/auth/loginUser`;
export const FORGETPASSWORD_ROUTE = `${HOST}api/v1.0/forgetPassword`
export const ADDUSER_ROUTE = `${HOST}api/v1.0/addUser`;
export const VALIDATIONUSER_ROUTE = `${HOST}api/v1.0/auth/validationClient`;
export const GETUSERS_ROUTE = `${HOST}api/v1.0/getUsers`;
export const DELETEUSER_ROUTE = `${HOST}api/v1.0/deleteUser`;
export const ACTIVEUSER_ROUTE = `${HOST}api/v1.0/activeUser`;

//Manage competition
export const GETTIMING_ROUTE = `${HOST}api/v1.0/competition/getTiming`;
export const GETBRANCHEUSER_ROUTE = `${HOST}api/v1.0/competition/getBranches`;
export const GETQUESTIONSCOMPETITION_ROUTE = `${HOST}api/v1.0/competition/getQuestions`;
export const SAVERESPONSE_ROUTE = `${HOST}api/v1.0/competition/saveResponse`;
export const GETUSERRESULT_ROUTE = `${HOST}api/v1.0/competition/userResult`;
export const GETLASTCONTEST_ROUTE = `${HOST}api/v1.0/competition/getContest`;
export const GETBRANCHEID_ROUTE = `${HOST}api/v1.0/competition/getBrancheId`;
export const GETUSERRESULTBRANCHE_ROUTE = `${HOST}api/v1.0/competition/getUserResultBranche`;