import ErrorComponent from "@/components/ErrorComponent";
import api from "@/lib/api";
import { getServerImageUrl } from "@/lib/utils";
import { Company } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Documents = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["companies-light"],
    queryFn: async () => {
      const res = await api.get("/companies/light");
      return res.data as Company[];
    },
  });

  const renderCompany = ({ item }: { item: Company }) => (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/documents/[id]",
          params: { id: item.id.toString(), name: item.name },
        })
      }
      activeOpacity={0.8}
      className="w-full bg-white rounded-2xl p-5 shadow-sm border-hairline border-gray-500"
    >
      {/* Header */}
      <View className="flex-row items-center gap-4 mb-3">
        <View className="h-14 w-14 p-1 bg-gray-100 rounded-full items-center justify-center overflow-hidden border border-gray-300">
          {item.logo ? (
            <Image
              source={{ uri: getServerImageUrl(item.logo) }}
              className="w-full h-full"
              resizeMode="contain"
            />
          ) : (
            <Ionicons name="business" size={28} color="#3B82F6" />
          )}
        </View>
        <View className="flex-1 items-start">
          <Text className="text-lg font-bold text-gray-900">{item.name}</Text>
          {item.english_name && (
            <Text className="text-sm text-gray-500">{item.english_name}</Text>
          )}
        </View>
        <Ionicons name="chevron-back" size={20} color="#9CA3AF" />
      </View>

      {/* Info Rows */}
      <View className="space-y-2">
        {item.ceo && (
          <View className="flex-row items-center gap-2">
            <Ionicons name="person" size={16} color="#6B7280" />
            <Text className="text-sm text-gray-700">
              <Text className="font-semibold">المدير:</Text> {item.ceo}
            </Text>
          </View>
        )}

        {item.phone && (
          <View className="flex-row items-center gap-2">
            <Ionicons name="call" size={16} color="#6B7280" />
            <Text className="text-sm text-gray-700">{item.phone}</Text>
          </View>
        )}

        {item.email && (
          <View className="flex-row items-center gap-2">
            <Ionicons name="mail" size={16} color="#6B7280" />
            <Text className="text-sm text-gray-700">{item.email}</Text>
          </View>
        )}

        {item.website && (
          <View className="flex-row items-center gap-2">
            <Ionicons name="globe" size={16} color="#6B7280" />
            <Text className="text-sm text-blue-600">{item.website}</Text>
          </View>
        )}

        {item.address && (
          <View className="flex-row items-center gap-2">
            <Ionicons name="location" size={16} color="#6B7280" />
            <Text className="text-sm text-gray-700">{item.address}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 5,
        paddingTop: 12,
      }}
    >
      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="small" color="#007AFF" />
        </View>
      ) : isError ? (
        <ErrorComponent error={error} />
      ) : (
        <View className="flex-1">
          <Text className="text-2xl font-bold mb-4 text-center text-gray-800">
            ✨ اختر الشركة
          </Text>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderCompany}
            ItemSeparatorComponent={() => <View className="h-3" />}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Documents;
