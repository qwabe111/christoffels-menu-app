import React from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, ScrollView } from "react-native";
import { MenuItem } from "../utils";
import MenuCard from "../components/MenuCard";
import { getAveragesByCourse } from "../utils";

type Props = {
  menuItems: MenuItem[];
  navigate: (to: "Home" | "Chef" | "Filter") => void;
};

export default function HomeScreen({ menuItems, navigate }: Props) {
  const averages = getAveragesByCourse(menuItems);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Christoffel’s Menu 🍽️</Text>

      <View style={styles.navButtons}>
        <TouchableOpacity style={styles.navBtn} onPress={() => navigate("Chef")}>
          <Text style={styles.navTxt}>👨‍🍳 Chef</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBtn} onPress={() => navigate("Filter")}>
          <Text style={styles.navTxt}>🍽️ Guest Filter</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subHeading}>Average Prices by Course</Text>
      {Object.keys(averages).length === 0 ? (
        <Text style={styles.empty}>No items yet</Text>
      ) : (
        Object.entries(averages).map(([course, avg]) => (
          <Text key={course} style={styles.avgText}>
            {course}: R{avg.toFixed(2)}
          </Text>
        ))
      )}

      <Text style={styles.subHeading}>Full Menu</Text>
      {menuItems.length === 0 ? (
        <Text style={styles.empty}>No menu items added yet</Text>
      ) : (
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MenuCard item={item} />}
          scrollEnabled={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, alignItems: "center" },
  logo: { width: 90, height: 90, borderRadius: 45, marginBottom: 10 },
  title: { fontSize: 22, fontWeight: "700", color: "#fff", marginBottom: 10 },
  navButtons: { flexDirection: "row", gap: 10, marginBottom: 10 },
  navBtn: { backgroundColor: "#fff", padding: 10, borderRadius: 8 },
  navTxt: { color: "#000", fontWeight: "600" },
  subHeading: { fontSize: 18, color: "#fff", fontWeight: "600", marginTop: 12 },
  avgText: { color: "#fff", marginTop: 4 },
  empty: { color: "#ddd", marginTop: 8 },
});
