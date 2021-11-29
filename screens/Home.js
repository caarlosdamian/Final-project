import React from 'react'
import { Text, View, StyleSheet } from "react-native"
import Btn from "../components/Btn"
import firebase from 'firebase/app';
import "firebase/auth";

const styles = StyleSheet.create({
    view: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    }
})

export default function Loginscreen({navigation}) {
    return <View style={styles.view}>
        <Text style={{fontSize: 34, fontWeight: "800", marginBottom: 20}}>Welcome</Text>
        <Btn title="Log Out" onClick={() => firebase.auth().signOut()} />
        <Btn onClick={() => navigation.navigate("Test")} title="Test" style={{ width: "48%", backgroundColor: "#344869" }} />
    </View>
}