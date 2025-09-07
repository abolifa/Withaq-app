import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  value: string[];
  onChange: (val: string[]) => void;
}

const AttachmentPicker: React.FC<Props> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);

  const pickImage = async (fromCamera: boolean) => {
    try {
      // Request permissions first
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (fromCamera && status !== "granted") {
        Alert.alert("إذن الكاميرا مرفوض", "يرجى السماح باستخدام الكاميرا");
        return;
      }

      const { status: libStatus } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!fromCamera && libStatus !== "granted") {
        Alert.alert("إذن الوصول للصور مرفوض", "يرجى السماح للوصول إلى الصور");
        return;
      }

      let result: ImagePicker.ImagePickerResult;

      if (fromCamera) {
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 0.8,
        });
      } else {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsMultipleSelection: true,
          quality: 0.8,
        });
      }

      if (!result.canceled) {
        const uris = result.assets.map((a) => a.uri);
        onChange([...value, ...uris]);
      }
    } catch (err) {
      console.error("Attachment error:", err);
    } finally {
      setOpen(false);
    }
  };

  const removeFile = (uri: string) => {
    onChange(value.filter((f) => f !== uri));
  };

  return (
    <View className="mb-4 w-full">
      <Text className="text-sm font-semibold text-left text-gray-700 mb-2">
        المرفقات
      </Text>

      {/* Button */}
      <TouchableOpacity
        onPress={() => setOpen(true)}
        className="px-4 py-5 bg-white rounded-xl border-hairline
         border-gray-500 flex-row items-center justify-between"
      >
        <Text className="text-gray-700">إضافة مرفق</Text>
        <Ionicons name="add-circle-outline" size={20} color="#2563EB" />
      </TouchableOpacity>

      {/* Preview list */}
      {value.length > 0 && (
        <FlatList
          data={value}
          keyExtractor={(uri) => uri}
          horizontal
          className="mt-3"
          renderItem={({ item }) => (
            <View className="relative mr-2">
              <Image
                source={{ uri: item }}
                className="w-20 h-20 rounded-lg border"
              />
              <TouchableOpacity
                onPress={() => removeFile(item)}
                className="absolute top-1 right-1 bg-black/60 rounded-full p-1"
              >
                <Ionicons name="close" size={14} color="white" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {/* Dialog */}
      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          className="flex-1 bg-black/40 justify-center items-center px-5"
          onPressOut={() => setOpen(false)}
        >
          <View className="bg-white w-full rounded-2xl p-5">
            <Text className="text-lg font-bold text-gray-900 mb-4 text-center">
              اختر مصدر الملف
            </Text>
            <TouchableOpacity
              onPress={() => pickImage(true)}
              className="flex-row items-center gap-2 px-4 py-3 rounded-lg bg-gray-100 mb-3"
            >
              <Ionicons name="camera-outline" size={20} color="#2563EB" />
              <Text className="text-gray-800">الكاميرا</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => pickImage(false)}
              className="flex-row items-center gap-2 px-4 py-3 rounded-lg bg-gray-100"
            >
              <Ionicons name="folder-outline" size={20} color="#16A34A" />
              <Text className="text-gray-800">الملفات / الاستوديو</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default AttachmentPicker;
