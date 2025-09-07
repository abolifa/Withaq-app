import { getDocumentMeta } from "@/lib/documentHelpers";
import { Document } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import dayjs from "dayjs";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

function getStatus(expiryDate?: string) {
  if (!expiryDate)
    return { label: "غير محدد", color: "#6B7280", bg: "#F3F4F6" };

  const today = dayjs();
  const exp = dayjs(expiryDate);

  if (exp.isBefore(today, "day")) {
    return { label: "منتهي", color: "#DC2626", bg: "#FEE2E2" };
  }
  if (exp.diff(today, "day") <= 30) {
    return { label: "قرب الانتهاء", color: "#F59E0B", bg: "#FEF3C7" };
  }
  return { label: "ساري", color: "#16A34A", bg: "#DCFCE7" };
}

const DocumentContainer = ({ document }: { document: Document }) => {
  const meta = getDocumentMeta(document?.type);
  const status = getStatus(document?.expiry_date);

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/documents/view/[id]",
          params: { id: String(document.id), name: meta.label },
        })
      }
    >
      <View
        className="bg-white rounded-3xl shadow-md overflow-hidden 
      border-hairline border-gray-500"
      >
        <View className="flex-row justify-between items-start p-5 pb-3">
          <View className="flex-row items-center gap-3">
            <View
              className="w-14 h-14 rounded-full items-center justify-center shadow-sm"
              style={{ backgroundColor: meta.bg }}
            >
              <Ionicons name={meta.icon} size={26} color={meta.color} />
            </View>
            <Text className="text-lg font-bold text-gray-900">
              {meta.label}
            </Text>
          </View>
          <View
            className="px-3 py-1 rounded-full"
            style={{ backgroundColor: status.bg }}
          >
            <Text
              className="text-xs font-semibold"
              style={{ color: status.color }}
            >
              {status.label}
            </Text>
          </View>
        </View>

        <View className="h-px bg-gray-100 mx-5" />

        <View className="p-5 space-y-4">
          {document?.issue_date && (
            <View className="flex-row items-center gap-3">
              <View className="w-9 h-9 rounded-full bg-blue-50 items-center justify-center">
                <Ionicons name="calendar-outline" size={18} color="#2563EB" />
              </View>
              <Text className="text-gray-700 text-sm">
                <Text className="font-semibold">تاريخ الإصدار:</Text>{" "}
                {format(new Date(document.issue_date), "dd/MM/yyyy")}
              </Text>
            </View>
          )}

          {document?.expiry_date && (
            <View className="flex-row items-center gap-3">
              <View className="w-9 h-9 rounded-full bg-red-50 items-center justify-center">
                <Ionicons name="time-outline" size={18} color="#DC2626" />
              </View>
              <Text className="text-gray-700 text-sm">
                <Text className="font-semibold">تاريخ الانتهاء:</Text>{" "}
                {format(new Date(document.expiry_date), "dd/MM/yyyy")}
              </Text>
            </View>
          )}

          {document?.number && (
            <View className="flex-row items-center gap-3">
              <View className="w-9 h-9 rounded-full bg-yellow-50 items-center justify-center">
                <Ionicons name="pricetag-outline" size={18} color="#D97706" />
              </View>
              <Text className="text-gray-700 text-sm">
                <Text className="font-semibold">الرقم:</Text> {document.number}
              </Text>
            </View>
          )}

          {document?.notes && (
            <Text className="text-gray-500 text-sm flex-1 leading-5 text-center mt-3">
              {document.notes}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DocumentContainer;
