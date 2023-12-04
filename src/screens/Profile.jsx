import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Avatar, Button } from "react-native-paper";
import useAuthStore from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const navigation = useNavigation();
  const { fullName, logout } = useAuthStore();
  console.log(fullName.split("")[0]);
  return (
    <ScrollView>
      <View
        style={{
          margin: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 18, marginTop: 30 }}>Your Profile</Text>
        <Avatar.Text
          size={100}
          label={fullName.split("")[0]}
          style={{ marginTop: 10 }}
        />
        <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "600" }}>
          Welcome {fullName}
        </Text>
      </View>
      <View style={{ margin: 20 }}>
        <Button
          mode="contained"
          style={{ marginTop: 10, marginBottom: 10 }}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          Home
        </Button>
        <Button
          mode="contained"
          style={{ marginTop: 10, marginBottom: 10 }}
          onPress={() => {
            navigation.navigate("Bookings");
          }}
        >
          Booking
        </Button>
        <Button
          mode="contained"
          icon={"logout"}
          onPress={() => {
            logout();
            alert("Successfully logged out");
            navigation.navigate("Login");
          }}
        >
          Logut
        </Button>
      </View>
    </ScrollView>
  );
};

export default Profile;
