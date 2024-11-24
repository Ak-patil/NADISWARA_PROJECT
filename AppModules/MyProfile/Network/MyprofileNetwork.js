import {
  NETWORK_METHOD,
  REST_API_TYPE,
} from "../../../nadiswaraPro/Network/SessionConst";
import {
  GetprofiledetailsEndpoint,
  UpdateprofiledetailsEndpoint,
  addBalanceOrderCreationEndpoint,
  getWalletBalanceEndpoint,
  paymentVerificaitonEndpoint,
} from "../../../nadiswaraPro/Network/urls";

export const MyprofileNetwork = {
  getProfileRequestApiCall: () => ({
    method: NETWORK_METHOD.GET,
    config: {
      headers: {
        "content-type": "application/json",
      },
    },
    url: GetprofiledetailsEndpoint,
    restAPIType: REST_API_TYPE.BASIC,
  }),
  updateProfileRequestApiCall: (payload) => ({
    method: NETWORK_METHOD.POST,
    config: {
      headers: {
        "content-type": "multipart/form-data",
      },
    },
    url: UpdateprofiledetailsEndpoint,
    data: payload,
    restAPIType: REST_API_TYPE.BASIC,
  }),

  addBalanceOrderCreationRequestApiCall: (payload) => ({
    method: NETWORK_METHOD.POST,
    config: {
      headers: {
        "content-type": "application/json",
      },
    },
    url: addBalanceOrderCreationEndpoint,
    data: payload,
    restAPIType: REST_API_TYPE.BASIC,
  }),

  paymentVerifyApiCall: (payload) => ({
    method: NETWORK_METHOD.POST,
    config: {
      headers: {
        "content-type": "application/json",
      },
    },
    url: paymentVerificaitonEndpoint,
    data: payload,
    restAPIType: REST_API_TYPE.BASIC,
  }),
  getWalletBalanceRequestApiCall: () => ({
    method: NETWORK_METHOD.GET,
    config: {
      headers: {
        "content-type": "application/json",
      },
    },
    url: getWalletBalanceEndpoint,
    restAPIType: REST_API_TYPE.BASIC,
  }),
};
