import { StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../../../nadiswaraPro/Utils/Color';
import { horizontalScale, moderateScale, verticalScale } from '../../../nadiswaraPro/Utils/Metrics';

export const styles = StyleSheet.create({
    container: { paddingHorizontal: horizontalScale(16), flex: 1 },

    wrapper: {
        marginTop: verticalScale(150)
    },

    slideImage: { alignSelf: 'center', marginBottom: verticalScale(30) },
    dotStyle: {
        backgroundColor: Colors.NEUTRAL.NEUTRAL_CENTRE_STAGE,
        width: responsiveWidth(2.5),
        height: responsiveWidth(2.5),
        borderRadius: moderateScale(5),
        marginHorizontal: horizontalScale(5)
    },

    activeDotStyle: {
        backgroundColor: Colors.PRIMARY.PRIMARY_RETRO_BLUE,
        width: responsiveWidth(2.5),
        height: responsiveWidth(2.5),
        borderRadius: moderateScale(5),
        marginHorizontal: horizontalScale(5)
    },

    title: {
        fontSize: hp('3.5%'),
        textAlign: 'center'
    },

    description: {
        fontSize: hp('2.5%'),
        color: Colors.NEUTRAL.NEUTRAL_SHADOW_MOUNTAIN,
        textAlign: 'center'
    },

    descriptionContainer: {
        marginTop: verticalScale(15)
    },

    buttonContainer: {
        backgroundColor: Colors.PRIMARY.PRIMARY_RETRO_BLUE,
        width: responsiveWidth(88),
        height: responsiveHeight(5.5),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50
    },
    buttonText: {
        color: Colors.NEUTRAL.NEUTRAL_WHITE,
        fontSize: moderateScale(16)
    }
});
