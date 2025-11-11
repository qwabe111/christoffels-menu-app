import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MenuItem } from "../utils";

type Props = {
  item: MenuItem;
  onDelete?: (id: string) => void;
};

export default function MenuCard({ item, onDelete }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text selectable={false} style={styles.name}>{item.dishName}</Text>
        <Text selectable={false} style={styles.price}>R{item.price}</Text>
      </View>

      <Text selectable={false} style={styles.course}>{item.course}</Text>
      <Text selectable={false} style={styles.desc}>{item.description}</Text>

      {onDelete && (
        <TouchableOpacity style={styles.deleteBtn} onPress={() => onDelete(item.id)}>
          <Text style={styles.deleteTxt}>Delete</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(255,255,255,0.95)",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginVertical: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4, // adds a bit of spacing below
  },
  name: {
    fontWeight: "700",
    color: "#111",
    fontSize: 16,
    flexShrink: 1,
    marginRight: 10, // space before price
  },
  price: {
    color: "#111",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10, // space after name
  },
  course: {
    color: "#555",
    marginTop: 6,
    fontStyle: "italic",
  },
  desc: {
    marginTop: 6,
    color: "#333",
  },
  deleteBtn: {
    marginTop: 10,
    backgroundColor: "red",
    padding: 6,
    borderRadius: 6,
    alignItems: "center",
  },
  deleteTxt: {
    color: "#fff",
    fontWeight: "600",
  },
});
