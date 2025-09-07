import { getEurToLyd, getUsdToLyd } from "@/lib/utils";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";
import { ActivityIndicator, Text, View } from "react-native";

type Trend = "up" | "down" | "same";

function useTrend(value?: number) {
  const prev = useRef<number | undefined>(undefined);

  let trend: Trend = "same";
  if (value && prev.current !== undefined) {
    if (value > prev.current) trend = "up";
    else if (value < prev.current) trend = "down";
  }
  if (value !== undefined) prev.current = value;
  return trend;
}

export default function ExchangeRate() {
  const { data: usd, isLoading: usdLoading } = useQuery({
    queryKey: ["usd-to-lyd"],
    queryFn: getUsdToLyd,
    refetchInterval: 1 * 60 * 1000,
  });

  const { data: eur, isLoading: eurLoading } = useQuery({
    queryKey: ["eur-to-lyd"],
    queryFn: getEurToLyd,
    refetchInterval: 1 * 60 * 1000,
  });

  const usdTrend = useTrend(usd);
  const eurTrend = useTrend(eur);

  const renderRate = (
    label: string,
    value?: number,
    loading?: boolean,
    trend?: Trend
  ) => {
    return (
      <View className="flex-row items-center justify-between py-3">
        <Text className="text-lg font-semibold text-gray-800 font-[Tajawal]">
          {label}
        </Text>
        <View className="flex-row items-center space-x-2">
          {loading ? (
            <ActivityIndicator size="small" color="#888" />
          ) : value ? (
            <>
              <Text className="text-lg font-bold text-blue-600">
                {value.toFixed(2)}
              </Text>
              {trend === "up" && (
                <Ionicons name="arrow-up" size={20} color="green" />
              )}
              {trend === "down" && (
                <Ionicons name="arrow-down" size={20} color="red" />
              )}
              {trend === "same" && <></>}
            </>
          ) : null}
        </View>
      </View>
    );
  };

  return (
    <View className="p-4 bg-white rounded-b-2xl shadow-sm">
      {renderRate("🇺🇸 USD", usd, usdLoading, usdTrend)}
      <View className="h-px bg-gray-200 my-2" />
      {renderRate("🇪🇺 EUR", eur, eurLoading, eurTrend)}
    </View>
  );
}
