import { StyleSheet } from 'react-native';
import { horizontalScale, moderateScale, verticalScale } from '../../../nadiswaraPro/Utils/Metrics';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    image: {
        width: horizontalScale(250),
        height: verticalScale(250),
        resizeMode: 'contain'
    },
    title: {
        fontSize: moderateScale(24),
        fontWeight: 'bold',
        marginTop: verticalScale(20)
    },
    textContainer: {
        alignItems: 'center',
        marginVertical: verticalScale(10)
    },
    text: {
        fontSize: moderateScale(16),
        color: 'gray'
    },
    button: {
        backgroundColor: '#007BFF',
        borderRadius: moderateScale(5),
        marginTop: verticalScale(20),
        width: '70%',
        paddingVertical: verticalScale(15)
    },
    buttonText: {
        color: 'white',
        fontSize: moderateScale(18),
        fontWeight: 'bold',
        textAlign: 'center'
    }
});
