import { Dimensions, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

let SCREEN_HEIGHT = Dimensions.get('window').height;
let SCREEN_WIDTH = Dimensions.get('window').width;
let SCREEN_DIMENSION = SCREEN_HEIGHT > SCREEN_WIDTH ? SCREEN_HEIGHT : SCREEN_WIDTH;

export const setFont = (fontSize) => {
    return Platform.OS === 'web' ? fontSize : RFValue(fontSize, SCREEN_DIMENSION);
};
