import React, { useState } from "react";
import { View, Button, TextInput, ScrollView, StyleSheet,Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Btn from "../components/Btn";
import firebase from "../firebase";

const CreateUserList = (props) => {
  const initalState = {
    name: "",
    email: "",
    phone: "",
    latitude: "",
    longitude: "",
  };

  const [state, setState] = useState(initalState);

  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  const saveNewUser = async () => {
    if (state.name === "") {
      alert("please provide a name");
    } else {
      try {
        await firebase.db.collection("users").add({
          name: state.name,
          email: state.email,
          phone: state.phone,
          latitude: state.latitude,
          longitude: state.longitude,
        });

        console.log("test");
        props.navigation.navigate("UsersList");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Name Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Name"
          onChangeText={(value) => handleChangeText(value, "name")}
          value={state.name}
        />
      </View>

      {/* Email Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Email"
          multiline={true}
          numberOfLines={4}
          onChangeText={(value) => handleChangeText(value, "email")}
          value={state.email}
        />
      </View>

      {/* Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Phone"
          onChangeText={(value) => handleChangeText(value, "phone")}
          value={state.phone}
        />
      </View>

        <Text>Location</Text>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="latitude"
          onChangeText={(value) => handleChangeText(value, "latitude")}
          value={state.latitude}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="longitude"
          onChangeText={(value) => handleChangeText(value, "longitude")}
          value={state.longitude}
        />
      </View>

      <View style={styles.button}>
        <Btn title="Save User" onClick={() => saveNewUser()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
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
});
export default CreateUserList;
