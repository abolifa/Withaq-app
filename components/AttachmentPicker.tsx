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

export interface FileItem {
  uri: string;
  name: string;
  type: string;
}

interface Props {
  value: FileItem[];
  onChange: (val: FileItem[]) => void;
}

const AttachmentPicker: React.FC<Props> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);

  const pickImage = async (fromCamera: boolean) => {
    try {
      if (fromCamera) {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("إذن الكاميرا مرفوض", "يرجى السماح باستخدام الكاميرا");
          return;
        }
      } else {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("إذن الوصول للصور مرفوض", "يرجى السماح للوصول إلى الصور");
          return;
        }
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
        const assets = "assets" in result ? result.assets : [result];
        const files: FileItem[] = assets.map((asset, idx) => {
          const fileName =
            asset.fileName || asset.uri.split("/").pop() || `file_${idx}.jpg`;
          let type = "image/jpeg";
          if (fileName.endsWith(".png")) type = "image/png";
          if (fileName.endsWith(".pdf")) type = "application/pdf";

          return {
            uri: asset.uri,
            name: fileName,
            type,
          };
        });

        onChange([...(value || []), ...files]);
      }
    } catch (err) {
      console.error("Attachment error:", err);
      Alert.alert("خطأ", "فشل في اختيار الملف");
    } finally {
      setOpen(false);
    }
  };

  const removeFile = (uri: string) => {
    onChange(value.filter((f) => f.uri !== uri));
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
          keyExtractor={(file) => file.uri}
          horizontal
          className="mt-3"
          renderItem={({ item }) => (
            <View className="relative mr-2">
              <Image
                source={{ uri: item.uri }}
                className="w-20 h-20 rounded-lg border"
              />
              <TouchableOpacity
                onPress={() => removeFile(item.uri)}
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
