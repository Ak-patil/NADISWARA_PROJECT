import {
  NETWORK_METHOD,
  REST_API_TYPE,
} from "../../../nadiswaraPro/Network/SessionConst";
import {
  addPatientEndpoint,
  checkUserDeviceEndpoint,
  patientHistoryEndpoint,
  patientListEndpoint,
} from "../../../nadiswaraPro/Network/urls";

export const HomeNetwork = {
  addPatientRequestApiCall: (payload) => ({
    method: NETWORK_METHOD.POST,
    config: {
      headers: {
        "content-type": "multipart/form-data",
        "User-Agent": "PostmanRuntime/7.40.0",
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
      },
    },
    url: addPatientEndpoint,
    data: payload,
    restAPIType: REST_API_TYPE.BASIC,
  }),
  patientListApiCall: (payload) => ({
    method: NETWORK_METHOD.GET,
    config: {
      headers: {
        "content-type": "application/json",
        "User-Agent": "PostmanRuntime/7.40.0",
        Connection: "keep-alive",
      },
    },
    url: patientListEndpoint,
    data: payload,
    restAPIType: REST_API_TYPE.BASIC,
  }),
  patientHistoryApiCall: (payload) => ({
    method: NETWORK_METHOD.GET,
    config: {
      headers: {
        "content-type": "application/json",
        "User-Agent": "PostmanRuntime/7.40.0",
        Connection: "keep-alive",
      },
    },
    url: `${patientHistoryEndpoint}?patient_id=${payload.patient_id}`,
    restAPIType: REST_API_TYPE.BASIC,
  }),
  checkUserDeviceApiCall: (payload) => ({
    method: NETWORK_METHOD.POST,
    config: {
      headers: {
        "content-type": "application/json",
      },
    },
    url: checkUserDeviceEndpoint,
    data: payload,
    restAPIType: REST_API_TYPE.BASIC,
  }),
};
