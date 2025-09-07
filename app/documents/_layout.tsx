import BackButton from "@/components/BackButton";
import { Stack } from "expo-router";

export default function DocumentsLayout() {
  return (
    <Stack
      screenOptions={{
        animation: "slide_from_right",
        headerLeft: () => <BackButton />,
      }}
    >
      <Stack.Screen name="[id]" />
      <Stack.Screen
        name="view/[id]"
        options={{
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
      />
    </Stack>
  );
}
