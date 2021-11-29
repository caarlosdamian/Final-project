import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Button,
  View,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Text,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Btn from "../components/Btn";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import firebase from "../firebase";

const UserDetailScreen = (props) => {
  const initialState = {
    id: "",
    name: "",
    email: "",
    phone: "",
    latitude: "",
    longitude: "",
  };

  const [user, setUser] = useState(initialState);
  const [loading, setLoading] = useState(true);
  console.log(user.longitude);
  const [pin, setPin] = React.useState({
    latitude: user.latitude && 19.285013,
    longitude: user.longitude && -103.7327,
  });

  pin.longitude;
  const handleTextChange = (value, prop) => {
    setUser({ ...user, [prop]: value });
  };

  const getUserById = async (id) => {
    const dbRef = firebase.db.collection("users").doc(id);
    const doc = await dbRef.get();
    const user = doc.data();
    setUser({ ...user, id: doc.id });
    setLoading(false);
  };

  const deleteUser = async () => {
    setLoading(true);
    const dbRef = firebase.db
      .collection("users")
      .doc(props.route.params.userId);
    await dbRef.delete();
    setLoading(false);
    props.navigation.navigate("UsersList");
  };

  const openConfirmationAlert = () => {
    Alert.alert(
      "Removing the User",
      "Are you sure?",
      [
        { text: "Yes", onPress: () => deleteUser() },
        { text: "No", onPress: () => console.log("canceled") },
      ],
      {
        cancelable: true,
      }
    );
  };

  const updateUser = async () => {
    const userRef = firebase.db.collection("users").doc(user.id);
    await userRef.set({
      name: user.name,
      email: user.email,
      phone: user.phone,
      latitude: user.latitude,
      longitude: user.longitude,
    });
    setUser(initialState);
    props.navigation.navigate("UsersList");
  };

  useEffect(() => {
    getUserById(props.route.params.userId);
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <TextInput
          placeholder="Name"
          autoCompleteType="username"
          style={styles.inputGroup}
          value={user.name}
          onChangeText={(value) => handleTextChange(value, "name")}
        />
      </View>
      <View>
        <TextInput
          autoCompleteType="email"
          placeholder="Email"
          style={styles.inputGroup}
          value={user.email}
          onChangeText={(value) => handleTextChange(value, "email")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Phone"
          autoCompleteType="tel"
          style={styles.inputGroup}
          value={user.phone}
          onChangeText={(value) => handleTextChange(value, "phone")}
        />
      </View>
      <View style={styles.btn}>
        <Btn
          title="Delete"
          onClick={() => openConfirmationAlert()}
          style={{
            width: "100%",
            backgroundColor: "#fc1c03",
          }}
        />
      </View>
      <View>
        <Btn
          title="Update"
          onClick={() => updateUser()}
          style={{
            width: "100%",
            backgroundColor: "#02b4fa",
            // marginBottom: "5%",
          }}
        />
      </View>

      <View style={{ flex: 1, meginTop: "5%" }}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: user.latitude,
            longitude: user.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          // provider="google"
        >
          <Marker
            coordinate={pin}
            draggable={true}
            onDragStart={(e) => console.log(e.nativeEvent.coordinate)}
            onDragEnd={(e) =>
              setPin({
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
              })
            }
          >
            <Callout>
              <Text>{JSON.stringify(pin)}</Text>
            </Callout>
          </Marker>
          <Circle center={pin} radius={1000} />
        </MapView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  btn: {
    marginBottom: 7,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default UserDetailScreen;
