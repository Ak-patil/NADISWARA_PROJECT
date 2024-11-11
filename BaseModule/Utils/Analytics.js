import analytics from '@react-native-firebase/analytics';
import Analytics from 'appcenter-analytics';
import crashlytics from '../../Gigfws/NativeDependency/Firebase/Crashlytics';
import { ANALYTICS_EVENTS } from './AnalyticsConst';
import { isWeb } from './helpers';

const prefix = isWeb() ? 'WEB_' : '';

export const logScreen = (screenName) => {
    analytics().logEvent(`${prefix}Screen_Name`, { name: screenName }).then();
    Analytics.trackEvent(`${prefix}screen_name`, { screen_name: screenName, screen_class: screenName }).then();
};

export const logUserEvent = (eventName, host, storeName, { customMessage = ' ' }) => {
    /**
     * [CodePush] An error has occurred : Error: analytics.logEvent():
     * Event name 'Code Push' is invalid. Names should contain 1 to 32 alphanumeric
     * characters or underscores.
     */
    let store = storeName.replace('-', '_');
    let eventOptions = {
        host: host,
        storeName: store,
        time: new Date().toString(),
        customMessage: customMessage
    };
    analytics().logEvent(`${prefix}${eventName}`, eventOptions).then();
    Analytics.trackEvent(`${prefix}${eventName}`, eventOptions).then();
};

export const setUserProperty = (name, value) => {
    analytics().setUserProperty(name, value).then();
};

// Screen Names
export const CODE_PUSH = 'Code_Push_Status';

export const logEvent = (eventName, object = {}, isCleverTapRecordNeed = false) => {
    try {
        analytics().logEvent(`${prefix}${eventName}`, object).then();
        Analytics.trackEvent(`${prefix}${eventName}`, object).then();
    } catch (e) {
        // Failed while logging
    }
};
export const logNonFatalEvent = (obj, key = 'COMMON FATAL') => {
    try {
        crashlytics().recordError(new Error(JSON.stringify(obj)), key);
    } catch (e) {
        // Failed while logging
    }
};

export const logBackPress = (screenName) => {
    logEvent(screenName, ANALYTICS_EVENTS.ICON_BACK);
};
