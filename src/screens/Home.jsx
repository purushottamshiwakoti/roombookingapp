import { View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Button, Card, Text } from "react-native-paper";
import useAuthStore from "../hooks/useAuth";

const Home = () => {
  const [hotels, setHotels] = useState([]);
  const { id } = useAuthStore();

  useEffect(() => {
    const fetchHotels = async () => {
      const response = await axios.get(
        "https://roombook-pi.vercel.app/api/hotel"
      );
      const { hotel } = response.data;
      setHotels(hotel.map((item) => ({ ...item, selectedDate: null })));
    };
    fetchHotels();
  }, []);

  const handleBook = async (hotelId) => {
    try {
      const response = await axios.post(
        "https://roombook-pi.vercel.app/api/booking",
        { hoterId: hotelId, userId: id }
      );
      const data = response.data;
      const { message } = data;
      alert(message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={{ margin: 20 }}>
      {hotels.map((item) => (
        <Card key={item.id}>
          <Card.Title />
          <Card.Cover source={{ uri: item.image }} />
          <Card.Content style={{ marginTop: 10 }}>
            <Text variant="titleLarge">{item.name}</Text>
            <Text variant="bodyMedium">Location: {item.location}</Text>
            <Text variant="bodyMedium">
              Number of beds: {item.numberOfBeds}
            </Text>
            <Text variant="bodyMedium">Price: {item.price}</Text>
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => handleBook(item.id)}>Book Now</Button>
          </Card.Actions>
        </Card>
      ))}
    </ScrollView>
  );
};

export default Home;
