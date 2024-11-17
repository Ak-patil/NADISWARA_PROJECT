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
