import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";

const TabIcon = ({
  focused,
  Icon,
  name,
}: {
  focused: boolean;
  Icon: typeof Ionicons;
  name: keyof typeof Ionicons.glyphMap;
}) => (
  <View
    style={{
      width: 46,
      height: 46,
      borderRadius: 23,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: focused ? "#007AFF" : "transparent",
      marginBottom: focused ? 20 : 0,
      shadowColor: focused ? "#007AFF" : "transparent",
      shadowOpacity: 0.25,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 3 },
      elevation: focused ? 4 : 0,
    }}
  >
    <Icon
      name={name}
      size={focused ? 24 : 22}
      color={focused ? "white" : "#9CA3AF"}
    />
  </View>
);

export default function MainLayout() {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: 20,
          right: 20,
          height: 65,
          paddingTop: 6,
          borderRadius: 20,
          backgroundColor: "#ffffff",
          shadowColor: "#000",
          shadowOpacity: 0.05,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 8,
          elevation: 4,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#9CA3AF",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "الرئيسية",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} Icon={Ionicons} name="grid" />
          ),
        }}
      />
      <Tabs.Screen
        name="documents"
        options={{
          title: "المستندات",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} Icon={Ionicons} name="file-tray-full" />
          ),
        }}
      />
      <Tabs.Screen
        name="outgoings"
        options={{
          title: "الصادر",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} Icon={Ionicons} name="arrow-up-circle" />
          ),
        }}
      />
      <Tabs.Screen
        name="incomings"
        options={{
          title: "الوارد",
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              Icon={Ionicons}
              name="arrow-down-circle"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "حسابي",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} Icon={Ionicons} name="person" />
          ),
        }}
      />
    </Tabs>
  );
}
