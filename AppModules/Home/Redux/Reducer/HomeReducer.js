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
  patientListState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: {},
    message: "",
  },
  patientHistoryState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: {},
    message: "",
  },
  checkUserDeviceState: {
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

const patientlistrequest = (state = initialState, action) => {
  if (!state.patientListState) {
    return initialState;
  }
  return update(state, {
    patientListState: {
      isLoading: { $set: true },
      isError: { $set: false },
      isSuccess: { $set: true },
      message: { $set: "" },
      data: { $set: {} }, // Clear previous data on request start
    },
  });
};

const patientlistsuccess = (state, action) => {
  const payload = action?.payload || {};
  return update(state, {
    patientListState: {
      isLoading: { $set: false },
      isError: { $set: false },
      isSuccess: { $set: true },
      message: { $set: payload.message || "Success" },
      data: { $set: payload }, // Ensure action.payload.data exists
    },
  });
};

const patientlisterror = (state, action) => {
  return update(state, {
    patientListState: {
      isLoading: { $set: false },
      isError: { $set: true },
      isSuccess: { $set: false },
      message: { $set: action.payload.message || "Error occurred" },
    },
  });
};

const patienthistoryrequest = (state = initialState, action) => {
  if (!state.patientHistoryState) {
    return initialState;
  }
  return update(state, {
    patientHistoryState: {
      isLoading: { $set: true },
      isError: { $set: false },
      isSuccess: { $set: true },
      message: { $set: "" },
      data: { $set: {} }, // Clear previous data on request start
    },
  });
};

const patienthistorysuccess = (state, action) => {
  const payload = action?.payload || {};
  return update(state, {
    patientHistoryState: {
      isLoading: { $set: false },
      isError: { $set: false },
      isSuccess: { $set: true },
      message: { $set: payload.message || "Success" },
      data: { $set: payload }, // Ensure action.payload.data exists
    },
  });
};

const patienthistoryerror = (state, action) => {
  return update(state, {
    patientHistoryState: {
      isLoading: { $set: false },
      isError: { $set: true },
      isSuccess: { $set: false },
      message: { $set: action.payload.message || "Error occurred" },
    },
  });
};

const checkuserdevicerequest = (state = initialState, action) => {
  if (!state.checkUserDeviceState) {
    return initialState;
  }
  return update(state, {
    checkUserDeviceState: {
      isLoading: { $set: true },
      isError: { $set: false },
      isSuccess: { $set: true },
      message: { $set: "" },
      data: { $set: {} }, // Clear previous data on request start
    },
  });
};

const checkuserdevicesuccess = (state, action) => {
  const payload = action?.payload || {};
  return update(state, {
    checkUserDeviceState: {
      isLoading: { $set: false },
      isError: { $set: false },
      isSuccess: { $set: true },
      message: { $set: payload.message || "Success" },
      data: { $set: payload }, // Ensure action.payload.data exists
    },
  });
};

const checkuserdeviceerror = (state, action) => {
  return update(state, {
    checkUserDeviceState: {
      isLoading: { $set: false },
      isError: { $set: true },
      isSuccess: { $set: false },
      message: { $set: action.payload.message || "Error occurred" },
    },
  });
};
export default handleActions(
  {
    [HomeActionsConst.ADD_PATIENT_REQUEST]: addPatientRequest,
    [HomeActionsConst.ADD_PATIENT_SUCCESS]: addPatientSuccess,
    [HomeActionsConst.ADD_PATIENT__ERROR]: addPatientError,
    [HomeActionsConst.PATIENT_LIST_REQUEST]: patientlistrequest,
    [HomeActionsConst.PATIENT_LIST_SUCCESS]: patientlistsuccess,
    [HomeActionsConst.PATIENT_LIST_ERROR]: patientlisterror,
    [HomeActionsConst.PATIENT_HISTORY_REQUEST]: patienthistoryrequest,
    [HomeActionsConst.PATIENT_HISTORY_SUCCESS]: patienthistorysuccess,
    [HomeActionsConst.PATIENT_HISTORY_ERROR]: patienthistoryerror,
    [HomeActionsConst.CHECK_USER_DEVICE_REQUEST]: checkuserdevicerequest,
    [HomeActionsConst.CHECK_USER_DEVICE_SUCCESS]: checkuserdevicesuccess,
    [HomeActionsConst.CHECK_USER_DEVICE_ERROR]: checkuserdeviceerror,
  },
  initialState
);
