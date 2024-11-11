import { StyleSheet } from 'react-native';
import Colors from '../../Theme/Colors';
import { customerAppTheme } from '../../Theme/Theme';
import { FONT_FAMILY } from '../../Utils/Constants';
import { verticalScale } from '../../Utils/Metrics';
import { setFont } from '../../Utils/ResponsiveFont';
import { getContainerWidth } from '../../Utils/helpers';

export default StyleSheet.create({
    labelCount: {
        minWidth: 10,
        maxWidth: 20,
        height: 15,
        textAlign: 'center',
        fontSize: setFont(10),
        backgroundColor: Colors.secondary_color,
        fontFamily: FONT_FAMILY.MEDIUM,
        paddingHorizontal: 1,
        paddingVertical: 1,
        color: Colors.white,
        borderRadius: 4,
        position: 'absolute',
        top: 8,
        left: 20,
        right: 0,
        overflow: 'hidden'
    },
    titleStyle: {
        fontFamily: FONT_FAMILY.MEDIUM,
        paddingVertical: 8,
        backgroundColor: Colors.white,
        paddingHorizontal: 16,
        fontSize: setFont(24),
        color: customerAppTheme.colors.text,
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    notificationIconStyle: {
        width: 40,
        height: 50,
        borderRadius: 0,
        paddingTop: 9,
        paddingLeft: 7
    },
    zendeskChatIconStyle: {
        paddingHorizontal: 8,
        paddingVertical: 10
    },
    buttonStyle: {
        width: getContainerWidth(),
        marginVertical: 10,
        height: 56
    },
    buttonContentStyles: {
        width: '90%',
        marginBottom: verticalScale(10)
    },
    finishButtonStyles: {
        width: '90%',
        marginBottom: 10
    },
    textBold: { fontFamily: FONT_FAMILY.BOLD, fontWeight: 'bold' }
});
