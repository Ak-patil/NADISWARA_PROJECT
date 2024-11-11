import RazorpayCheckout from 'react-native-razorpay';
import { Toast } from 'react-native-toast-notifications';
import { all, put, takeLeading } from 'redux-saga/effects';
import { handleNavigation } from '../../../../nadiswaraPro/Navigation/NaviagationHelper';
import { apiCall } from '../../../../nadiswaraPro/Network/NetworkWrapper';
import { PaymentNetwork } from '../../Network/PaymentsNetwork';
import * as PaymentsAction from '../Action/PaymentsAction';
import { PaymentsActionConst } from '../Action/PaymentsActionConst';

function* enrolrequest(action) {
    const { id, price } = action.payload;
    try {
        const payload = {
            course_id: Number(id),
            amount: Number(price)
        };

        // Step 1: Create a payment order via API call
        const response = yield apiCall(PaymentNetwork.CreateUserIdApiCall, payload);
        const updatedRes = yield response;

        if (updatedRes.status === 200 || updatedRes.status === 201) {
            const { order_id, currency, amount: amt } = updatedRes.data;

            // Step 2: Prepare Razorpay options
            const options = {
                description: 'Course Purchase',
                image: 'https://i.imgur.com/3g7nmJC.png', // Replace with your logo
                order_id: order_id,
                currency: currency,
                key: 'rzp_live_77EdcqH0WZ694K', // Replace with your Razorpay key
                amount: Number(amt),
                name: 'Oohy',
                prefill: {
                    email: 'void@razorpay.com',
                    contact: '9191919191',
                    name: 'Razorpay Software'
                },
                theme: { color: '#53a20e' }
            };

            console.log('options', options);

            try {
                // Step 3: Open Razorpay checkout and handle success
                const razorpayResponse = yield RazorpayCheckout.open(options);

                if (razorpayResponse) {
                    const verifyingPaymentPayload = {
                        order_id: razorpayResponse.razorpay_order_id,
                        payment_id: razorpayResponse.razorpay_payment_id,
                        signature: razorpayResponse.razorpay_signature,
                        amount: Number(amt)
                    };

                    // Step 4: Verify payment on the server
                    const verifyResponse = yield apiCall(PaymentNetwork.PaymentVerifyApiCall, verifyingPaymentPayload);
                    const updatedVerifyRes = yield verifyResponse;

                    if (updatedVerifyRes.status === 200 || updatedVerifyRes.status === 201) {
                        // yield call(courselistapicallRequest);
                        // Step 5: Handle successful payment verification
                        handleNavigation('Course');
                        Toast.show('Payment successful', {
                            type: 'success',
                            placement: 'bottom',
                            duration: 3000,
                            animationType: 'zoom-in',
                            successColor: 'green'
                        });

                        console.log('verifyResponse', updatedVerifyRes);

                        yield put({
                            type: PaymentsActionConst.ENROLL_SUCCESS,
                            payload: {
                                paymentId: razorpayResponse.razorpay_payment_id
                            }
                        });
                    } else {
                        // Handle verification failure
                        Toast.show('Payment verification failed', {
                            type: 'danger',
                            placement: 'bottom',
                            duration: 3000,
                            animationType: 'zoom-in',
                            successColor: 'red'
                        });

                        yield put({
                            type: PaymentsActionConst.ENROLL_FAILURE,
                            payload: { error: 'Payment verification failed' }
                        });
                    }
                }
            } catch (razorpayError) {
                // Handle Razorpay failure
                Toast.show('Payment failed', {
                    type: 'danger',
                    placement: 'bottom',
                    duration: 3000,
                    animationType: 'zoom-in',
                    successColor: 'red'
                });

                yield put({
                    type: PaymentsActionConst.ENROLL_FAILURE,
                    payload: { error: razorpayError.message }
                });
            }
        } else {
            // Handle order creation failure
            Toast.show(updatedRes?.data?.error || 'Payment initiation failed', {
                type: 'danger',
                placement: 'bottom',
                duration: 3000,
                animationType: 'zoom-in',
                successColor: 'red'
            });
        }
    } catch (error) {
        // Step 6: Handle failure
        yield put({
            type: PaymentsActionConst.ENROLL_FAILURE,
            payload: {
                error: error.message
            }
        });
    }
}

function* PaymentsSaga() {
    yield all([takeLeading(PaymentsAction.enrollNowRequest, enrolrequest)]);
}

export default PaymentsSaga;
