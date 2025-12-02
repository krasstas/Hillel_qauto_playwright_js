import * as nodeFetch from "node-fetch";

export const getLoginToken = async () => {
  const response = await nodeFetch("http://localhost:2221/api/login", {
    method: "POST",
    body: JSON.stringify({
      username: "supremewizard81@gmail.com",
      password: "1qaz!!QQAAZZ",
    }),
  });
  if (response.status !== 200) {
    throw new Error("Incorrect credentials fo getting login token!");
  }
  const responseBody = await response.json();
  return responseBody.token;
};
