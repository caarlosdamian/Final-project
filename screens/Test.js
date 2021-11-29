import React from 'react'
import { View, Text ,StyleSheet} from 'react-native'
import Btn from "../components/Btn"

const styles = StyleSheet.create({
    view: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    }
})
export default function Test({navigation}) {
    return (
        <View style={styles.view}>
            <Text>HOLAAA</Text>
            <Btn onClick={() => navigation.navigate("AddUser")} title="Go Home" style={{ width: "48%", backgroundColor: "#344869" }} />

        </View>
    )
}
