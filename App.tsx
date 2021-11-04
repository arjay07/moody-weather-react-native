import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Switch, SwitchChangeEvent, Text, View } from 'react-native';
import MoodyWeather, { Position } from './components/MoodyWeather';
import * as Location from "expo-location";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import DialogContainer from 'react-native-dialog/lib/Container';
import DialogButton from 'react-native-dialog/lib/Button';

export default function App() {

  const [location, setLocation] = useState<Position | null>(null);
  const [degradeMode, setDegradeMode] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);

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

  const openInfoDialog = () => {
    setInfoVisible(true);
  };

  const closeInfoDialog = () => {
    setInfoVisible(false);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.topLeft} onPress={openInfoDialog}>
        <FontAwesomeIcon icon={faInfoCircle} color="#8f8f8f" size={20}/>
      </Pressable>
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
      <View style={styles.bottomLeft}>
        <Text style={styles.copyrightText}>
          &copy; Moody Weather 2021
        </Text>
      </View>
      { 
        location ? 
        <MoodyWeather tempUnit="f" degradeMode={degradeMode} location={location}/>
        : null
      }
      <DialogContainer visible={infoVisible}>
        <View style={styles.dialogContent}>
          <View style={styles.infoLogo}>
            <Image source={require("./assets/favicon.png")} style={{
              width: 128,
              height: 128
            }}/>
          </View>
          <Text style={{
            textAlign: "center",
            fontWeight: "700",
            fontSize: 24,
            marginBottom: 10
          }}>
            About Moody Weather
          </Text>
          <Text style={{
            textAlign: "left",
            fontSize: 14
          }}>
            The weather seems a little moody. Bad weather? Get insulted. Good weather? Get complimented. Make your bad days worse and your good days better.
          </Text>
        </View>
        <DialogButton label="Ok" onPress={closeInfoDialog}></DialogButton>
      </DialogContainer>
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

  topLeft: {
    position: "absolute",
    top: 40,
    left: 15,
    padding: 10
  },

  bottomLeft: {
    position: "absolute",
    bottom: 5,
    left: 15,
    textAlign: "left"
  },

  copyrightText: {
    color: "#8f8f8f",
    fontWeight: "100",
    fontSize: 10
  },

  degradeModeText: {
    color: "#fd0e0e",
    fontWeight: "100",
    fontSize: 12
  },

  infoLogo: {
    width: 128,
    height: 128,
    margin: "auto"
  },

  dialogContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  }
});
