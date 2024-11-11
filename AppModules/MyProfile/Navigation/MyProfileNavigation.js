import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SCREEN_OPTIONS } from '../../../gigfws/Navigation/ScreenOptions';
import AboutYourself from '../View/AboutYourself';
import ChangePassword from '../View/ChangePassword';
import EditProfileScreen from '../View/EditProfileScreen';
import MyProfileScreen from '../View/MyProfileScreen';

const MyProfileStack = createNativeStackNavigator();

export const MyProfileStackScreen = () => {
    return (
        <MyProfileStack.Navigator headerMode="none">
            <MyProfileStack.Screen
                options={{
                    headerShown: false
                }}
                name={SCREEN_OPTIONS.MYPROFILE.route_name}
                title={SCREEN_OPTIONS.MYPROFILE.screen_title}
                component={MyProfileScreen}
            />
            <MyProfileStack.Screen
                options={{
                    headerShown: false
                }}
                name={SCREEN_OPTIONS.EDIT_PROFILE.route_name}
                title={SCREEN_OPTIONS.EDIT_PROFILE.screen_title}
                component={EditProfileScreen}
            />
            <MyProfileStack.Screen
                options={{
                    headerShown: false
                }}
                name={SCREEN_OPTIONS.ABOUT_YOURSELF.route_name}
                title={SCREEN_OPTIONS.ABOUT_YOURSELF.screen_title}
                component={AboutYourself}
            />
            <MyProfileStack.Screen
                options={{
                    headerShown: false
                }}
                name={SCREEN_OPTIONS.CHANGE_PASSWORD.route_name}
                title={SCREEN_OPTIONS.CHANGE_PASSWORD.screen_title}
                component={ChangePassword}
            />
        </MyProfileStack.Navigator>
    );
};
