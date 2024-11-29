export const myProfileDataSelector = (state) =>
  state.myprofilestate.updateProfileState;
export const getProfileDataSelector = (state) =>
  state.myprofilestate.userProfileState;
export const addBalanceSelector = (state) =>
  state.myprofilestate.addBalanceState;
export const getBalanceSelector = (state) =>
  state.myprofilestate.getBalanceState;
export const walletTransactionsSelector = (state) =>
  state.myprofilestate.walletTransactionsState;
export const deviceEnrolmentSelector = (state) =>
  state.myprofilestate.deviceEnrolmentState;
