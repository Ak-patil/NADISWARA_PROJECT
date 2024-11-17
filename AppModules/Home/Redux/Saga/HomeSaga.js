import { Toast } from "react-native-toast-notifications";
import { all, put, takeLeading } from "redux-saga/effects";
import { handleNavigation } from "../../../../nadiswaraPro/Navigation/NaviagationHelper";
import { apiCall } from "../../../../nadiswaraPro/Network/NetworkWrapper";
import { HomeNetwork } from "../../Network/HomeNetwork";
import * as HomeActions from "../Actions/HomeAction";

function* addPatientRequest(action) {
  try {
    const response = yield apiCall(
      HomeNetwork.addPatientRequestApiCall,
      action.payload
    );
    const addPatientResponse = yield response;
    if (addPatientResponse) {
      if (
        addPatientResponse &&
        addPatientResponse?.data?.status === "success" &&
        addPatientResponse?.status === 201
      ) {
        yield put(HomeActions.addPatientSuccess(addPatientResponse.data));
        Toast.show(addPatientResponse?.data?.message, {
          type: "success",
          placement: "bottom",
          duration: 3000,
          animationType: "zoom-in",
          successColor: "green",
        });
        handleNavigation("DeviceConnection");
      } else {
        yield put(
          HomeActions.addPatientError({
            message: addPatientResponse?.data?.message,
          })
        );
        Toast.show(addPatientResponse?.data?.message, {
          type: "danger",
          placement: "bottom",
          duration: 3000,
          animationType: "zoom-in",
          dangerColor: "red",
        });
      }
    }
  } catch (e) {
    yield put(HomeActions.addPatientError({ message: "Network Error" }));
    Toast.show("Network Error", {
      type: "danger",
      placement: "bottom",
      duration: 3000,
      animationType: "zoom-in",
      dangerColor: "red",
    });
  }
}

function* HomeSage() {
  yield all([takeLeading(HomeActions.addPatientRequest, addPatientRequest)]);
}

export default HomeSage;
