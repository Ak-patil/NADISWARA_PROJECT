import { handleActions } from "redux-actions";
import update from "immutability-helper";
import { PaymentsActionConst } from "../Action/PaymentsActionConst";

const initialState = {
  enrolState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: {},
    message: "",
  },
};

const enrolrequest = (state = initialState, action) => {
  return update(state, {
    enrolState: {
      isLoading: { $set: true },
      isError: { $set: false },
      isSuccess: { $set: false },
      message: { $set: "" },
      data: { $set: {} }, // Clear previous data on request start
    },
  });
};

const enrolSuccess = (state = initialState, action) => {
  return update(state, {
    enrolState: {
      isLoading: { $set: false },
      isError: { $set: false },
      isSuccess: { $set: true },
      message: { $set: "" },
      data: { $set: action.payload }, // Clear previous data on request start
    },
  });
};

const enrolFailure = (state = initialState, action) => {
  return update(state, {
    enrolState: {
      isLoading: { $set: false },
      isError: { $set: true },
      isSuccess: { $set: false },
      message: { $set: "" },
      data: { $set: action.payload }, // Clear previous data on request start
    },
  });
};

export default handleActions(
  {
    [PaymentsActionConst.ENROLL_NOW_REQUEST]: enrolrequest,
    [PaymentsActionConst.ENROLL_SUCCESS]: enrolSuccess,
    [PaymentsActionConst.ENROLL_FAILURE]: enrolFailure,
  },
  initialState
);
