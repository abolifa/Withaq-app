import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

interface CsButtonProps {
  title?: string;
  onPress?: () => void;
  backgroundColor?: string;
  textColor?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

const CsButton = ({
  title,
  onPress,
  disabled,
  backgroundColor,
  textColor,
  isLoading,
}: CsButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`w-full p-5 rounded-lg items-center justify-center ${
        backgroundColor || "bg-blue-500"
      }`}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={textColor || "#fff"} />
      ) : (
        <Text
          className="text-lg font-bold"
          style={{ color: textColor || "white" }}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CsButton;
