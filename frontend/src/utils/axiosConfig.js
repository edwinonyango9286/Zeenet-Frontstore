const getTokenFromLocalStorge = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorge !== null ? getTokenFromLocalStorge.token : ""
    }`,
    Accept: "application/json",
  },
};
