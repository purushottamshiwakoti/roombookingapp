import { View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../hooks/useAuth";
import { Avatar, Button, Card, Text } from "react-native-paper";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const { id } = useAuthStore();
  console.log(id);
  useEffect(() => {
    const fetchBookings = async () => {
      const response = await axios.get(
        `https://roombook-pi.vercel.app/api/booking/${id}`
      );
      const { bookings } = response.data;
      setBookings(bookings);
    };
    fetchBookings();
  }, []);
  console.log(bookings);
  return (
    <ScrollView style={{ margin: 20 }}>
      <Text style={{ fontSize: 20, color: "red" }}>Your Bookings</Text>
      {bookings.map((item) => (
        <Card key={item.id}>
          <Card.Title />
          <Card.Cover source={{ uri: item.hotel.image }} />
          <Card.Content style={{ marginTop: 10 }}>
            <Text variant="titleLarge">{item.hotel.name}</Text>
            <Text variant="bodyMedium">Location: {item.hotel.location}</Text>
            <Text variant="bodyMedium">
              Number of beds: {item.hotel.numberOfBeds}
            </Text>
            <Text variant="bodyMedium">Price: {item.hotel.price}</Text>
            <Text variant="bodyMedium">
              Booked at: {item.createdAt.split("T")[0]}
            </Text>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
};

export default Bookings;
