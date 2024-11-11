import { Nunito_600SemiBold } from '@expo-google-fonts/nunito';
import { Raleway_700Bold, useFonts } from '@expo-google-fonts/raleway';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../AppModules/Authentication/Redux/Actions/AuthAction';
import { handleNavigation } from '../../nadiswaraPro/Navigation/NaviagationHelper';
import { moderateScale } from '../../nadiswaraPro/Utils/Metrics';
import { styles } from './styles/CustomDrawer.styles';

const CustomDrawer = (props) => {
    const dispatch = useDispatch();
    let [fontsLoaded, fontError] = useFonts({
        Raleway_700Bold,
        Nunito_600SemiBold
    });

    if (!fontsLoaded && !fontError) {
        return null;
    }

    const { width } = Dimensions.get('window');
    const buttonSize = width * 0.1;

    const logout = async () => {
        dispatch(logoutAction());
        await AsyncStorage.clear()
            .then(() => {
                handleNavigation('launchscreen');
            })
            .catch((e) => console.log(e, '::error while login'));
    };

    return (
        <LinearGradient colors={['#E5ECF9', '#F6F7F9']} style={styles.container}>
            <View style={styles.header}>
                {/* <Image source={require('@/assets/Images/user.png')} style={styles.headerImage} /> */}
                <View style={styles.textContainer}>
                    <Text style={[styles.headerText, { fontFamily: 'Raleway_700Bold' }]}>Anand Patil</Text>
                    <Text style={[styles.headerEmail, { fontFamily: 'Nunito_600SemiBold' }]}>anandpatil676@gmail.com</Text>
                </View>
            </View>

            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} labelStyle={styles.drawerContent} activeTintColor="#2E86C1" inactiveTintColor="#333" />
            </DrawerContentScrollView>

            <TouchableOpacity style={styles.signOutButton} onPress={() => logout()}>
                <AntDesign name="logout" size={moderateScale(24)} color={'#2E86C1'} />
                <Text style={[styles.signOutText, { fontFamily: 'Raleway_700Bold' }]}>Sign Out</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
};

export default CustomDrawer;
