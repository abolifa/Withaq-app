import React from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  ...props
}) => {
  return (
    <View className="mb-4 w-full">
      {label && (
        <Text className="text-base text-left font-semibold text-gray-700 mb-2">
          {label}
        </Text>
      )}

      <TextInput
        {...props}
        className={`px-4 py-5 rounded-xl border text-gray-900 bg-white text-right
          ${error ? "border-red-500" : "border-gray-300"}
        `}
        placeholderTextColor="#9CA3AF"
      />

      {helperText && !error && (
        <Text className="text-xs text-gray-500 mt-1">{helperText}</Text>
      )}
      {error && <Text className="text-xs text-red-500 mt-1">{error}</Text>}
    </View>
  );
};

export default Input;
