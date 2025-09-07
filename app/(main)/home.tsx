import ExchangeRate from "@/components/ExchangeRate";
import LiveClock from "@/components/LiveClock";
import { navs } from "@/lib/navs";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const { width } = useWindowDimensions();
  const numColumns = width > 700 ? 3 : 2;
  const renderNavItem = ({ item }: { item: (typeof navs)[0] }) => (
    <TouchableOpacity
      onPress={() => router.push(item.href as any)}
      className="flex-1 rounded-2xl overflow-hidden shadow-md bg-white 
      border-hairline border-gray-500"
      style={{ elevation: 4 }}
    >
      <LinearGradient
        colors={["#3B82F6", "#60A5FA"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          height: 80,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons name={item.icon as any} size={38} color="#fff" />
      </LinearGradient>
      <View
        style={{
          paddingVertical: 14,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: "#111827",
            fontSize: 15,
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 16,
        backgroundColor: "#F9FAFB",
      }}
    >
      <LiveClock />
      <ExchangeRate />

      <FlatList
        data={navs}
        renderItem={renderNavItem}
        keyExtractor={(item) => item.href}
        numColumns={numColumns}
        columnWrapperStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        columnWrapperClassName="gap-4 mt-4"
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Home;
