// App.tsx
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, ImageBackground, View } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import ChefScreen from "./screens/ChefScreen";
import FilterScreen from "./screens/FilterScreen";
import { MenuItem } from "./utils";

export default function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [screen, setScreen] = useState<"Home" | "Chef" | "Filter">("Home");

  const addItem = (item: MenuItem) => setMenuItems((prev) => [item, ...prev]);
  const deleteItem = (id: string) => setMenuItems((prev) => prev.filter((i) => i.id !== id));
  const navigate = (to: "Home" | "Chef" | "Filter") => setScreen(to);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("./assets/background.png")}
        style={styles.bg}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          {screen === "Home" && <HomeScreen menuItems={menuItems} navigate={navigate} />}
          {screen === "Chef" && (
            <ChefScreen
              menuItems={menuItems}
              addItem={addItem}
              deleteItem={deleteItem}
              navigate={navigate}
            />
          )}
          {screen === "Filter" && <FilterScreen menuItems={menuItems} navigate={navigate} />}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  bg: { flex: 1, width: "100%", height: "100%" },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.55)" },
});
