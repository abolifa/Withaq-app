import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

const BackButton = () => {
  return (
    <TouchableOpacity onPress={() => router.back()} hitSlop={10}>
      <Ionicons name="chevron-forward" size={24} color="#000" />
    </TouchableOpacity>
  );
};

export default BackButton;
