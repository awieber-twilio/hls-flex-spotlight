import { fetchWithTimeout, getBasePath } from ".";

export const getPatientInfoByName = (first_name, last_name, Token) =>
  fetchWithTimeout(
    `${getBasePath()}/ehr-lookup`,
    {
      method: "POST",
      body: new URLSearchParams({
        cmd: "name",
        first_name,
        last_name,
        Token,
      }),
    },
    10000
  ).then((resp) => resp.json());

export const getPatientByPhone = (phone, Token) => {
  return fetchWithTimeout(
    `${getBasePath()}/ehr-lookup`,
    {
      method: "POST",
      body: new URLSearchParams({
        cmd: "phone",
        phone,
        Token,
      }),
    },
    10000
  )
    .then((resp) => resp.json())
    .then((res) => {
      return res;
    });
};
