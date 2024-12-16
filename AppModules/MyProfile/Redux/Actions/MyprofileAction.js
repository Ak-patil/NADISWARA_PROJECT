import { createAction } from "redux-actions";
import * as Myprofileactionconst from "./MyprofileActionsConst";

export const getProfileRequest = createAction(
  Myprofileactionconst.GET_PROFILE_REQUEST
);
export const getProfileSuccess = createAction(
  Myprofileactionconst.GET_PROFILE_SUCCESS
);
export const getProfileError = createAction(
  Myprofileactionconst.GET_PROFILE_ERROR
);

export const updateProfileRequest = createAction(
  Myprofileactionconst.UPDATE_PROFILE_REQUEST
);
export const updateProfileSuccess = createAction(
  Myprofileactionconst.UPDATE_PROFILE_SUCCESS
);
export const updateProfileError = createAction(
  Myprofileactionconst.UPDATE_PROFILE_ERROR
);

export const addBalanceRequest = createAction(
  Myprofileactionconst.ADD_BALANCE_REQUEST
);
export const addBalanceSuccess = createAction(
  Myprofileactionconst.ADD_BALANCE_SUCCESS
);
export const addBalanceError = createAction(
  Myprofileactionconst.ADD_BALANCE_ERROR
);

export const getBalanceRequest = createAction(
  Myprofileactionconst.GET_BALANCE_REQUEST
);
export const getBalanceSuccess = createAction(
  Myprofileactionconst.GET_BALANCE_SUCCESS
);
export const getBalanceError = createAction(
  Myprofileactionconst.GET_BALANCE_ERROR
);

export const getWalletTransactionsRequest = createAction(
  Myprofileactionconst.GET_WALLET_TRANSACTION_REQUEST
);
export const getWalletTransactionsSuccess = createAction(
  Myprofileactionconst.GET_WALLET_TRANSACTION_SUCCESS
);
export const getWalletTransactionsError = createAction(
  Myprofileactionconst.GET_WALLET_TRANSACTION_ERROR
);

export const deviceEnrolmentRequest = createAction(
  Myprofileactionconst.DEVICE_ENROLMENT_REQUEST
);
export const deviceEnrolmentRequestSuccess = createAction(
  Myprofileactionconst.DEVICE_ENROLMENT_SUCCESS
);
export const deviceEnrolmentRequestError = createAction(
  Myprofileactionconst.DEVICE_ENROLMENT_ERROR
);
