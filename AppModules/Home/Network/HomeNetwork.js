import {
  NETWORK_METHOD,
  REST_API_TYPE,
} from "../../../nadiswaraPro/Network/SessionConst";
import { addPatientEndpoint } from "../../../nadiswaraPro/Network/urls";

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
};
