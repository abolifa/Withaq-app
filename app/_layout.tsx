import { AuthProvider } from "@/context/AuthProvider";
import "@/global.css";
import { queryClient } from "@/lib/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as Updates from "expo-updates";
import { useEffect } from "react";
import { I18nManager } from "react-native";

if (!I18nManager.isRTL) {
  I18nManager.allowRTL(true);
  I18nManager.forceRTL(true);
  I18nManager.swapLeftAndRightInRTL(true);
}

export default function RootLayout() {
  useEffect(() => {
    if (!I18nManager.isRTL) {
      Updates.reloadAsync();
    }
  }, []);

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(main)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(modals)/documents/add/[id]"
            options={{
              presentation: "modal",
              animation: "slide_from_bottom",
              headerShown: true,
            }}
          />
        </Stack>
      </QueryClientProvider>
    </AuthProvider>
  );
}
