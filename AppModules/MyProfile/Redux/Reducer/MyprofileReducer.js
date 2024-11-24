import update from "immutability-helper";
import { handleActions } from "redux-actions";
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
  addBalanceState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: {},
    message: "",
  },
  getBalanceState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: {},
    message: "",
  },
  walletTransactionsState: {
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

const addBalanceRequest = (state, action) => {
  return update(state, {
    addBalanceState: {
      isLoading: { $set: true },
      isError: { $set: false },
      isSuccess: { $set: true },
      message: { $set: "" },
      data: { $set: action.payload },
    },
  });
};

const addBalanceSuccess = (state, action) => {
  return update(state, {
    addBalanceState: {
      isLoading: { $set: false },
      isError: { $set: false },
      isSuccess: { $set: true },
      message: { $set: "" },
      data: { $set: action.payload },
    },
  });
};

const addBalanceError = (state, action) => {
  return update(state, {
    addBalanceState: {
      isLoading: { $set: false },
      isError: { $set: true },
      isSuccess: { $set: false },
      message: { $set: action.payload.message },
    },
  });
};

const getBalanceRequest = (state, action) => {
  return update(state, {
    getBalanceState: {
      isLoading: { $set: true },
      isError: { $set: false },
      isSuccess: { $set: true },
      message: { $set: "" },
      data: { $set: action.payload },
    },
  });
};

const getBalanceSuccess = (state, action) => {
  return update(state, {
    getBalanceState: {
      isLoading: { $set: false },
      isError: { $set: false },
      isSuccess: { $set: true },
      message: { $set: "" },
      data: { $set: action.payload },
    },
  });
};

const getBalanceError = (state, action) => {
  return update(state, {
    getBalanceState: {
      isLoading: { $set: false },
      isError: { $set: true },
      isSuccess: { $set: false },
      message: { $set: action.payload.message },
    },
  });
};

const getWalletTransactionsRequest = (state, action) => {
  return update(state, {
    walletTransactionsState: {
      isLoading: { $set: true },
      isError: { $set: false },
      isSuccess: { $set: true },
      message: { $set: "" },
      data: { $set: action.payload },
    },
  });
};

const getWalletTransactionsSuccess = (state, action) => {
  return update(state, {
    walletTransactionsState: {
      isLoading: { $set: false },
      isError: { $set: false },
      isSuccess: { $set: true },
      message: { $set: "" },
      data: { $set: action.payload },
    },
  });
};

const getWalletTransactionsError = (state, action) => {
  return update(state, {
    walletTransactionsState: {
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
    [Myprofileactionconst.ADD_BALANCE_REQUEST]: addBalanceRequest,
    [Myprofileactionconst.ADD_BALANCE_SUCCESS]: addBalanceSuccess,
    [Myprofileactionconst.ADD_BALANCE_ERROR]: addBalanceError,
    [Myprofileactionconst.GET_BALANCE_REQUEST]: getBalanceRequest,
    [Myprofileactionconst.GET_BALANCE_SUCCESS]: getBalanceSuccess,
    [Myprofileactionconst.GET_BALANCE_ERROR]: getBalanceError,
    [Myprofileactionconst.GET_WALLET_TRANSACTION_REQUEST]:
      getWalletTransactionsRequest,
    [Myprofileactionconst.GET_WALLET_TRANSACTION_SUCCESS]:
      getWalletTransactionsSuccess,
    [Myprofileactionconst.GET_WALLET_TRANSACTION_ERROR]:
      getWalletTransactionsError,
  },
  initialState
);
