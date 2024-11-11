import { handleActions } from "redux-actions";
import update from "immutability-helper";
import * as Myprofileactionconst from "../Actions/MyprofileActionsConst";

const initialState = {
  userProfileState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: {},
    message: "",
  },
  updateProfileState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: {},
    message: "",
  },
};

const getProfileRequest = (state, action) => {
  return update(state, {
    userProfileState: {
      isLoading: { $set: true },
      isError: { $set: false },
      isSuccess: { $set: true },
      message: { $set: "" },
      data: { $set: action.payload },
    },
  });
};

const getProfileSucess = (state, action) => {
  return update(state, {
    userProfileState: {
      isLoading: { $set: false },
      isError: { $set: false },
      isSuccess: { $set: true },
      message: { $set: "" },
      data: { $set: action.payload },
    },
  });
};

const getProfileError = (state, action) => {
  return update(state, {
    userProfileState: {
      isLoading: { $set: false },
      isError: { $set: true },
      isSuccess: { $set: false },
      message: { $set: action.payload.message },
    },
  });
};

const updateProfileRequest = (state, action) => {
  return update(state, {
    updateProfileState: {
      isLoading: { $set: true },
      isError: { $set: false },
      isSuccess: { $set: true },
      message: { $set: "" },
      data: { $set: action.payload },
    },
  });
};

const updateProfileSuccess = (state, action) => {
  return update(state, {
    updateProfileState: {
      isLoading: { $set: false },
      isError: { $set: false },
      isSuccess: { $set: true },
      message: { $set: "" },
      data: { $set: action.payload },
    },
  });
};

const updateProfileError = (state, action) => {
  return update(state, {
    updateProfileState: {
      isLoading: { $set: false },
      isError: { $set: true },
      isSuccess: { $set: false },
      message: { $set: action.payload.message },
    },
  });
};

export default handleActions(
  {
    [Myprofileactionconst.GET_PROFILE_REQUEST]: getProfileRequest,
    [Myprofileactionconst.GET_PROFILE_SUCCESS]: getProfileSucess,
    [Myprofileactionconst.GET_PROFILE_ERROR]: getProfileError,
    [Myprofileactionconst.UPDATE_PROFILE_REQUEST]: updateProfileRequest,
    [Myprofileactionconst.UPDATE_PROFILE_SUCCESS]: updateProfileSuccess,
    [Myprofileactionconst.UPDATE_PROFILE_ERROR]: updateProfileError,
  },
  initialState
);
