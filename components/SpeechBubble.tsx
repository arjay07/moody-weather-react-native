import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { View, Text, Pressable } from "react-native";
import { styles } from "./SpeechBubble.style";

const SpeechBubble = ( { dialogue, onRefresh, isLoading }: {
    dialogue?: string,
    onRefresh?: () => void,
    isLoading: boolean
} ) => {

    const getDialogue = () => {
        if (dialogue) return dialogue;
    };

    return (
        <View style={styles.speechBubbleContainer}>
            <View style={styles.speechBubbleArrow}></View>
            <View style={styles.speechBubble}>
                <Pressable style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    padding: 10
                }} onPress={onRefresh}>
                    <FontAwesomeIcon icon={faSyncAlt}/>
                </Pressable>
                <Text style={styles.speechBubbleText}>
                    {getDialogue()}
                </Text>
            </View>
        </View>
    );

};

export default SpeechBubble;