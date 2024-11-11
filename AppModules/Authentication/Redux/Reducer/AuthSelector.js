export const loginViaEmailStateSelector = (state) =>
  state.authState.loginViaEmailState;
export const signupViaEmailStateSelector = (state) =>
  state.authState.signupViaEmailState;
export const verifyOtpStateSelector = (state) => state.authState.verifyOtpState;
