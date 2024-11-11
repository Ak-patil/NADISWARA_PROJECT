import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import * as AuthActionsConst from '../../../AppModules/Authentication/Redux/Actions/AuthActionsConst';
import authReducer from '../../../AppModules/Authentication/Redux/Reducer/AuthReducer';
import homeReducer from '../../../AppModules/Home/Redux/Reducer/HomeReducer';
import myprofileReducer from '../../../AppModules/MyProfile/Redux/Reducer/MyprofileReducer';
import paymentsReducer from '../../../AppModules/Payments/Redux/Reducer/PaymentsReducer';
import FilesystemStorage from '../../../nadiswaraPro/NativeDependency/FileSystem/FilesystemStorage';
import { SESSION_ACTION } from '../../../nadiswaraPro/Network/SessionManager/SessionActionConst';
import { persistConfig } from '../Store/ConfigureStore';

const authPersistConfig = {
    key: 'authState',
    storage: FilesystemStorage,
    blacklist: ['loginLoader']
};

const paymentsPersistConfig = {
    key: 'paymentsstate',
    storage: FilesystemStorage
};

const homePersistConfig = {
    key: 'homestate',
    storage: FilesystemStorage
};

const myprofilePersistConfig = {
    key: 'myprofilestate',
    storage: FilesystemStorage
};

const appReducer = combineReducers({
    authState: persistReducer(authPersistConfig, authReducer),
    myprofilestate: persistReducer(myprofilePersistConfig, myprofileReducer),
    homestate: persistReducer(homePersistConfig, homeReducer),
    paymentsstate: persistReducer(paymentsPersistConfig, paymentsReducer)
});

const rootReducer = (state, action) => {
    /**
     *  ENABLE FOR LOGOUT
     */
    if (action.type === SESSION_ACTION.INVALID_SESSION || action.type === AuthActionsConst.LOGOUT_ACITON) {
        Object.keys(state).forEach((key) => {
            if (key === 'authState' || key === 'myprofilestate' || key === 'homestate' || key === 'paymentsstate') {
                persistConfig.storage.removeItem(`persist:${key}`);
                state[key] = undefined;
            }
        });
    }
    return appReducer(state, action);
};

export default rootReducer;
