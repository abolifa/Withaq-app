import React from "react";
import { Text, TextInput, View } from "react-native";

interface TextAreaProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText: (text: string) => void;
  rows?: number;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  placeholder = "اكتب هنا...",
  value,
  onChangeText,
  rows = 4,
}) => {
  return (
    <View className="w-full mb-4">
      {label && (
        <Text className="mb-2 text-base text-left font-semibold text-gray-700">
          {label}
        </Text>
      )}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        multiline
        numberOfLines={rows}
        textAlignVertical="top"
        className="w-full px-4 py-3 text-right rounded-xl bg-white border border-gray-300 text-gray-800"
        style={{ minHeight: rows * 24 }}
      />
    </View>
  );
};

export default TextArea;
