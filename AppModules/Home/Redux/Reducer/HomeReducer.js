import update from "immutability-helper";
import { handleActions } from "redux-actions";
import * as HomeActionsConst from "../Actions/HomeActionsConst";

const initialState = {
  addPatientState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: {},
    message: "",
  },
};

const addPatientRequest = (state, action) => {
  return update(state, {
    addPatientState: {
      isLoading: { $set: true },
      isError: { $set: false },
      isSuccess: { $set: true },
      message: { $set: "" },
      data: { $set: action.payload },
    },
  });
};

const addPatientSuccess = (state, action) => {
  return update(state, {
    addPatientState: {
      isLoading: { $set: false },
      isError: { $set: false },
      isSuccess: { $set: true },
      message: { $set: "" },
      data: { $set: action.payload },
    },
  });
};

const addPatientError = (state, action) => {
  return update(state, {
    addPatientState: {
      isLoading: { $set: false },
      isError: { $set: true },
      isSuccess: { $set: false },
      message: { $set: action.payload.message },
    },
  });
};

export default handleActions(
  {
    [HomeActionsConst.ADD_PATIENT_REQUEST]: addPatientRequest,
    [HomeActionsConst.ADD_PATIENT_SUCCESS]: addPatientSuccess,
    [HomeActionsConst.ADD_PATIENT__ERROR]: addPatientError,
  },
  initialState
);
