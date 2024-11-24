const BASE_URL = `https://nadiswarapro-backend.online/api/v1`;

export const LoginviaemailrequestEndpoint = `${BASE_URL}/accounts/login/`;
export const SignupviaemailrequestEndpoint = `${BASE_URL}/accounts/signup-view/`;
export const verifyOtpEndpoint = `${BASE_URL}/accounts/signup-verify-otp/`;
export const addPatientEndpoint = `${BASE_URL}/patient_profile/profile/`;
export const verifyOtpEmailEndpoint = `${BASE_URL}/accounts/password-forgot-request-otp/`;
export const resetPasswordEndpoint = `${BASE_URL}/accounts/reset-password/`;
export const patientListEndpoint = `${BASE_URL}/patient_profile/profile/`;
export const addBalanceOrderCreationEndpoint = `${BASE_URL}/pulse_payments/payment/create-order/`;
export const paymentVerificationEndpoint = `${BASE_URL}/pulse_payments/payment/create-order/`;
export const getWalletBalanceEndpoint = `${BASE_URL}/pulse_payments/payment/balance/`;
export const getWalletTransactionsEndpoint = `${BASE_URL}/pulse_payments/payment/history/`;
