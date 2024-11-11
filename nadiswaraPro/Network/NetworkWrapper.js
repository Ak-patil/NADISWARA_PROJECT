import { call, putResolve } from "redux-saga/effects";
import { Constants } from "../../BaseModule/Utils/Constants";
import { isValidElement } from "../../BaseModule/Utils/helpers";
import { ERROR_CODE } from "../Utils/SessionManagerConstants";
import API from "./ApiConfig";
import { NETWORK_METHOD, REST_API_TYPE } from "./SessionConst";
import { SESSION_ACTION } from "./SessionManager/SessionActionConst";
import SessionSkipError from "./SessionSkipError";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const apiCall = (apiCallFuc, ...args) => {
  return call(function* () {
    let networkConfig = null;
    try {
      networkConfig = yield call(apiCallFuc, ...args);
      let result;
      if (networkConfig.restAPIType === REST_API_TYPE.BASIC) {
        const accessToken = yield AsyncStorage.getItem("access_token");
        if (accessToken?.length > 0 && accessToken !== null) {
          networkConfig.config.headers.Authorization = `Bearer ${accessToken}`;
        }
      }

      try {
        if (
          networkConfig.restAPIType === REST_API_TYPE.AUTH ||
          networkConfig.restAPIType === REST_API_TYPE.BASIC
        ) {
          result = yield handleAPICall(networkConfig);
        }
      } catch (e) {
        yield* clearSessionAndLogout({});
      }

      return result;
    } catch (result) {
      console.log("Error caught:", result);
      if (
        isValidElement(networkConfig) &&
        networkConfig.restAPIType !== REST_API_TYPE.NONE
      ) {
        const value = isSessionFailed(result);
        if (value) {
          yield* clearSessionAndLogout({
            result,
          });
          throw new SessionSkipError(Constants.SESSION_SKIPPED);
        } else {
          return result;
        }
      }
    }
  });
};

function* handleAPICall(networkConfig) {
  const result = yield call(callNetwork, networkConfig);
  if (isSessionFailed(result)) {
    yield* clearSessionAndLogout({
      networkConfig,
      result,
    });
    return null;
  } else if (!isValidElement(result)) {
    return null;
  }
  return result;
}

function* callNetwork(networkConfig) {
  try {
    console.log("networkConfig in callNetwork:", networkConfig);
    if (isValidElement(networkConfig) && isValidElement(networkConfig.method)) {
      switch (networkConfig.method) {
        case NETWORK_METHOD.GET: {
          return API.get(
            networkConfig.url,
            isValidElement(networkConfig.config) && networkConfig.config
          );
        }
        case NETWORK_METHOD.POST: {
          return API.post(
            networkConfig.url,
            isValidElement(networkConfig.data) && networkConfig.data,
            isValidElement(networkConfig.config) && networkConfig.config
          );
        }
        case NETWORK_METHOD.PUT: {
          return API.put(
            networkConfig.url,
            isValidElement(networkConfig.data) && networkConfig.data,
            isValidElement(networkConfig.config) && networkConfig.config
          );
        }
        case NETWORK_METHOD.DELETE: {
          if (isValidElement(networkConfig.data)) {
            networkConfig.config.data = networkConfig.data;
          }
          return API.delete(
            networkConfig.url,
            isValidElement(networkConfig.config) && networkConfig.config
          );
        }
        case NETWORK_METHOD.HEAD: {
          return API.head(
            networkConfig.url,
            isValidElement(networkConfig.config) && networkConfig.config
          );
        }
      }
    }
  } catch (e) {
    console.error("Error in callNetwork:", e);
    // Nothing to handle
  }
}

function isSessionFailed(result) {
  return (
    isValidElement(result) &&
    isValidElement(result.status) &&
    result.status === ERROR_CODE.UNAUTHORIZED_ACCESS &&
    isValidElement(result.data) &&
    isValidElement(result.data.message) &&
    result.data.message === "Unauthorized"
  );
}

function* clearSessionAndLogout() {
  yield putResolve({
    type: SESSION_ACTION.INVALID_SESSION,
  });
  // handleNavigation(SCREEN_OPTIONS.LOGIN_SCREEN.route_name);
  // showErrorMessage(LOCALIZATION_STRINGS.INVALID_SESSION_MSG, undefined, Colors.warning);
}
