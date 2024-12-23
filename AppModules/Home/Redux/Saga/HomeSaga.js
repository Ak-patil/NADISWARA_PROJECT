import { Toast } from "react-native-toast-notifications";
import { all, call, put, takeLeading } from "redux-saga/effects";
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
        yield call(patientlistapicallRequest);
        Toast.show(addPatientResponse?.data?.message, {
          type: "success",
          placement: "bottom",
          duration: 3000,
          animationType: "zoom-in",
          successColor: "green",
        });
        handleNavigation("FormOne");
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

export function* patientlistapicallRequest() {
  try {
    const response = yield apiCall(HomeNetwork.patientListApiCall);
    const patientListREsponse = yield response;
    if (patientListREsponse) {
      if (
        patientListREsponse &&
        patientListREsponse?.data?.status === "success" &&
        patientListREsponse?.status === 200
      ) {
        yield put(HomeActions.patientListSuccess(patientListREsponse.data));
      } else {
        yield put(
          HomeActions.patientListError({
            message: patientListREsponse?.data?.message,
          })
        );
        Toast.show(patientListREsponse?.data?.message, {
          type: "danger",
          placement: "bottom",
          duration: 3000,
          animationType: "zoom-in",
          dangerColor: "red",
        });
      }
    } else {
    }
  } catch (e) {
    yield put(HomeActions.patientListError({ message: "Network Error" }));
    Toast.show("Network Error", {
      type: "danger",
      placement: "bottom",
      duration: 3000,
      animationType: "zoom-in",
      dangerColor: "red",
    });
  }
}

export function* patienthistoryapicallRequest(action) {
  const { patient_id } = action?.payload;
  try {
    const response = yield apiCall(HomeNetwork.patientHistoryApiCall, {
      patient_id,
    });
    const patientHistoryResponse = yield response;
    if (patientHistoryResponse) {
      if (
        patientHistoryResponse &&
        patientHistoryResponse?.data?.status === "success" &&
        patientHistoryResponse?.status === 200
      ) {
        yield put(
          HomeActions.patientHistorySuccess(patientHistoryResponse.data)
        );
      } else {
        yield put(
          HomeActions.patientHistoryError({
            message: patientHistoryResponse?.data?.message,
          })
        );
        Toast.show(patientHistoryResponse?.data?.message, {
          type: "danger",
          placement: "bottom",
          duration: 3000,
          animationType: "zoom-in",
          dangerColor: "red",
        });
      }
    } else {
    }
  } catch (e) {
    yield put(HomeActions.patientHistoryError({ message: "Network Error" }));
    Toast.show("Network Error", {
      type: "danger",
      placement: "bottom",
      duration: 3000,
      animationType: "zoom-in",
      dangerColor: "red",
    });
  }
}

function* checkUserDeviceRequest(action) {
  try {
    const response = yield apiCall(
      HomeNetwork.checkUserDeviceApiCall,
      action.payload
    );
    const checkUserDeviceResponse = yield response;
    if (checkUserDeviceResponse) {
      if (
        checkUserDeviceResponse &&
        checkUserDeviceResponse?.data?.status === "success" &&
        checkUserDeviceResponse?.status === 200
      ) {
        yield put(
          HomeActions.checkUserDeviceSuccess(checkUserDeviceResponse.data)
        );
      } else {
        yield put(
          HomeActions.checkUserDeviceError(checkUserDeviceResponse.data)
        );
        Toast.show(checkUserDeviceResponse?.message, {
          type: "danger",
          placement: "bottom",
          duration: 3000,
          animationType: "zoom-in",
          dangerColor: "red",
        });
      }
    }
  } catch (e) {
    yield put(HomeActions.checkUserDeviceError({ message: "Network Error" }));
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
  yield all([
    takeLeading(HomeActions.addPatientRequest, addPatientRequest),
    takeLeading(HomeActions.patientListRequest, patientlistapicallRequest),
    takeLeading(
      HomeActions.patientHistoryRequest,
      patienthistoryapicallRequest
    ),
    takeLeading(HomeActions.checkUserDeviceRequest, checkUserDeviceRequest),
  ]);
}

export default HomeSage;
