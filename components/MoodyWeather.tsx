import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Text, View } from "react-native";

type Position = {
    latitude: number,
    longitude: number
};

const MoodyWeather = () => {

    const [location, setLocation] = useState<Position>({
        latitude: 0,
        longitude: 0
    });
    const [loading, setLoading] = useState(false);

    const askLocationPermission = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status != "granted") {
                console.error("Did not grant permission for location.");
            }
        } catch (e) {
            console.error("Unable to ask for permission.");
        }
    };

    useEffect(() => {
        setLoading(true);
        (async () => {
            
            await askLocationPermission();
            
            try {
                const currentPosition = await Location.getCurrentPositionAsync();
                setLocation({
                    latitude: currentPosition.coords.latitude,
                    longitude: currentPosition.coords.longitude
                });
            } catch (e) {
                console.error("Unable to retrieve weather. Locations services not permitted.");
            }
            setLoading(false);

        })();
    }, []);

    return (
        <View>
            <Text>Latitude: {location.latitude}, Longitude {location.longitude}</Text>
        </View>
    );
    
};

export default MoodyWeather;