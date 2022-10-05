import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import { View, Text, Button, Platform, SafeAreaView } from 'react-native';

import { check, PERMISSIONS, PermissionStatus } from 'react-native-permissions';
import Icon from 'react-native-vector-icons/Ionicons';
import { Navigator } from './src/navigator/Navigator';
import { PermissionsProvider } from './src/context/PermissionsContext';

const AppState = ({children}: any) => {
  return (
    <PermissionsProvider>
      {children}
    </PermissionsProvider>
  )
}

const App = () => {
  return (
      <AppState>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </AppState>
  )
}

export default App;