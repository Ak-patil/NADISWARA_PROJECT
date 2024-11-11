import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../../Style/AccountConfirmation.styles';

const AccountConfirmation = () => {
    const navigation = useNavigation();

    return (
        <LinearGradient colors={['#E5ECF9', '#F6F7F9']} style={styles.container}>
            {/* <Image source={require('../../../../assets/Images/account_confirmation.png')} style={styles.image} /> */}
            <Text style={styles.title}>Account Created</Text>
            <View style={styles.textContainer}>
                <Text style={styles.text}>Your account has been created</Text>
                <Text style={styles.text}>successfully</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.buttonText}>Explore nadiswaraPro</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
};

export default AccountConfirmation;
