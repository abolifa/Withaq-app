import React, { useEffect, useState } from "react";
import { Image, Platform, Text, View } from "react-native";

export default function LiveClock() {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View
      className="shadow-sm"
      style={{
        width: "100%",
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: "#007AFF",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
      }}
    >
      <Image
        source={require("../assets/images/app-icon-white.png")}
        style={{
          width: 70,
          height: 70,
          resizeMode: "contain",
        }}
      />
      <Text
        style={{
          color: "white",
          fontSize: 16,
          fontWeight: "700",
          fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
        }}
      >
        {time.toLocaleTimeString("en-US", {
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })}
      </Text>
    </View>
  );
}
