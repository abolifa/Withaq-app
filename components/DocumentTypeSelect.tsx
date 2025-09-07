import { documentTypeOptions } from "@/lib/documentHelpers";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";

interface Props {
  value?: string; // English key stored in DB
  onChange: (val: string) => void;
}

const DocumentTypeSelect: React.FC<Props> = ({ value, onChange }) => {
  const [open, setOpen] = React.useState(false);

  const selected = documentTypeOptions.find((opt) => opt.value === value);

  return (
    <>
      {/* Trigger */}
      <TouchableOpacity
        onPress={() => setOpen(true)}
        className="flex-row items-center justify-between px-4 py-3 rounded-xl bg-gray-100"
      >
        {selected ? (
          <View className="flex-row items-center gap-2">
            <View
              className="h-8 w-8 rounded-full items-center justify-center"
              style={{ backgroundColor: selected.bg }}
            >
              <Ionicons
                name={selected.icon as any}
                size={18}
                color={selected.color}
              />
            </View>
            <Text className="text-gray-800 font-medium">{selected.label}</Text>
          </View>
        ) : (
          <Text className="text-gray-400">اختر نوع المستند</Text>
        )}
        <Ionicons name="chevron-down" size={18} color="#6B7280" />
      </TouchableOpacity>

      {/* Modal Picker */}
      <Modal visible={open} transparent animationType="fade">
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setOpen(false)}
          className="flex-1 bg-black/40 justify-center items-center px-5"
        >
          <View className="bg-white rounded-2xl w-full max-h-[70%] p-4">
            <Text className="text-lg font-bold text-gray-900 mb-3 text-center">
              اختر نوع المستند
            </Text>
            <FlatList
              data={documentTypeOptions}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    onChange(item.value);
                    setOpen(false);
                  }}
                  className="flex-row items-center gap-3 px-3 py-3 rounded-lg mb-1"
                  style={{
                    backgroundColor:
                      item.value === value ? "#EFF6FF" : "transparent",
                  }}
                >
                  <View
                    className="h-8 w-8 rounded-full items-center justify-center"
                    style={{ backgroundColor: item.bg }}
                  >
                    <Ionicons
                      name={item.icon as any}
                      size={18}
                      color={item.color}
                    />
                  </View>
                  <Text
                    className={`text-sm ${
                      item.value === value
                        ? "text-blue-600 font-semibold"
                        : "text-gray-700"
                    }`}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default DocumentTypeSelect;
