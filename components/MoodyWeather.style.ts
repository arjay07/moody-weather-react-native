import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({ 
    weatherImage: {
        width: 64,
        height: 64
    },

    weatherCard: {
        margin: "auto"
    },

    conditionSummary: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "baseline",
        flexWrap: "wrap",
        margin: "auto",
        textAlign: "center"
    },

    locationName: {
        fontSize: 32,
        textAlign: "center"
    },

    locationSub: {
        fontSize: 12,
        textAlign: "center"
    },

    conditionIconContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
    },

    conditionIcon: {
        width: 64,
        height: 64,
        margin: "auto"
    },

    conditionTemp: {
        fontSize: 50,
        fontWeight: "700",
        textAlign: "center"
    },

    conditionText: {
        fontSize: 12,
        marginTop: -10,
        textAlign: "center"
    }


});