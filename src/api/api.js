const API_BASE_URL = "https://mock.apidog.com/m1/919954-902521-default";
const APIDOG_TOKEN = "tyogZPbAyT5SUGVsw-JtU";

function buildHeaders() {
  return {
    "Content-Type": "application/json",
    apidogToken: APIDOG_TOKEN,
  };
}

export function getApiUrl(endpoint) {
  return `${API_BASE_URL}${endpoint}`;
}

export function getApiOptions() {
  return { headers: buildHeaders() };
}