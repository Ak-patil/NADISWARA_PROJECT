import axios from "axios";
import { LOCALIZATION_STRINGS } from "../../AppModules/LocalizationModule/LocalizationStrings";
import { NETWORK_CONSTANTS } from "../../BaseModule/Utils/Constants";
import { isValidElement } from "../../BaseModule/Utils/helpers";
import { ERROR_CODE } from "../Utils/SessionManagerConstants";
import { logAPIErrorEvent, parseAPIEndPoint } from "./NetworkHelper";

export const requestHandler = (request) => {
  //Append cancelToken to all Request header
  if (__DEV__) {
    // console.log('request', JSON.stringify(request));
  }

  return request;
};
export const successHandler = (response) => {
  return response;
};
export const errorHandler = async (error) => {
  let errorObject = {
    type: "",
    message: "",
    code: "",
  };
  if (error.response) {
    // if (error.response.status === 401) {
    //   try {
    //     const refreshToken = await AsyncStorage.getItem("refresh_token");
    //     const accessToken = await AsyncStorage.getItem("access_token");
    //     const newAccessToken = await axios.post(
    //       `https://Oohy.in/auth/login/Token/refresh`, // Replace with your refresh endpoint
    //       {
    //         accessToken: accessToken,
    //         refreshToken: refreshToken,
    //       }
    //     );

    //     // Store the new access token
    //     await AsyncStorage.setItem("access_token", newAccessToken.data);

    //     // Retry the original request with the new token
    //     error.config.headers.Authorization = `Bearer ${newAccessToken.data}`;
    //     return axios(error.config); // Re-send the original request
    //   } catch (tokenError) {
    //     // Handle error in refreshing token
    //     if (__DEV__) {
    //       console.log("Error refreshing token:", tokenError);
    //     }
    //     // You may also trigger logout here if token refresh fails
    //     return Promise.reject(tokenError);
    //   }
    // }

    if (__DEV__) {
      console.log("Response Status:", error.response.status);
      console.log("Response Data:", error.response.data);
      console.log("Response Headers:", error.response.headers);
      console.log("Response Config:", error.config);
    }
    let errorParams = {
      u: "",
      m: "",
    };
    //TODO need to return errorCode here for handling
    if (
      isValidElement(error) &&
      isValidElement(error.config) &&
      isValidElement(error.config.url)
    ) {
      const url = error.config.url;
      errorParams.u = parseAPIEndPoint(url);
      errorParams.m = error.config.method;
      logAPIErrorEvent(errorParams);
    }
    if (error.response.status === 500) {
      errorObject.type = NETWORK_CONSTANTS.API_ERROR;
      errorObject.message = LOCALIZATION_STRINGS.SERVER_ERROR;
      errorObject.status = error.response.status;
      errorObject.code =
        isValidElement(error.response.data) &&
        isValidElement(error.response.data.error)
          ? error.response.status
          : "";
      return Promise.reject(errorObject);
    } else if (error.response.status >= 501 && error.response.status < 599) {
      errorObject.type = NETWORK_CONSTANTS.API_ERROR;
      errorObject.message = LOCALIZATION_STRINGS.TIMEOUT_ERROR;
      errorObject.status = error.response.status;
      errorObject.code =
        isValidElement(error.response.data) &&
        isValidElement(error.response.data.error)
          ? error.response.status
          : "";
      return Promise.reject(errorObject);
    } else {
      if (Object.prototype.hasOwnProperty.call(error.response.data, "errors")) {
        let dataError = error.response.data;
        let code =
          isValidElement(dataError.error) &&
          isValidElement(dataError.error.code) &&
          dataError.error.code;
        let errors = "";
        for (var key in dataError.errors) {
          errors += dataError.errors[key];
        }
        errorObject.status = error.response.status;
        errorObject.type = NETWORK_CONSTANTS.API_ERROR;
        errorObject.data = error.response.data;
        errorObject.message = errors;
        errorObject.code = isValidElement(code) ? code : "";
        return errorObject;
      } else {
        if (
          isValidElement(error.response.data) &&
          Object.prototype.hasOwnProperty.call(error.response.data, "error") &&
          isValidElement(error.response.data.error.message)
        ) {
          let message = error.response.data.error.message;
          errorObject.type = NETWORK_CONSTANTS.API_ERROR;
          errorObject.message = message;
          errorObject.data = error.response.data;
          errorObject.status =
            isValidElement(error) &&
            isValidElement(error.response) &&
            isValidElement(error.response.status)
              ? error.response.status
              : "";
          errorObject.code =
            isValidElement(error.response.data) &&
            isValidElement(error.response.data.error) &&
            isValidElement(error.response.status)
              ? error.response.status
              : "";
          return Promise.reject(errorObject);
        } else {
          errorObject.type = NETWORK_CONSTANTS.API_ERROR;
          errorObject.status = error.response.status;
          errorObject.data = error.response.data;
          errorObject.message =
            isValidElement(errorObject.data) &&
            isValidElement(errorObject.data.message)
              ? errorObject.data.message
              : LOCALIZATION_STRINGS.WENT_WRONG;
          errorObject.code = "";
          return errorObject;
        }
      }
    }
  } else {
    // Something else happened while setting up the request
    if (__DEV__) {
      console.log("Error Message:", error.message);
    }
    logAPIErrorEvent({ error_config: JSON.stringify(error.config) });
    if (isValidElement(error) && isValidElement(error.message)) {
      let message = error.message;
      if (message.includes("timeout")) {
        message = LOCALIZATION_STRINGS.TIMEOUT_ERROR;
      }
      errorObject.type = NETWORK_CONSTANTS.NETWORK_ERROR;
      errorObject.message = message;
      errorObject.code = isValidElement(error.code) ? error.code : "";
      return Promise.reject(errorObject);
    } else {
      errorObject.type = NETWORK_CONSTANTS.NETWORK_ERROR;
      errorObject.message = LOCALIZATION_STRINGS.WENT_WRONG;
      errorObject.code = "";
      return Promise.reject(errorObject);
    }
  }
};
