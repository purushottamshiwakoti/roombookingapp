import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import Home from "./src/screens/Home";
import Profile from "./src/screens/Profile";
import Bookings from "./src/screens/Bookings";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import useAuthStore from "./src/hooks/useAuth";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainApp() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Bookings") {
            iconName = focused ? "calendar" : "calendar-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Bookings" component={Bookings} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

function App() {
  const { id } = useAuthStore();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!id ? (
          <Stack.Group>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </Stack.Group>
        ) : (
          <Stack.Screen
            name="MainApp"
            component={MainApp}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
