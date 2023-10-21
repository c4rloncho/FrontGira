import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(254, 242, 242, 1)', // coral-red-50
    },
    header: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 24,
        color: 'rgba(223, 35, 35, 1)', // coral-red-600
    },
    input: {
        width: "90%",
        marginBottom: 20,
        backgroundColor: 'rgba(254, 226, 226, 1)', // coral-red-100
        color: 'rgba(128, 28, 28, 1)', // coral-red-900
        borderRadius: 10,
        padding: 10,
    },
    button: {
        width: "90%",
        marginTop: 10,
        backgroundColor: 'rgba(242, 74, 74, 1)', // coral-red-500
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonText: {
        color: 'rgba(254, 242, 242, 1)', // coral-red-50
    },
    registerLink: {
        marginTop: 16,
        color: 'rgba(128, 28, 28, 1)', // coral-red-900
        textDecorationLine: "underline",
    },
});

export default styles;
