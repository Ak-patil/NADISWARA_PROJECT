import update from "immutability-helper";
import { handleActions } from "redux-actions";
import * as AuthActionsConst from "../Actions/AuthActionsConst";

const initialState = {
  loginViaEmailState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: {},
    message: "",
  },
  signupViaEmailState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: {},
    message: "",
  },
  verifyOtpState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: {},
    message: "",
  },
};

const loginViaEmailRequest = (state, action) => {
  return update(state, {
    loginViaEmailState: {
      isLoading: { $set: true },
      isError: { $set: false },
      isSuccess: { $set: true },
      message: { $set: "" },
      data: { $set: action.payload },
    },
  });
};

const loginViaEmailSuccess = (state, action) => {
  return update(state, {
    loginViaEmailState: {
      isLoading: { $set: false },
      isError: { $set: false },
      isSuccess: { $set: true },
      message: { $set: "" },
      data: { $set: action.payload },
    },
  });
};

const loginViaEmailError = (state, action) => {
  return update(state, {
    loginViaEmailState: {
      isLoading: { $set: false },
      isError: { $set: true },
      isSuccess: { $set: false },
      message: { $set: action.payload.message },
    },
  });
};

const logoutAction = (state, action) => {
  return update(state, {
    loginViaEmailState: {
      isLoading: { $set: false },
      isError: { $set: false },
      isSuccess: { $set: false },
      message: { $set: "" },
      data: { $set: "" },
    },
  });
};

const signupViaEmailRequest = (state, action) => {
  return update(state, {
    signupViaEmailState: {
      isLoading: { $set: true },
      isError: { $set: false },
      isSuccess: { $set: false },
      message: { $set: "" },
      data: { $set: action.payload },
    },
  });
};

const signupViaEmailSuccess = (state, action) => {
  return update(state, {
    signupViaEmailState: {
      isLoading: { $set: false },
      isError: { $set: false },
      isSuccess: { $set: true },
      message: { $set: "" },
      data: { $set: action.payload },
    },
  });
};

const signupViaEmailError = (state, action) => {
  return update(state, {
    signupViaEmailState: {
      isLoading: { $set: false },
      isError: { $set: true },
      isSuccess: { $set: false },
      message: { $set: action.payload.message },
    },
  });
};

const verifyOtpRequest = (state, action) => {
  return update(state, {
    verifyOtpState: {
      isLoading: { $set: true },
      isError: { $set: false },
      isSuccess: { $set: false },
      message: { $set: "" },
      data: { $set: action.payload },
    },
  });
};

const verifyOtpSuccess = (state, action) => {
  return update(state, {
    verifyOtpState: {
      isLoading: { $set: false },
      isError: { $set: false },
      isSuccess: { $set: true },
      message: { $set: "" },
      data: { $set: action.payload },
    },
  });
};

const verifyOtpError = (state, action) => {
  return update(state, {
    verifyOtpState: {
      isLoading: { $set: false },
      isError: { $set: true },
      isSuccess: { $set: false },
      message: { $set: action.payload.message },
    },
  });
};

export default handleActions(
  {
    [AuthActionsConst.LOGIN_VIA_EMAIL_REQUEST]: loginViaEmailRequest,
    [AuthActionsConst.LOGIN_VIA_EMAIL_SUCCESS]: loginViaEmailSuccess,
    [AuthActionsConst.LOGIN_VIA_EMAIL_ERROR]: loginViaEmailError,
    [AuthActionsConst.SIGNUP_VIA_EMAIL_REQUEST]: signupViaEmailRequest,
    [AuthActionsConst.SIGNUP_VIA_EMAIL_SUCCESS]: signupViaEmailSuccess,
    [AuthActionsConst.SIGNUP_VIA_EMAIL_ERROR]: signupViaEmailError,
    [AuthActionsConst.VERIFY_OTP_REQUEST]: verifyOtpRequest,
    [AuthActionsConst.VERIFY_OTP_SUCCESS]: verifyOtpSuccess,
    [AuthActionsConst.VERIFY_OTP__ERROR]: verifyOtpError,
    [AuthActionsConst.LOGOUT_ACITON]: logoutAction,
  },
  initialState
);
