import React from 'react'
import { View, Text ,StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    view: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    }
})
export default function Test() {
    return (
        <View style={styles.view}>
            <Text>HOLAAA</Text>
        </View>
    )
}
