import React,{ createContext, useEffect, useState } from "react";
import { AppState, Platform } from "react-native";
import { check, openSettings, PERMISSIONS, PermissionStatus, request } from "react-native-permissions"
import App from '../../App';

export interface PermissionsState {
    locationStatus: PermissionStatus;
}

export const permissionInitState: PermissionsState = {
    locationStatus: 'unavailable',
}

type PermissionsContextProps = {
    permissions: PermissionsState;
    askLocationPermission: () => void;
    checkLoationPermission: () => void;
}

export const PermissionsContext = createContext({} as PermissionsContextProps);

export const PermissionsProvider = ({children}: any) => {
    const [permissions, setPermissions] = useState(permissionInitState);    
    
    const askLocationPermission = async() => {
        let permissionStatus: PermissionStatus;
    
        if( Platform.OS === 'ios' ){
          permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        }else{
          permissionStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }

        if(permissionStatus === "blocked"){
            openSettings();
        }
    
        setPermissions({
            ...permissions,
            locationStatus: permissionStatus
        });
    }

    const checkLoationPermission = async() => {
        let permissionStatus: PermissionStatus;
    
        if( Platform.OS === 'ios' ){
          permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        }else{
          permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }
        setPermissions({
            ...permissions,
            locationStatus: permissionStatus
        });
    }

    const handleAppStateChange = (state: string) => {
        
        if(state !== "active") return;

        checkLoationPermission();

    } 

    useEffect(() => {

        handleAppStateChange(AppState.currentState);

        AppState.addEventListener('change', handleAppStateChange);

        return () => {
            AppState.removeEventListener('change', handleAppStateChange);
        };
    }, [])

    return (
        <PermissionsContext.Provider value={{
            permissions,
            askLocationPermission,
            checkLoationPermission
        }}>
            {children}
        </PermissionsContext.Provider>
    )
}