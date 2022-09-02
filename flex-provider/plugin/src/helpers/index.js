export { setUpComponents } from "./components";
export { setUpActions } from "./actions";
export { setUpNotifications } from "./notifications";
export { getPatientInfoByName, getPatientByPhone } from "./fhir";
export function fetchWithTimeout(url, options, timeout = 7000) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("timeout")), timeout)
    ),
  ]);
}

export function getBasePath() {
  if (process.env.REACT_APP_BACKEND_URL.includes("localhost")) {
    return `http://${process.env.REACT_APP_BACKEND_URL}`;
  }
  return `https://${process.env.REACT_APP_BACKEND_URL}`;
}
