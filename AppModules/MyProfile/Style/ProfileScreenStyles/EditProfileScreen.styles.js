import { StyleSheet } from 'react-native';
import { horizontalScale, moderateScale, verticalScale } from '../../../../nadiswaraPro/Utils/Metrics';

export const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: moderateScale(16),
        marginTop: verticalScale(50)
    },
    profileImage: {
        width: horizontalScale(120),
        height: verticalScale(120),
        borderRadius: moderateScale(60),
        marginBottom: verticalScale(16)
    },
    title: {
        fontSize: moderateScale(24),
        fontWeight: 'bold',
        marginBottom: verticalScale(16)
    },
    textInput: {
        width: '100%',
        height: verticalScale(60),
        paddingLeft: horizontalScale(16),
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: moderateScale(8),
        marginBottom: verticalScale(16),
        fontSize: moderateScale(16),
        color: 'black'
    },
    bioInput: {
        height: verticalScale(100),
        textAlignVertical: 'top'
    },
    saveButton: {
        backgroundColor: '#007bff',
        borderRadius: moderateScale(8),
        paddingVertical: verticalScale(12),
        paddingHorizontal: horizontalScale(24),
        width: '100%'
    },
    saveButtonText: {
        color: '#fff',
        fontSize: moderateScale(18),
        fontWeight: 'bold',
        textAlign: 'center'
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: moderateScale(5),
        marginBottom: verticalScale(10)
    },
    errorText: { color: 'red', fontWeight: 'bold' }
});
