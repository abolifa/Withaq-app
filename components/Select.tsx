import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";

export interface Option {
  label: string;
  value: string | number;
  icon?: keyof typeof Ionicons.glyphMap;
  color?: string;
  bg?: string;
}

interface SelectProps {
  label?: string; // optional label above field
  placeholder?: string;
  value?: string | number;
  onChange: (val: string | number) => void;
  options: Option[];
}

const Select: React.FC<SelectProps> = ({
  label,
  placeholder = "اختر",
  value,
  onChange,
  options,
}) => {
  const [open, setOpen] = React.useState(false);

  const selected = options.find((opt) => opt.value === value);

  return (
    <View className="w-full">
      {label && (
        <Text className="mb-2 text-base font-semibold text-gray-700 text-left">
          {label}
        </Text>
      )}
      <TouchableOpacity
        onPress={() => setOpen(true)}
        className="flex-row items-center justify-between px-4 py-5
         rounded-xl bg-white border-hairline border-gray-500"
      >
        {selected ? (
          <View className="flex-row items-center gap-2">
            {selected.icon && (
              <View
                className="h-8 w-8 rounded-full items-center justify-center"
                style={{ backgroundColor: selected.bg || "#E5E7EB" }}
              >
                <Ionicons
                  name={selected.icon}
                  size={18}
                  color={selected.color || "#374151"}
                />
              </View>
            )}
            <Text className="text-gray-800 font-medium">{selected.label}</Text>
          </View>
        ) : (
          <Text className="text-gray-400">{placeholder}</Text>
        )}
        <Ionicons name="chevron-down" size={18} color="#6B7280" />
      </TouchableOpacity>

      {/* modal list */}
      <Modal visible={open} transparent animationType="fade">
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setOpen(false)}
          className="flex-1 bg-black/40 justify-center items-center px-5"
        >
          <View className="bg-white rounded-2xl w-full h-[50%] p-4">
            <Text className="text-lg font-bold text-gray-900 mb-3 text-center">
              {label || "اختر"}
            </Text>

            <FlatList
              data={options}
              showsVerticalScrollIndicator={true}
              keyExtractor={(item) => String(item.value)}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    onChange(item.value);
                    setOpen(false);
                  }}
                  className={`flex-row items-center gap-3 px-3 py-3 rounded-lg mb-1 ${
                    item.value === value ? "bg-blue-50" : ""
                  }`}
                >
                  {item.icon && (
                    <View
                      className="h-8 w-8 rounded-full items-center justify-center"
                      style={{ backgroundColor: item.bg || "#E5E7EB" }}
                    >
                      <Ionicons
                        name={item.icon}
                        size={18}
                        color={item.color || "#374151"}
                      />
                    </View>
                  )}
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
    </View>
  );
};

export default Select;
