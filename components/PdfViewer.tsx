import { getServerImageUrl } from "@/lib/utils";
import React from "react";
import { Dimensions, View } from "react-native";
import Pdf from "react-native-pdf";

const PdfViewer = ({ path }: { path: string }) => {
  const source = {
    uri: `${getServerImageUrl(path)}?t=${Date.now()}`,
    cache: false,
  };

  console.log("Loading PDF from:", source.uri);

  return (
    <View style={{ flex: 1 }}>
      <Pdf
        source={source}
        style={{
          flex: 1,
          width: Dimensions.get("window").width - 32,
          height: Dimensions.get("window").height * 0.7,
        }}
        onError={(err: any) => {
          console.error("PDF error:", err);
        }}
      />
    </View>
  );
};

export default PdfViewer;
