import { Eye, EyeOff } from "lucide-react-native";
import React, { useRef, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

interface TextFieldProps {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
}) => {
  const [hidden, setHidden] = useState(!!secureTextEntry);
  const inputRef = useRef<TextInput>(null);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <Pressable
      onPress={handleFocus}
      className="w-full flex flex-col gap-1 border border-gray-300 rounded-md pt-4 pb-2 px-2"
    >
      <Text className="text-gray-500">{label}</Text>

      <View className="flex flex-row items-center">
        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={hidden}
          placeholder={placeholder}
          className="flex-1 text-right text-lg px-2 py-1"
          autoCapitalize="none"
        />

        {secureTextEntry && (
          <Pressable onPress={() => setHidden((prev) => !prev)}>
            {hidden ? (
              <Eye size={20} color={"gray"} />
            ) : (
              <EyeOff size={20} color={"gray"} />
            )}
          </Pressable>
        )}
      </View>
    </Pressable>
  );
};

export default TextField;
