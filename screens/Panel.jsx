import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import {styles} from "./Login";
import { useAuthContext, LOGOUT } from '../providers/AuthProvider';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme, DarkTheme, } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import Home from './Home';
import Users from './Users';
import Login from './Login';
import Register from './Register';
import List from './drives/List';
import Add from './drives/Add';

export const SCREEN_HOME = "Home"
export const SCREEN_USERS = "Users"
export const SCREEN_LOGIN = "Login"
export const SCREEN_REGISTER = "Register"
export const SCREEN_DRIVES = "Drives"
export const SCREEN_ADDING_DRIVES = "AddingDrives"
const Tab = createBottomTabNavigator();

export const Panel = props => {
    const [{profile, accessToken}] = useAuthContext();
    const scheme = useColorScheme();
    const [, dispatch] = useAuthContext();
    //const navigation = useNavigation();
    return (
        <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
        <Tab.Navigator
          initialRouteName={SCREEN_HOME}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              switch (route.name) {
                // https://github.com/oblador/react-native-vector-icons/blob/master/glyphmaps/Ionicons.json
                case SCREEN_HOME : iconName = "home-sharp"; break;
                case SCREEN_USERS : iconName = "people-circle-sharp"; break;
                case SCREEN_LOGIN : iconName = "people"; break;
                case SCREEN_REGISTER : iconName = "person-add"; break;
                case SCREEN_DRIVES : iconName = "car-sport-sharp"; break;
                case SCREEN_ADDING_DRIVES : iconName = "add-circle-sharp"; break;
                default: iconName = "information-circle";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#1a759f",
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name={SCREEN_HOME} component={Home} options={{ title: 'Úvod', headerStyle: { backgroundColor: '#a9d6e5' } }} />
          <Tab.Screen name={SCREEN_USERS} component={Users} options={{ title: 'Uživatelé', headerStyle: { backgroundColor: '#a9d6e5' } }} />
          <Tab.Screen name={SCREEN_DRIVES} component={List} options={{ title: 'Jízdy', headerStyle: { backgroundColor: '#a9d6e5' } }} />
          <Tab.Screen name={SCREEN_ADDING_DRIVES} component={Add} options={{ title: 'Přidat jízdu', headerStyle: { backgroundColor: '#a9d6e5' } }} />
          {
              (accessToken !== null) ?
              <>
                <Tab.Screen name={SCREEN_LOGIN} component={Login} options={{ title: 'Odhlášení', headerStyle: { backgroundColor: '#a9d6e5' }  }} 
                listeners={{
                    tabPress: e => {
                    // Prevent default action
                    e.preventDefault();
                    dispatch({type: LOGOUT})
                    //navigation.navigate(SCREEN_HOME)
                    //Any custom code here
                    },
                }} />
                <Tab.Screen name={SCREEN_REGISTER} component={Register} options={{ title: 'Registrace', headerStyle: { backgroundColor: '#a9d6e5' } }} />
              </>
                :
                <>
                <Tab.Screen name={SCREEN_LOGIN} component={Login} options={{ title: 'Přihlášení', headerStyle: { backgroundColor: '#a9d6e5' } }} />
                <Tab.Screen name={SCREEN_REGISTER} component={Register} options={{ title: 'Registrace', headerStyle: { backgroundColor: '#a9d6e5' } }} />
                </>
            }
        </Tab.Navigator>
      </NavigationContainer>
    );
};

export default Panel;