import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BlackButton } from '../components/BlackButton';
import { PermissionsContext } from '../context/PermissionsContext';

export const PermissionsScreen = () => {

    const {permissions, askLocationPermission} = useContext(PermissionsContext);

    return (
        <View style={styles.container} >
            <Text style={styles.title}>
                Es necesario el uso del GPS para usar esta aplicación.
            </Text>
            <BlackButton
                title='Permiso'
                onPress={askLocationPermission}
            />

            <Text style={{marginTop: 20}}>
                {JSON.stringify(permissions, null, 5)}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        width: 250,
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20
    }
});