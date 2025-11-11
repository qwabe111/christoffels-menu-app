import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  StyleSheet, Alert, Image, ImageBackground
} from "react-native";
import { MenuItem } from "../utils";
import MenuCard from "../components/MenuCard";
import { Picker } from "@react-native-picker/picker";

type Props = {
  menuItems: MenuItem[];
  addItem: (item: MenuItem) => void;
  deleteItem: (id: string) => void;
  navigate: (to: "Home" | "Chef" | "Filter") => void;
};

export default function ChefScreen({ menuItems, addItem, deleteItem, navigate }: Props) {
  const [dishName, setDishName] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState<"Starter" | "Main" | "Dessert">("Starter");
  const [price, setPrice] = useState("");

  const handleAdd = () => {
    if (!dishName.trim() || !description.trim() || !price.trim()) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    const newItem: MenuItem = {
      id: Date.now().toString(),
      dishName: dishName.trim(),
      description: description.trim(),
      course,
      price: price.trim(),
    };
    addItem(newItem);
    Alert.alert("Success", `${dishName} added successfully!`);
    setDishName(""); setDescription(""); setPrice(""); setCourse("Starter");
  };

  return (
    <ImageBackground source={require("../assets/background.png")} style={styles.bg} resizeMode="cover">
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.container}>
          <Image source={require("../assets/logo.png")} style={styles.logo} />
          <Text style={styles.title}>Chef — Manage Menu</Text>

          <TouchableOpacity style={styles.backBtn} onPress={() => navigate("Home")}>
            <Text style={styles.backTxt}>← Back to Home</Text>
          </TouchableOpacity>

          <View style={styles.form}>
            <TextInput placeholder="Dish Name" value={dishName} onChangeText={setDishName} style={styles.input} />
            <TextInput placeholder="Description" value={description} onChangeText={setDescription} style={[styles.input, { height: 80 }]} multiline />
            <View style={styles.pickerWrap}>
              <Picker selectedValue={course} onValueChange={(v) => setCourse(v as any)}>
                <Picker.Item label="Starter" value="Starter" />
                <Picker.Item label="Main" value="Main" />
                <Picker.Item label="Dessert" value="Dessert" />
              </Picker>
            </View>
            <TextInput placeholder="Price (numbers only)" value={price} onChangeText={(t) => setPrice(t.replace(/[^0-9.]/g, ""))} style={styles.input} keyboardType="numeric" />
            <TouchableOpacity style={styles.saveBtn} onPress={handleAdd}><Text style={styles.saveTxt}>Save</Text></TouchableOpacity>
          </View>

          <Text style={styles.subHeading}>Current Menu Items</Text>
          {menuItems.length === 0 ? (
            <Text style={styles.empty}>No dishes yet</Text>
          ) : (
            menuItems.map((it) => (
              <MenuCard key={it.id} item={it} onDelete={(id) => deleteItem(id)} />
            ))
          )}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, width: "100%", height: "100%" },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.55)" },
  container: { padding: 16, alignItems: "center" },
  logo: { width: 90, height: 90, borderRadius: 45, marginBottom: 10 },
  title: { fontSize: 20, fontWeight: "700", color: "#fff" },
  backBtn: { marginVertical: 10, backgroundColor: "#fff", padding: 10, borderRadius: 8, alignItems: "center" },
  backTxt: { color: "#000", fontWeight: "600" },
  form: { marginTop: 8, width: "100%" },
  input: { borderWidth: 1, borderColor: "#ddd", padding: 10, borderRadius: 6, marginVertical: 8, backgroundColor: "#fff" },
  pickerWrap: { borderWidth: 1, borderColor: "#ddd", borderRadius: 6, marginVertical: 8, backgroundColor: "#fff" },
  saveBtn: { backgroundColor: "#1e90ff", padding: 12, borderRadius: 8, marginTop: 8, alignItems: "center" },
  saveTxt: { color: "#fff", fontWeight: "700" },
  subHeading: { color: "#fff", fontWeight: "700", marginTop: 12, marginBottom: 6 },
  empty: { color: "#ddd" },
});
