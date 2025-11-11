import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, ImageBackground } from "react-native";
import { MenuItem } from "../utils";
import MenuCard from "../components/MenuCard";

type Props = {
  menuItems: MenuItem[];
  navigate: (to: "Home" | "Chef" | "Filter") => void;
};

export default function FilterScreen({ menuItems, navigate }: Props) {
  const [filter, setFilter] = useState<"All" | "Starter" | "Main" | "Dessert">("All");
  const filtered = filter === "All" ? menuItems : menuItems.filter((m) => m.course === filter);

  return (
    <ImageBackground source={require("../assets/background.png")} style={styles.bg} resizeMode="cover">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Image source={require("../assets/logo.png")} style={styles.logo} />
          <Text style={styles.title}>Guest Filter</Text>

          <TouchableOpacity style={styles.backBtn} onPress={() => navigate("Home")}>
            <Text style={styles.backTxt}>← Back to Home</Text>
          </TouchableOpacity>

          <Text style={styles.subtitle}>Showing: {filter === "All" ? "All courses" : filter + "s"}</Text>

          <View style={styles.filters}>
            {(["All", "Starter", "Main", "Dessert"] as const).map((f) => (
              <TouchableOpacity key={f} onPress={() => setFilter(f)} style={[styles.filterBtn, filter === f && styles.filterActive]}>
                <Text selectable={false}>{f}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <FlatList
            data={filtered}
            keyExtractor={(i) => i.id}
            renderItem={({ item }) => <MenuCard item={item} />}
            ListEmptyComponent={<Text style={styles.empty}>No items for {filter}</Text>}
            contentContainerStyle={{ paddingBottom: 120 }}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, width: "100%", height: "100%" },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.55)" },
  container: { padding: 16, alignItems: "center" },
  logo: { width: 90, height: 90, borderRadius: 45, marginBottom: 10 },
  title: { fontSize: 20, fontWeight: "700", color: "#fff", marginBottom: 10 },
  backBtn: { backgroundColor: "#fff", padding: 10, borderRadius: 8, marginBottom: 10 },
  backTxt: { color: "#000", fontWeight: "600" },
  subtitle: { color: "#fff", textAlign: "center", marginBottom: 10 },
  filters: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" },
  filterBtn: { padding: 8, borderRadius: 8, backgroundColor: "#fff", margin: 4 },
  filterActive: { backgroundColor: "#cfe9ff" },
  empty: { color: "#ddd", marginTop: 20, textAlign: "center" },
});
