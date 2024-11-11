const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${user !== null ? user.token : ""}`,
    Accept: "application/json",
  },
  withCredentials: true,
};
