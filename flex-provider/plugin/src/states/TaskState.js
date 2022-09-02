import { fetchingState } from "../states";

export const ACTION_FETCHING_FHIR = "FETCHING_FHIR_DATA";
export const ACTION_FETCHING_FHIR_SUCCESS = "FETCHING_FHIR_DATA_SUCCSS";
export const ACTION_FETCHING_FHIR_FAILURE = "FETCHING_FHIR_DATA_FAILURE";

const defaultPatient = {
  id: "12345",
  resourceType: "Patient",
  name: [
    {
      use: "official",
      family: "Doe",
      given: ["Mary Ann"],
    },
  ],
  telecom: [
    { system: "phone", value: "", use: "home" },
    { system: "phone", value: "", use: "work" },
    { system: "phone", value: "111-222-3333", use: "mobile" },
    { system: "email", value: "", use: "home" },
  ],
  gender: "female",
  birthDate: "1990-01-01",
};

export class TaskActions {
  static fetchingFhirData = () => ({ type: ACTION_FETCHING_FHIR });
  static fetchingFhirDataSuccess = (payload) => ({
    payload,
    type: ACTION_FETCHING_FHIR_SUCCESS,
  });
  static fetchingFhirDataFailure = () => ({
    type: ACTION_FETCHING_FHIR_FAILURE,
  });
}

export const initialState = {
  ...fetchingState,
  accessTokenInfo: null,
  clientId: null,
  patientInfo: null,
};

export function reduce(state = initialState, { type, payload }) {
  // eslint-disable-next-line sonarjs/no-small-switch
  switch (type) {
    case ACTION_FETCHING_FHIR: {
      return {
        ...state,
        accessTokenInfo: null,
        clientId: null,
        patientInfo: null,
        fetching: true,
        fetchingFailed: false,
        fetchingSuccess: false,
      };
    }
    case ACTION_FETCHING_FHIR_SUCCESS: {
      return {
        ...state,
        ...payload,
        fetching: false,
        fetchingFailed: false,
        fetchingSuccess: true,
      };
    }
    case ACTION_FETCHING_FHIR_FAILURE: {
      return {
        ...state,
        accessTokenInfo: null,
        clientId: null,
        patientInfo: defaultPatient,
        fetching: false,
        fetchingFailed: true,
        fetchingSuccess: false,
      };
    }
    default:
      return state;
  }
}
