import { all } from 'redux-saga/effects';
import AuthSaga from '../../AppModules/Authentication/Redux/Saga/AuthSaga';
import HomeSaga from '../../AppModules/Home/Redux/Saga/HomeSaga';
import MyprofileSaga from '../../AppModules/MyProfile/Redux/Saga/MyprofileSaga';
import PaymentsSaga from '../../AppModules/Payments/Redux/Saga/PaymentsSaga';

export default function* IndexSaga() {
    yield all([AuthSaga(), HomeSaga(), MyprofileSaga(), PaymentsSaga()]);
}
