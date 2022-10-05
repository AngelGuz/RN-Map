import { useEffect, useRef, useState } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { Location } from '../interfaces/appInterfaces';

export const useLocation = () => {

    const [hasLocation, setHasLocation] = useState(false);
    const [routeLines, setRouteLines] = useState<Location[]>([]);

    const [initialPosition, setInitialPosition] = useState<Location>({
        longitude: 0,
        latitude: 0
    });

    const [userLocation, setUserLocation] = useState<Location>({
        latitude: 0,
        longitude: 0
    });

    const watchId = useRef<number>();
    const isMounted = useRef(true);

    useEffect(() => {
      isMounted.current = true;

      return () => {
        isMounted.current = false;
      }
    }, [])
    

    useEffect(() => {
        getCurrentLocation()
            .then(location => {

                if(!isMounted.current) return;

                setInitialPosition(location);
                setUserLocation(location);
                setRouteLines( routes => [...routes, location]);
                setHasLocation(true);
            });
    }, []);

    const getCurrentLocation = (): Promise<Location> => {
        return new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition(
                ({coords}) => {
                    console.log(`Latitud: ${coords.latitude}, Longitud: ${coords.longitude}`);
                    resolve({
                        latitude: coords.latitude,
                        longitude: coords.longitude
                    });
                },
                (err) => reject({err}),
                {
                    enableHighAccuracy: true,
                    timeout: 2000,
                    maximumAge: 3600000,
                }
            );
        });
    }

    const followUserLocation = () => {
        watchId.current = Geolocation.watchPosition(
            ({coords}) => {

                if(!isMounted.current) return;

                const location: Location = {
                    latitude: coords.latitude,
                    longitude: coords.longitude
                }
                setUserLocation(location);
                setRouteLines( routes => [...routes, location]);
                console.log(routeLines);
            },
            (err) => console.log(err),
            {enableHighAccuracy: true, distanceFilter: 10}
        );
    }

    const stopFollowUserLocation = () => {
        if(watchId.current)
            Geolocation.clearWatch(watchId.current);
    }

    return {
        hasLocation,
        initialPosition,
        getCurrentLocation,
        followUserLocation,
        userLocation,
        stopFollowUserLocation, 
        routeLines
    }
}