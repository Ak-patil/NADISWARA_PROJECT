import { Platform } from 'react-native';

export const BASE_ID = 'MYPay_';
export const VIEW_DISABLED = '_Disabled';
export const VIEW_SELECTED = '_Selected';

export const setTestId = (screenName, id) => {
    try {
        return Platform.OS === 'android'
            ? { accessible: true, accessibilityLabel: BASE_ID + screenName + '_' + id }
            : { testid: BASE_ID + screenName + '_' + id };
    } catch (e) {
        // Adding automation logging failed
    }
};
