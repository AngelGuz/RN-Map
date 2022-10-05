import React, { useContext } from 'react';

import {createStackNavigator} from '@react-navigation/stack'

import { LoadingScreen } from '../screens/LoadingScreen';
import { MapScreen } from '../screens/MapScreen';
import { PermissionsScreen } from '../screens/PermissionsScreen';
import { PermissionsContext } from '../context/PermissionsContext';

const Stack = createStackNavigator();

export const Navigator = () => {

    const {permissions} = useContext(PermissionsContext);

    if(permissions.locationStatus === "unavailable"){
      return <LoadingScreen />
    } 

    return (
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          {
            (permissions.locationStatus === 'granted')
            ? <Stack.Screen name="Map" component={MapScreen} />
            : <Stack.Screen name="Permission" component={PermissionsScreen} />
          }
        </Stack.Navigator>
    )
}