import RazorpayCheckout from "react-native-razorpay";
import { Toast } from "react-native-toast-notifications";
import { all, call, put, takeLeading } from "redux-saga/effects";
import { handleNavigation } from "../../../../nadiswaraPro/Navigation/NaviagationHelper";
import { apiCall } from "../../../../nadiswaraPro/Network/NetworkWrapper";
import { MyprofileNetwork } from "../../Network/MyprofileNetwork";
import * as MyprofileAction from "../Actions/MyprofileAction";

function* getProfileRequest() {
  try {
    const response = yield apiCall(MyprofileNetwork.getProfileRequestApiCall);
    const profileDetails = yield response;
    if (profileDetails) {
      if (
        profileDetails &&
        profileDetails?.data?.status === "success" &&
        profileDetails?.status === 200
      ) {
        yield put(MyprofileAction.getProfileSuccess(profileDetails.data));
      } else {
        yield put(
          MyprofileAction.getProfileError({
            message: profileDetails?.data?.message,
          })
        );
      }
    }
  } catch (e) {
    yield put(MyprofileAction.getProfileError({ message: "Network Error" }));
  }
}

function* updateProfileRequest(action) {
  try {
    const response = yield apiCall(
      MyprofileNetwork.updateProfileRequestApiCall,
      action.payload
    );
    const profileDetails = yield response;
    if (profileDetails) {
      if (
        profileDetails &&
        profileDetails?.data?.status === "success" &&
        profileDetails?.status === 200
      ) {
        yield put(MyprofileAction.updateProfileSuccess(profileDetails.data));
        Toast.show(`${profileDetails?.data?.message} successfully`, {
          type: "success",
          placement: "bottom",
          duration: 3000,
          animationType: "zoom-in",
          successColor: "green",
        });
      } else {
        yield put(
          MyprofileAction.updateProfileError({
            message: profileDetails?.data?.message,
          })
        );
      }
    }
  } catch (e) {
    yield put(MyprofileAction.getProfileError({ message: "Network Error" }));
  }
}

function* getWalletBalance() {
  try {
    const response = yield apiCall(
      MyprofileNetwork.getWalletBalanceRequestApiCall
    );
    const walletBalance = yield response;
    if (walletBalance) {
      if (
        walletBalance &&
        walletBalance?.data?.status === "success" &&
        walletBalance?.status === 200
      ) {
        yield put(
          MyprofileAction.getBalanceSuccess(
            walletBalance?.data?.data?.wallet_balance
          )
        );
      } else {
        yield put(
          MyprofileAction.getBalanceError({
            message: walletBalance?.data?.message,
          })
        );
      }
    }
  } catch (e) {
    yield put(MyprofileAction.getBalanceError({ message: "Network Error" }));
  }
}

function* getWalletTransactions() {
  try {
    const response = yield apiCall(
      MyprofileNetwork.getWalletTransactionsRequestApiCall
    );
    const walletTransactions = yield response;
    if (walletTransactions) {
      if (
        walletTransactions &&
        walletTransactions?.data?.status === "success" &&
        walletTransactions?.status === 200
      ) {
        yield put(
          MyprofileAction.getWalletTransactionsSuccess(
            walletTransactions?.data?.data?.transactions
          )
        );
      } else {
        yield put(
          MyprofileAction.getWalletTransactionsError({
            message: walletTransactions?.data?.message,
          })
        );
      }
    }
  } catch (e) {
    yield put(
      MyprofileAction.getWalletTransactionsError({ message: "Network Error" })
    );
  }
}

function* addBalancerequest(action) {
  const { amount } = action.payload;

  try {
    const payload = { amount: Number(amount) };

    // Step 1: Create a payment order via API call
    const response = yield apiCall(
      MyprofileNetwork.addBalanceOrderCreationRequestApiCall,
      payload
    );
    const updatedRes = yield response;

    if (updatedRes.status !== 200 && updatedRes.status !== 201) {
      throw new Error(updatedRes?.data?.error || "Payment initiation failed");
    }

    const { order_id, currency, amount: amt } = updatedRes?.data;

    // Step 2: Prepare Razorpay options
    const options = {
      description: "Add Balance",
      image: "https://i.imgur.com/3g7nmJC.png", // Replace with your logo
      order_id,
      currency,
      key: "rzp_live_77EdcqH0WZ694K", // Replace with your Razorpay key
      amount: Number(amt),
      name: "Nadiswara",
      prefill: {
        email: "info@basavaanveshan.com",
        contact: "9008277740",
        name: "Nadiswara",
      },
      theme: { color: "#53a20e" },
    };

    // Step 3: Open Razorpay checkout
    const razorpayResponse = yield RazorpayCheckout.open(options);

    const verifyingPaymentPayload = {
      razorpay_order_id: razorpayResponse.razorpay_order_id,
      razorpay_payment_id: razorpayResponse.razorpay_payment_id,
      razorpay_signature: razorpayResponse.razorpay_signature,
      amount: Number(amt),
    };

    // Step 4: Verify payment on the server
    const verifyResponse = yield apiCall(
      MyprofileNetwork.paymentVerifyApiCall,
      verifyingPaymentPayload
    );
    const updatedVerifyRes = yield verifyResponse;

    if (updatedVerifyRes.status === 200 || updatedVerifyRes.status === 201) {
      Toast.show("Payment successful", {
        type: "success",
        placement: "bottom",
        duration: 3000,
        animationType: "zoom-in",
        successColor: "green",
      });
      yield call(getWalletBalance);
      yield call(getWalletTransactions);
      yield put(MyprofileAction.addBalanceSuccess(updatedVerifyRes?.data));
      handleNavigation("WalletScreen");
    } else {
      yield put(MyprofileAction.addBalanceError(updatedVerifyRes?.data?.error));
      throw new Error(
        updatedVerifyRes?.data?.error || "Payment verification failed"
      );
    }
  } catch (error) {
    // Generic error handling
    yield put(MyprofileAction.addBalanceError());
    Toast.show("Payment process failed", {
      type: "danger",
      placement: "bottom",
      duration: 3000,
      animationType: "zoom-in",
      successColor: "red",
    });
  }
}

function* deviceEnrolmentRequest(action) {
  try {
    const response = yield apiCall(
      MyprofileNetwork.deviceEnrolmentApiCall,
      action.payload
    );
    const deviceEnrolmentResponse = yield response;
    if (deviceEnrolmentResponse) {
      if (
        deviceEnrolmentResponse &&
        deviceEnrolmentResponse?.data?.status === "success" &&
        deviceEnrolmentResponse?.status === 201
      ) {
        yield put(
          MyprofileAction.deviceEnrolmentRequestSuccess(
            deviceEnrolmentResponse.data
          )
        );
      } else {
        yield put(
          MyprofileAction.deviceEnrolmentRequestError(
            deviceEnrolmentResponse.data
          )
        );
        Toast.show(deviceEnrolmentResponse?.message, {
          type: "danger",
          placement: "bottom",
          duration: 3000,
          animationType: "zoom-in",
          dangerColor: "red",
        });
      }
    }
  } catch (e) {
    yield put(
      MyprofileAction.deviceEnrolmentRequestError({ message: "Network Error" })
    );
    Toast.show("Network Error", {
      type: "danger",
      placement: "bottom",
      duration: 3000,
      animationType: "zoom-in",
      dangerColor: "red",
    });
  }
}

function* MyprofileSaga() {
  yield all([
    takeLeading(MyprofileAction.getProfileRequest, getProfileRequest),
    takeLeading(MyprofileAction.updateProfileRequest, updateProfileRequest),
    takeLeading(MyprofileAction.addBalanceRequest, addBalancerequest),
    takeLeading(MyprofileAction.getBalanceRequest, getWalletBalance),
    takeLeading(
      MyprofileAction.getWalletTransactionsRequest,
      getWalletTransactions
    ),
    takeLeading(MyprofileAction.deviceEnrolmentRequest, deviceEnrolmentRequest),
  ]);
}

export default MyprofileSaga;
