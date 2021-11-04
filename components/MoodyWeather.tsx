import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Image, Text, View } from "react-native";
import { API_URL } from "@env";
import axios from "axios";
import { styles } from "./MoodyWeather.style";
import SpeechBubble from "./SpeechBubble";

type Position = {
    latitude: number,
    longitude: number
};

type MoodyWeatherModel = {
    weather:  {
        location: {
            name: string,
            region: string,
            country: string
        },
        current: {
           condition: {
               text: string,
               icon: string,
               code: number
           },
           temp_f: number,
           temp_c: number,
           feelslike_c: number,
           feelslike_f: number,
           cloud: number,
           is_day: number
        }
    },
    dialogue: {
        text: string,
        isInsult: boolean
    }
};

const MoodyWeather = ({tempUnit, degradeMode}: {tempUnit: 'f' | 'c', degradeMode: boolean }) => {

    const [location, setLocation] = useState<Position>({
        latitude: 0,
        longitude: 0
    });
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [moodyWeather, setMoodyWeather] = useState<MoodyWeatherModel | undefined | null>();

    const askLocationPermission = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status != "granted") {
                console.error("Did not grant permission for location.");
                setErrorMsg("Location services is required to use Moody Weather.");
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
                setErrorMsg("Location services is required to use Moody Weather.");
                console.error("Unable to retrieve weather. Locations services not permitted.");
            }

            try {
                console.log("Retrieving weather...");
                const q = `${location.latitude},${location.longitude}`;
                const weatherResponse = await axios.get(`${API_URL}/moody-weather`, {
                    params: { q, degrading: degradeMode }
                });
                setMoodyWeather(weatherResponse.data);

            } catch (e: any) {
                setErrorMsg(`Unable to retrieve weather: ${e.message}`)
                console.error(`Unable to retrieve weather: ${e.message}`);
            }

            setLoading(false);

        })();
    }, []);

    return (
        <>
            <View style={styles.weatherCard}>
                <View style={styles.conditionSummary}>
                    <Text style={styles.conditionTemp}>
                        {
                            tempUnit === "f" ?
                                moodyWeather?.weather.current.temp_f :
                                moodyWeather?.weather.current.temp_c
                        }&deg;
                    </Text>
                    <View style={styles.conditionIconContainer}>
                        <Image style={styles.conditionIcon} source={{uri: `http:${moodyWeather?.weather.current.condition.icon}`}}/>
                        <Text style={styles.conditionText}>
                            {moodyWeather?.weather.current.condition.text}
                        </Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.locationName}>
                        {moodyWeather?.weather.location.name}
                    </Text>
                    <Text style={styles.locationSub}>
                        {moodyWeather?.weather.location.region}, {moodyWeather?.weather.location.country}
                    </Text>
                </View>
            </View>
            <SpeechBubble dialogue={moodyWeather?.dialogue.text} isLoading={loading}></SpeechBubble>
        </>
    );
    
};

export default MoodyWeather;