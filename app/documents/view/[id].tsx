import api from "@/lib/api";
import { getDocumentMeta } from "@/lib/documentHelpers";
import { getServerImageUrl } from "@/lib/utils";
import { Document } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import * as FileSystem from "expo-file-system";
import { useLocalSearchParams, useNavigation } from "expo-router";
import * as Sharing from "expo-sharing";
import React, { useLayoutEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Pdf from "react-native-pdf";

const DocumentView = () => {
  const { id, name } = useLocalSearchParams<{ id: string; name?: string }>();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: name ? `${name}` : "عرض المستند",
    });
  }, [name, navigation]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["document", id],
    queryFn: async () => {
      const res = await api.get(`/documents/${id}`);
      return res.data.document as Document;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="small" color="#007AFF" />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-5">
        <Text className="text-red-500 font-bold mb-2">حدث خطأ أثناء تحميل</Text>
        <Text className="text-gray-500 text-sm">
          {(error as any)?.message || "يرجى المحاولة مرة أخرى"}
        </Text>
      </View>
    );
  }

  const meta = getDocumentMeta(data?.type);

  const handleDownload = async () => {
    try {
      if (!data?.document_path) {
        Alert.alert("خطأ", "لا يوجد ملف لتنزيله.");
        return;
      }

      const url = getServerImageUrl(data.document_path);

      const fileName = `${meta?.label || "document"}_${data.id}.pdf`;

      const fileUri = FileSystem.documentDirectory + fileName;

      const { uri } = await FileSystem.downloadAsync(url, fileUri);
      console.log("PDF saved as:", uri);

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          dialogTitle: `مشاركة ${fileName}`,
        });
      }
    } catch (err) {
      console.error("Download error:", err);
    }
  };

  const handleShare = async () => {
    try {
      if (!data?.document_path) {
        Alert.alert("خطأ", "لا يوجد ملف للمشاركة.");
        return;
      }
      const url = getServerImageUrl(data.document_path);
      const fileUri = FileSystem.documentDirectory + "temp.pdf";
      await FileSystem.downloadAsync(url, fileUri);

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
      } else {
        Alert.alert("المشاركة غير مدعومة على هذا الجهاز");
      }
    } catch (err) {
      console.error("Share error:", err);
    }
  };

  return (
    <View className="flex-1">
      {data?.document_path ? (
        <View className="flex-1">
          <View className="flex-row items-center justify-center bg-gray-50 border-b border-gray-200 px-4 py-3 gap-3">
            <TouchableOpacity
              onPress={handleDownload}
              className="px-4 py-2 rounded-md flex-row bg-gray-200 gap-2"
            >
              <Ionicons name="download" size={20} color="#374151" />
              <Text className="text-gray-600">تنزيل</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleShare}
              className="px-4 py-2 rounded-md flex-row bg-gray-200 gap-2"
            >
              <Ionicons name="share-social" size={20} color="#374151" />
              <Text className="text-gray-600">مشاركة</Text>
            </TouchableOpacity>
          </View>

          {/* PDF Viewer */}
          <Pdf
            source={{ uri: getServerImageUrl(data.document_path), cache: true }}
            style={{
              flex: 1,
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").height,
            }}
            onError={(err: any) => {
              console.error("PDF error:", err);
            }}
          />
        </View>
      ) : (
        <View className="flex-1 items-center justify-center gap-5">
          <Ionicons name="document" size={64} color="#D1D5DB" />
          <Text className="text-gray-500">لا يوجد ملف PDF مرتبط</Text>
        </View>
      )}
    </View>
  );
};

export default DocumentView;
