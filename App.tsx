import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

type MenuItem = {
  id: string;
  dishName: string;
  description: string;
  course: string;
  price: string;
};

export default function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [dishName, setDishName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [course, setCourse] = useState<string>("Starter");
  const [price, setPrice] = useState<string>("");
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const courses = ["Starter", "Main", "Dessert"];

  const addDish = () => {
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
    setMenuItems((prev) => [newItem, ...prev]);
    setDishName("");
    setDescription("");
    setPrice("");
    setCourse("Starter");
    setShowAdd(false);
  };

  const deleteDish = (id: string) => {
    setMenuItems((prev) => prev.filter((i) => i.id !== id));
    setSelectedItem(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Christoffel’s Menu</Text>
        <Text style={styles.sub}>Total Items: {menuItems.length}</Text>
      </View>

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.empty}>No dishes yet — add one!</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => setSelectedItem(item)}
          >
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={styles.dish}>{item.dishName}</Text>
              <Text>R{item.price}</Text>
            </View>
            <Text style={styles.course}>{item.course}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 }}
      />

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.addBtn} onPress={() => setShowAdd(true)}>
        <Text style={{ fontSize: 28, color: "#fff" }}>＋</Text>
      </TouchableOpacity>

      {/* Add Dish Modal */}
      <Modal visible={showAdd} animationType="slide">
        <ScrollView contentContainerStyle={styles.modalContent}>
          <Text style={styles.modalTitle}>Add Menu Item</Text>
          <TextInput
            placeholder="Dish Name"
            value={dishName}
            onChangeText={setDishName}
            style={styles.input}
          />
          <TextInput
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            style={[styles.input, { height: 100 }]}
            multiline
          />
          <View style={styles.pickerWrap}>
            <Picker selectedValue={course} onValueChange={(v) => setCourse(v)}>
              {courses.map((c) => (
                <Picker.Item key={c} label={c} value={c} />
              ))}
            </Picker>
          </View>
          <TextInput
            placeholder="Price (numbers only)"
            value={price}
            onChangeText={(t) => setPrice(t.replace(/[^0-9.]/g, ""))}
            style={styles.input}
            keyboardType="numeric"
          />
          <View style={styles.row}>
            <TouchableOpacity style={styles.saveBtn} onPress={addDish}>
              <Text style={styles.saveTxt}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setShowAdd(false)}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>

      {/* Dish Details Modal */}
      <Modal visible={!!selectedItem} transparent animationType="fade">
        <View style={styles.detailOverlay}>
          <View style={styles.detailCard}>
            <Text style={styles.dish}>{selectedItem?.dishName}</Text>
            <Text style={{ marginTop: 6 }}>{selectedItem?.description}</Text>
            <Text style={{ marginTop: 6 }}>Course: {selectedItem?.course}</Text>
            <Text style={{ marginTop: 6 }}>Price: R{selectedItem?.price}</Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 12,
              }}
            >
              <TouchableOpacity
                onPress={() => deleteDish(selectedItem!.id)}
                style={styles.deleteBtn}
              >
                <Text style={{ color: "#fff" }}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedItem(null)}
                style={styles.cancelBtn}
              >
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { padding: 16, borderBottomWidth: 1, borderColor: "#eee" },
  title: { fontSize: 22, fontWeight: "bold" },
  sub: { marginTop: 6, color: "#555" },
  empty: { textAlign: "center", marginTop: 30, color: "#999" },
  card: {
    backgroundColor: "#f8f8f8",
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 0,
    borderRadius: 8,
  },
  dish: { fontWeight: "700", fontSize: 16 },
  course: { color: "#666", marginTop: 4 },
  addBtn: {
    position: "absolute",
    right: 20,
    bottom: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#1e90ff",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  modalContent: { padding: 20, paddingTop: 40 },
  modalTitle: { fontSize: 20, fontWeight: "700", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 6,
    marginVertical: 8,
  },
  pickerWrap: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    marginVertical: 8,
  },
  row: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
  saveBtn: {
    backgroundColor: "#1e90ff",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    marginRight: 8,
  },
  saveTxt: { color: "#fff", fontWeight: "700" },
  cancelBtn: {
    padding: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  detailOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  detailCard: { width: "90%", backgroundColor: "#fff", padding: 18, borderRadius: 10 },
  deleteBtn: { backgroundColor: "red", padding: 10, borderRadius: 6 },
});
