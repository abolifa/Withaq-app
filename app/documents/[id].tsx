import DocumentContainer from "@/components/DocumentContainer";
import ErrorComponent from "@/components/ErrorComponent";
import api from "@/lib/api";
import { Document } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useLayoutEffect } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

const Documents = () => {
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: name || "Documents",
    });
  }, [navigation, name]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["documents", id],
    queryFn: async () => {
      const res = await api.get(`/documents?company_id=${id}`);
      return res.data as Document[];
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="small" color="#007AFF" />
      </View>
    );
  }

  if (isError) {
    return <ErrorComponent error={error} />;
  }

  if (!data || data.length === 0) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-500 text-base font-medium">
          لا توجد مستندات
        </Text>
      </View>
    );
  }

  return (
    <View className="py-3 px-3 flex-1">
      <FlatList
        className="flex-1"
        data={data}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View className="h-2" />}
        renderItem={({ item }) => <DocumentContainer document={item} />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default Documents;
