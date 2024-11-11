import { Toast } from 'react-native-toast-notifications';
import { all, put, takeLeading } from 'redux-saga/effects';
import { apiCall } from '../../../../nadiswaraPro/Network/NetworkWrapper';
import { MyprofileNetwork } from '../../Network/MyprofileNetwork';
import * as MyprofileAction from '../Actions/MyprofileAction';

function* getProfileRequest() {
    try {
        const response = yield apiCall(MyprofileNetwork.getProfileRequestApiCall);
        const profileDetails = yield response;
        if (profileDetails) {
            if (profileDetails && profileDetails?.data?.status === 'success' && profileDetails?.status === 200) {
                yield put(MyprofileAction.getProfileSuccess(profileDetails.data));
            } else {
                yield put(
                    MyprofileAction.getProfileError({
                        message: profileDetails?.data?.message
                    })
                );
            }
        }
    } catch (e) {
        yield put(MyprofileAction.getProfileError({ message: 'Network Error' }));
    }
}

function* updateProfileRequest(action) {
    try {
        const response = yield apiCall(MyprofileNetwork.updateProfileRequestApiCall, action.payload);
        const profileDetails = yield response;
        if (profileDetails) {
            if (profileDetails && profileDetails?.data?.status === 'success' && profileDetails?.status === 200) {
                yield put(MyprofileAction.updateProfileSuccess(profileDetails.data));
                Toast.show(`${profileDetails?.data?.message} successfully`, {
                    type: 'success',
                    placement: 'bottom',
                    duration: 3000,
                    animationType: 'zoom-in',
                    successColor: 'green'
                });
            } else {
                yield put(
                    MyprofileAction.updateProfileError({
                        message: profileDetails?.data?.message
                    })
                );
            }
        }
    } catch (e) {
        yield put(MyprofileAction.getProfileError({ message: 'Network Error' }));
    }
}

function* MyprofileSaga() {
    yield all([
        takeLeading(MyprofileAction.getProfileRequest, getProfileRequest),
        takeLeading(MyprofileAction.updateProfileRequest, updateProfileRequest)
    ]);
}

export default MyprofileSaga;
