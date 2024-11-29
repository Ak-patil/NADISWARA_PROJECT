import {
  NETWORK_METHOD,
  REST_API_TYPE,
} from "../../../nadiswaraPro/Network/SessionConst";
import {
  addBalanceOrderCreationEndpoint,
  deviceEnrolmentEndpoint,
  getWalletBalanceEndpoint,
  getWalletTransactionsEndpoint,
  paymentVerificationEndpoint,
} from "../../../nadiswaraPro/Network/urls";

export const MyprofileNetwork = {
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
    url: paymentVerificationEndpoint,
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
  getWalletTransactionsRequestApiCall: () => ({
    method: NETWORK_METHOD.GET,
    config: {
      headers: {
        "content-type": "application/json",
      },
    },
    url: getWalletTransactionsEndpoint,
    restAPIType: REST_API_TYPE.BASIC,
  }),
  deviceEnrolmentApiCall: (payload) => ({
    method: NETWORK_METHOD.POST,
    config: {
      headers: {
        "content-type": "application/json",
      },
    },
    url: deviceEnrolmentEndpoint,
    data: payload,
    restAPIType: REST_API_TYPE.BASIC,
  }),
};
