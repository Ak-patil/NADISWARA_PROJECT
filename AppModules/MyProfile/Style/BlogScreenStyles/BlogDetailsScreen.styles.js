import { StyleSheet } from 'react-native';
import { horizontalScale, moderateScale, verticalScale } from '../../../../nadiswaraPro/Utils/Metrics';

export const styles = StyleSheet.create({
    mainContainer: { flex: 1 },
    container: {
        marginHorizontal: 16
    },
    image: {
        width: '100%',
        height: verticalScale(200),
        resizeMode: 'cover',
        marginBottom: verticalScale(10),
        borderRadius: moderateScale(10)
    },
    title: {
        fontSize: moderateScale(20),
        marginBottom: verticalScale(15)
    },
    meta: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    metaText: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: verticalScale(10)
    },
    metaIcon: {
        marginRight: horizontalScale(2)
    },
    metaInfo: {
        color: '#808080'
    },
    content: {
        lineHeight: verticalScale(24),
        textAlign: 'justify',
        color: '#808080',
        fontSize: moderateScale(16)
    },
    quoteContainer: {
        backgroundColor: '#F3F4F8',
        padding: moderateScale(16),
        borderRadius: moderateScale(15),
        marginBottom: verticalScale(20)
    },
    quote: {
        fontStyle: 'italic',
        marginBottom: 8,
        marginTop: 8
    },
    signature: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    signatureLine: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 8
    },
    signatureText: {
        marginLeft: 8
    },
    postTagContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20
    },
    postTagText: { fontSize: 16 },
    postTagWrapper: { flexDirection: 'row', gap: 10, marginLeft: 10 },
    postTagButton: { backgroundColor: '#FFFF', padding: 10, borderRadius: 6 }
});
