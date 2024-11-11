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
