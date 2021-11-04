import React from "react";
import { View, Text } from "react-native";
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
                <Text style={styles.speechBubbleText}>
                    {getDialogue()}
                </Text>
            </View>
        </View>
    );

};

export default SpeechBubble;