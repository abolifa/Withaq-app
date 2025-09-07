import { getServerImageUrl } from "@/lib/utils";
import { Outgoing } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import React from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import Pdf from "react-native-pdf";

const OutgoingContainer = ({ item }: { item: Outgoing }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleDownload = async () => {
    try {
      if (!item.document_path) {
        Alert.alert("خطأ", "لا يوجد ملف لتنزيله.");
        return;
      }

      const url = getServerImageUrl(item.document_path);

      const fileName = `${item.subject || "document"}.pdf`;

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
      if (!item.document_path) {
        Alert.alert("خطأ", "لا يوجد ملف للمشاركة.");
        return;
      }
      const url = getServerImageUrl(item.document_path);
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
    <TouchableOpacity
      activeOpacity={0.95}
      className="w-full rounded-3xl overflow-hidden border-hairline border-gray-500 shadow-lg"
      style={{
        backgroundColor: "#FFFFFF",
        elevation: 5,
      }}
    >
      <View className="absolute top-0 left-0 h-full w-2 bg-blue-500" />

      <View className="p-5 bg-gradient-to-r from-blue-50 to-blue-100 flex-row justify-between items-center">
        <View className="flex-row items-center gap-3">
          <View className="h-12 w-12 bg-white rounded-full items-center justify-center shadow">
            <Ionicons name="mail-outline" size={22} color="#2563EB" />
          </View>
          <View className="max-w-[180px]">
            <Text
              className="text-base font-bold text-gray-900 text-left"
              numberOfLines={1}
            >
              {item.subject || "بدون موضوع"}
            </Text>

            <View className="mt-1 bg-blue-600/10 px-3 py-1 rounded-md self-start">
              <Text className="text-xs text-blue-700 font-semibold">
                رقم الصادر: {item.issue_number ?? "-"}
              </Text>
            </View>
          </View>
        </View>

        {item.company && (
          <View className="flex-row items-center gap-2">
            {item.company.logo && (
              <Image
                source={{ uri: item.company.logo }}
                className="h-8 w-8 rounded-full border border-gray-200"
                resizeMode="contain"
              />
            )}
            <View className="bg-blue-600 px-3 py-1 rounded-full shadow-sm">
              <Text className="text-xs text-white font-semibold">
                {item.company.name}
              </Text>
            </View>
          </View>
        )}
      </View>

      <View className="h-px bg-gray-200 mx-5" />

      <View className="px-5 py-4 gap-3">
        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-row items-center gap-2">
            <View className="h-8 w-8 bg-blue-500 rounded-full items-center justify-center">
              <Ionicons name="person-circle-outline" size={20} color="white" />
            </View>
            <Text className="text-sm text-black font-semibold">إلى</Text>
          </View>
          <Text
            className="text-sm text-gray-700 max-w-[160px]"
            numberOfLines={1}
          >
            {item.to || item.contact?.name || "غير محدد"}
          </Text>
        </View>

        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-row items-center gap-2">
            <View className="h-8 w-8 bg-green-500 rounded-full items-center justify-center">
              <Ionicons name="mail-outline" size={20} color="white" />
            </View>
            <Text className="text-sm text-black font-semibold">الموضوع</Text>
          </View>
          <Text
            className="text-sm text-gray-700 max-w-[160px]"
            numberOfLines={1}
          >
            {item.subject || "غير محدد"}
          </Text>
        </View>

        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-row items-center gap-2">
            <View className="h-8 w-8 bg-gray-200 rounded-full items-center justify-center">
              <Ionicons name="calendar-outline" size={18} color="#374151" />
            </View>
            <Text className="text-sm text-black font-semibold">التاريخ</Text>
          </View>
          <Text className="text-sm text-gray-700">
            {dayjs(item.issue_date).format("YYYY/MM/DD")}
          </Text>
        </View>
      </View>

      <View className="h-px bg-gray-200 mx-5" />

      <View className="px-5 py-3 flex-row justify-center items-center gap-2">
        <TouchableOpacity
          onPress={toggleModal}
          className="px-4 py-2 bg-green-300 rounded-lg"
        >
          <Text className="text-green-600">عرض الرسالة</Text>
        </TouchableOpacity>
        <TouchableOpacity className="px-4 py-2 bg-amber-300 rounded-lg">
          <Text className="text-amber-600">عرض المرفقات</Text>
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={modalVisible}
        onBackdropPress={toggleModal}
        style={{ margin: 0, justifyContent: "flex-end" }}
      >
        <View className="bg-white rounded-t-3xl p-4 h-[74%]">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-bold text-gray-900">
              {item.subject}
            </Text>
            <TouchableOpacity onPress={toggleModal}>
              <Ionicons name="close" size={20} color="gray" />
            </TouchableOpacity>
          </View>

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

          <Pdf
            source={{
              uri: getServerImageUrl(item.document_path!),
              cache: false,
            }}
            style={{ flex: 1, width: "100%" }}
            onError={(err: any) => console.error("PDF error:", err)}
          />
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

export default OutgoingContainer;
