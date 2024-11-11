import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { verticalScale } from '../../../nadiswaraPro/Utils/Metrics';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },

    firstContainer: { alignItems: 'center', marginTop: verticalScale(50), flex: 1, backgroundColor: 'white' },

    logo: {
        width: wp('23%'),
        height: hp('10%')
    },

    titleText: {
        fontSize: hp('4%'),
        textAlign: 'center'
    },

    titleTextShape1: {
        position: 'absolute',
        left: -28,
        top: -20
    },

    titleWrapper: { flexDirection: 'row' },

    titleTextShape2: {
        position: 'absolute',
        right: -40,
        top: -20
    },

    dscpText: { textAlign: 'center', color: '#575757', fontSize: hp('2%') },

    dscpWrapper: { marginTop: 30 },

    buttonWrapper: {
        backgroundColor: '#572673',
        width: wp('92%'),
        paddingVertical: 18,
        borderRadius: 50,
        marginTop: 40
    },

    buttonText: { color: 'white', textAlign: 'center' },

    backgroundImage: { width: wp('70%'), height: hp('40%') },

    backgroundImageWrapper: {
        alignSelf: 'center',
        marginTop: 10
    },

    titleShape3: { position: 'absolute', left: 60 },

    bachgroundShape1: { position: 'absolute', top: 35, left: -20 },

    bachgroundShape2: { position: 'absolute', right: 0, top: 35, right: -20 },

    bachgroundShape3: { position: 'absolute', left: -32, top: 20 },

    bachgroundShape4: { position: 'absolute', left: 32, top: 30 },

    bachgroundShape5: { position: 'absolute', left: 100 }
});

export default styles;
