import React from "react";
import { Text, View } from "react-native";

interface ErrorComponentProps {
  error: Error;
}

const ErrorComponent = ({ error }: ErrorComponentProps) => {
  return (
    <View>
      <Text>Error: {error.message}</Text>
    </View>
  );
};

export default ErrorComponent;
