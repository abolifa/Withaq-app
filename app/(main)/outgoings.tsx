import ErrorComponent from "@/components/ErrorComponent";
import OutgoingContainer from "@/components/OutgoingContainer";
import { usePaginatedQuery } from "@/lib/usePaginatedQuery";
import { Outgoing } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const sortOptions = [
  { label: "تاريخ الإصدار", value: "issue_date" },
  { label: "رقم الصادر", value: "issue_number" },
  { label: "الموضوع", value: "subject" },
];

const Outgoings = () => {
  const [filters, setFilters] = React.useState({
    search: "",
    company_id: undefined as number | undefined,
    date_from: undefined as string | undefined,
    date_to: undefined as string | undefined,
    sort_by: "issue_date",
    sort_dir: "desc",
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = usePaginatedQuery<Outgoing>(["outgoings"], "/outgoings", filters);

  const outgoings = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 5, paddingTop: 12 }}>
      <Toolbox filters={filters} setFilters={setFilters} />
      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="small" color="#3B82F6" />
        </View>
      ) : isError ? (
        <ErrorComponent error={error} />
      ) : (
        <FlatList
          data={outgoings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <OutgoingContainer item={item} />}
          contentContainerClassName="gap-3"
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage) fetchNextPage();
          }}
          onEndReachedThreshold={0.5}
          refreshing={isRefetching}
          onRefresh={refetch}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator
                className="my-3"
                size="small"
                color="#007AFF"
              />
            ) : null
          }
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center mt-10">
              <Text className="text-gray-500">لا توجد مراسلات صادرة</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default Outgoings;

const Toolbox = ({ filters, setFilters }: any) => {
  const [showSortMenu, setShowSortMenu] = React.useState(false);

  return (
    <View
      className="bg-white p-3 rounded-xl shadow-sm mb-3"
      style={{ zIndex: 1000 }}
    >
      <View className="flex-row items-center bg-gray-100 rounded-full px-3 py-5 mb-3">
        <Ionicons name="search-outline" size={18} color="#6B7280" />
        <TextInput
          placeholder="بحث..."
          value={filters.search}
          onChangeText={(text) =>
            setFilters((f: any) => ({ ...f, search: text }))
          }
          className="flex-1 ml-2 text-sm text-gray-700"
        />
        {filters.search ? (
          <TouchableOpacity
            onPress={() => setFilters((f: any) => ({ ...f, search: "" }))}
          >
            <Ionicons name="close-circle" size={18} color="#9CA3AF" />
          </TouchableOpacity>
        ) : null}
      </View>
      <View className="flex-row gap-2">
        <View className="flex-1 relative">
          <TouchableOpacity
            onPress={() => setShowSortMenu((v) => !v)}
            className="h-14 px-3 rounded-lg bg-gray-100 flex-row items-center justify-between"
          >
            <Text className="text-sm text-gray-700">
              {sortOptions.find((o) => o.value === filters.sort_by)?.label}
            </Text>
            <Ionicons name="chevron-down" size={16} color="#6B7280" />
          </TouchableOpacity>

          {showSortMenu && (
            <View
              className="absolute top-12 left-0 right-0 bg-white shadow-lg rounded-lg"
              style={{ zIndex: 1000, elevation: 10 }}
            >
              {sortOptions.map((opt) => (
                <TouchableOpacity
                  key={opt.value}
                  onPress={() => {
                    setFilters((f: any) => ({ ...f, sort_by: opt.value }));
                    setShowSortMenu(false);
                  }}
                  className={`px-4 py-2 ${
                    filters.sort_by === opt.value ? "bg-blue-50" : ""
                  }`}
                >
                  <Text
                    className={`text-sm ${
                      filters.sort_by === opt.value
                        ? "text-blue-600 font-semibold"
                        : "text-gray-800"
                    }`}
                  >
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <TouchableOpacity
          onPress={() =>
            setFilters((f: any) => ({
              ...f,
              sort_dir: f.sort_dir === "asc" ? "desc" : "asc",
            }))
          }
          className="px-3 py-2 bg-gray-100 rounded-lg flex-row items-center"
        >
          <Ionicons
            name={filters.sort_dir === "asc" ? "arrow-up" : "arrow-down"}
            size={16}
            color="#374151"
          />
          <Text className="ml-1 text-sm text-gray-700">
            {filters.sort_dir === "asc" ? "تصاعدي" : "تنازلي"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
