import CsButton from "@/components/CsButton";
import { useAuth } from "@/context/AuthProvider";
import { getErrorMessage } from "@/lib/utils";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, View } from "react-native";
import TextField from "../../components/TextField";

export default function LoginScreen() {
  const [form, setForm] = useState({ username: "", password: "" });
  const { login, loading } = useAuth();

  async function handleLogin() {
    try {
      await login(form.username, form.password);
      router.replace("/(main)/home");
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("خطأ في تسجيل الدخول", getErrorMessage(error));
    }
  }

  return (
    <View className="flex-1 items-center justify-center gap-5">
      <Image
        source={require("../../assets/images/logo.png")}
        className="w-32 h-32 mb-8"
      />
      <View className="max-w-11/12 w-full px-5 flex flex-col gap-4">
        <TextField
          label="اسم المستخدم"
          placeholder="example"
          value={form.username}
          onChangeText={(text) => setForm({ ...form, username: text })}
        />
        <TextField
          label="كلمة المرور"
          placeholder="••••••••"
          secureTextEntry
          value={form.password}
          onChangeText={(text) => setForm({ ...form, password: text })}
        />

        <CsButton
          title="تسجيل الدخول"
          onPress={handleLogin}
          isLoading={loading}
          disabled={loading || !form.username || !form.password}
        />
      </View>
    </View>
  );
}
