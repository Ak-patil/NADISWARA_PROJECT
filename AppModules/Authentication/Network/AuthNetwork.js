import {
  NETWORK_METHOD,
  REST_API_TYPE,
} from "../../../nadiswaraPro/Network/SessionConst";
import {
  LoginviaemailrequestEndpoint,
  SignupviaemailrequestEndpoint,
  resetPasswordEndpoint,
  verifyOtpEmailEndpoint,
  verifyOtpEndpoint,
} from "../../../nadiswaraPro/Network/urls";

export const AuthNetwork = {
  LoginViaEmailRequestApiCall: (payload) => ({
    method: NETWORK_METHOD.POST,
    url: LoginviaemailrequestEndpoint,
    config: {
      headers: {
        "Content-Type": "application/json",
      },
    },
    data: payload,
    restAPIType: REST_API_TYPE.AUTH,
  }),
  SignupViaEmailRequestApiCall: (payload) => ({
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
    url: SignupviaemailrequestEndpoint,
    data: payload,
    restAPIType: REST_API_TYPE.AUTH,
  }),
  verifyOtpRequestApiCall: (payload) => ({
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
    url: verifyOtpEndpoint,
    data: payload,
    restAPIType: REST_API_TYPE.AUTH,
  }),

  verifyOtpEmailRequestApiCall: (payload) => ({
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
    url: verifyOtpEmailEndpoint,
    data: payload,
    restAPIType: REST_API_TYPE.AUTH,
  }),

  resetPasswordRequestApiCall: (payload) => ({
    method: NETWORK_METHOD.POST,
    config: {
      headers: {
        "content-type": "application/json",
        "User-Agent": "PostmanRuntime/7.40.0",
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
      },
    },
    url: resetPasswordEndpoint,
    data: payload,
    restAPIType: REST_API_TYPE.AUTH,
  }),
};
