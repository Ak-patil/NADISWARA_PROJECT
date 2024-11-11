import { createAction } from "redux-actions";
import * as AuthActionsConst from "./AuthActionsConst";

export const loginViaEmailRequest = createAction(
  AuthActionsConst.LOGIN_VIA_EMAIL_REQUEST
);
export const loginViaEmailSuccess = createAction(
  AuthActionsConst.LOGIN_VIA_EMAIL_SUCCESS
);
export const loginViaEmailError = createAction(
  AuthActionsConst.LOGIN_VIA_EMAIL_ERROR
);

export const logoutAction = createAction(AuthActionsConst.LOGOUT_ACITON);

export const signupViaEmailRequest = createAction(
  AuthActionsConst.SIGNUP_VIA_EMAIL_REQUEST
);
export const signupViaEmailSuccess = createAction(
  AuthActionsConst.SIGNUP_VIA_EMAIL_SUCCESS
);
export const signupViaEmailError = createAction(
  AuthActionsConst.SIGNUP_VIA_EMAIL_ERROR
);

export const verifyOtpRequest = createAction(
  AuthActionsConst.VERIFY_OTP_REQUEST
);
export const verifyOtpSuccess = createAction(
  AuthActionsConst.VERIFY_OTP_SUCCESS
);
export const verifyOtpError = createAction(AuthActionsConst.VERIFY_OTP__ERROR);
