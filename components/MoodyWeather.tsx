import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import { API_URL } from "@env";
import axios from "axios";
import { styles } from "./MoodyWeather.style";
import SpeechBubble from "./SpeechBubble";

export type Position = {
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

const MoodyWeather = ({tempUnit, degradeMode, location}: {tempUnit: 'f' | 'c', degradeMode: boolean, location: Position }) => {

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [moodyWeather, setMoodyWeather] = useState<MoodyWeatherModel | undefined | null>();

    useEffect(() => {
        setLoading(true);
        (async () => {
            if (location == null) {
                return;
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
    }, [degradeMode]);

    return (
        <View>
            {
                loading ?
                <ActivityIndicator size="large" color="#4982c2"/> :
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
            }
        </View>
    );
    
};

export default MoodyWeather;