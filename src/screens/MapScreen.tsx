import React from 'react';
import { View, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Map } from '../components/Map';

export const MapScreen = () => {
    return (
        <View style={{flex: 1}}>
             <Map />
        </View>
    )
}