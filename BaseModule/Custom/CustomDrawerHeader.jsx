import {} from '@expo-google-fonts/nunito';
import { Raleway_700Bold, useFonts } from '@expo-google-fonts/raleway';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { moderateScale } from '../../nadiswaraPro/Utils/Metrics';
import { styles } from './styles/CustomHeader.styles';

const CustomDrawerHeader = ({ children }) => {
    const navigation = useNavigation();

    let [fontsLoaded, fontError] = useFonts({
        Raleway_700Bold
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backIconWrapper} onPress={() => navigation.openDrawer()}>
                <FontAwesome5 name="bars" size={moderateScale(24)} color={'black'} />
            </TouchableOpacity>
            <Text style={[styles.text, { fontFamily: 'Raleway_700Bold' }]}>{children}</Text>
            <TouchableOpacity style={styles.backIconWrapper} onPress={() => navigation.navigate('Cart')}>
                <View>
                    <View style={styles.cartRed}></View>
                    <Feather name="shopping-bag" size={moderateScale(26)} color={'black'} />
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default CustomDrawerHeader;
