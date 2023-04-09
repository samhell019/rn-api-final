import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme, DarkTheme, } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useColorScheme } from 'react-native';
import { AuthProvider } from './providers/AuthProvider';

import Home from './screens/Home';
import Users from './screens/Users';
import Login from './screens/Login';
import Register from './screens/Register';
import List from './screens/drives/List';
import Add from './screens/drives/Add';
import Panel from './screens/Panel';

export const SCREEN_HOME = "Home"
export const SCREEN_USERS = "Users"
export const SCREEN_LOGIN = "Login"
export const SCREEN_REGISTER = "Register"
export const SCREEN_DRIVES = "Drives"
export const SCREEN_ADDING_DRIVES = "AddingDrives"

const Tab = createBottomTabNavigator();

export default function App() {
  const scheme = useColorScheme();
  return (
    <AuthProvider>
      <SafeAreaProvider>
       <Panel/>
      </SafeAreaProvider>
    </AuthProvider>
  );
}