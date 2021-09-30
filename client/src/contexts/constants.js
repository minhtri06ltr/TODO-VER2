//global variables
export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "https://shielded-atoll-53826.herokuapp.com/api"
    : "somethinghere";
//name column in local storage
export const LOCAL_STORAGE_TOKEN_NAME =
  "learn-mern";
