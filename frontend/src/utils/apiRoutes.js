export const HOST = `http://localhost:4000/`;

// Auth admin Route
export const LOGIN_ROUTE = `${HOST}api/v1.0/auth/login`;
export const VALIDATION_ROUTE = `${HOST}api/v1.0/auth/validation`;

// Manage user Route
export const ADDUSER_ROUTE = `${HOST}api/v1.0/users/addUser`;
export const GETUSER_ROUTE = `${HOST}api/v1.0/users/`;
export const SEARCHUSER_ROUTE = `${HOST}api/v1.0/users/search`;
export const UPDATEUSER_ROUTE = `${HOST}api/v1.0/users`
export const DELETEUSER_ROUTE = `${HOST}api/v1.0/users`;
// Manage admin Route
export const ADDADMIN_ROUTE = `${HOST}api/v1.0/admins/`;
export const GETADMIN_ROUTE = `${HOST}api/v1.0/admins/`;
export const SEARCHADMIN_ROUTE = `${HOST}api/v1.0/admins/search`;
export const UPDATEADMIN_ROUTE = `${HOST}api/v1.0/admins/`
export const DELETEADMIN_ROUTE = `${HOST}api/v1.0/admins/`;