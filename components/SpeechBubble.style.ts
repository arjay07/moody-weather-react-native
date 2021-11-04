import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    speechBubbleContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        top: 20
    },

    speechBubble: {
        position: "relative",
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
        padding: 10,
        maxWidth: 240,
        width: 240,
        margin: "auto",
        elevation: 2,
        zIndex: 900
    },

    speechBubbleText: {
        color: "#5d5d5d",
        maxWidth: "80%"
    },
    
    speechBubbleArrow: {
        width: 16,
        height: 16,
        borderLeftWidth: 8,
        borderRightWidth: 8,
        borderBottomWidth: 16,
        borderLeftColor: "white",
        borderRightColor: "white",
        borderBottomColor: "#f0f0f0",
        backgroundColor: "#f0f0f0"
    }
});