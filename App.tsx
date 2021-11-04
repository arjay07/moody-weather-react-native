import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Switch, SwitchChangeEvent, Text, View } from 'react-native';
import MoodyWeather, { Position } from './components/MoodyWeather';
import * as Location from "expo-location";

export default function App() {

  const [location, setLocation] = useState<Position | null>(null);
  const [degradeMode, setDegradeMode] = useState(false);

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
    })();
  }, []);

  const onSwitch = () => {
    setDegradeMode(!degradeMode);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRight}>
        <Text style={styles.degradeModeText}>
          {
            degradeMode ? "Degrade me" : ""
          }
        </Text>
        <Switch onChange={onSwitch} 
                value={degradeMode}
                thumbColor={degradeMode ? "#fd0e0e" : "#f0f0f0"}
                trackColor={{
                  true: "#fd0e0e",
                  false: "#9f9f9f"
                }}/>
      </View>
      { 
        location ? 
        <MoodyWeather tempUnit="f" degradeMode={degradeMode} location={location}/>
        : null
      }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topRight: {
    position: "absolute",
    top: 40,
    right: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  degradeModeText: {
    color: "#fd0e0e",
    fontWeight: "100",
    fontSize: 12
  }
});
