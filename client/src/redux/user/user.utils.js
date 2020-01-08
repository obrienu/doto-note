export const getHeaderConfig = getState => {
  //getToken from state
  const token = getState().user.token;

  //Header
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  //if token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
};
