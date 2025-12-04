import * as nodeFetch from "node-fetch";

export const getLoginToken = async (userApiLoginDetails) => {
  const response = await nodeFetch("http://localhost:2221/api/login", {
    method: "POST",
    body: JSON.stringify({
      username: userApiLoginDetails.login,
      password: userApiLoginDetails.password,
    }),
  });
  if (response.status !== 200) {
    throw new Error("Incorrect credentials for getting login token!");
  }
  const responseBody = await response.json();
  return responseBody.token;
};
