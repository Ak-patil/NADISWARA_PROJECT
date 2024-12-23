import { createAction } from "redux-actions";
import * as HomeActionsConst from "./HomeActionsConst";

export const addPatientRequest = createAction(
  HomeActionsConst.ADD_PATIENT_REQUEST
);
export const addPatientSuccess = createAction(
  HomeActionsConst.ADD_PATIENT_SUCCESS
);
export const addPatientError = createAction(
  HomeActionsConst.ADD_PATIENT__ERROR
);

export const patientListRequest = createAction(
  HomeActionsConst.PATIENT_LIST_REQUEST
);
export const patientListSuccess = createAction(
  HomeActionsConst.PATIENT_LIST_SUCCESS
);
export const patientListError = createAction(
  HomeActionsConst.PATIENT_LIST_ERROR
);

export const patientHistoryRequest = createAction(
  HomeActionsConst.PATIENT_HISTORY_REQUEST
);
export const patientHistorySuccess = createAction(
  HomeActionsConst.PATIENT_HISTORY_SUCCESS
);
export const patientHistoryError = createAction(
  HomeActionsConst.PATIENT_HISTORY_ERROR
);

export const checkUserDeviceRequest = createAction(
  HomeActionsConst.CHECK_USER_DEVICE_REQUEST
);
export const checkUserDeviceSuccess = createAction(
  HomeActionsConst.CHECK_USER_DEVICE_SUCCESS
);
export const checkUserDeviceError = createAction(
  HomeActionsConst.CHECK_USER_DEVICE_ERROR
);
