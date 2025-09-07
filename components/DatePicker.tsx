import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface Props {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange: (val: string) => void;
}

const DatePicker: React.FC<Props> = ({
  label,
  placeholder = "اختر التاريخ",
  value,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(
    value ? new Date(value) : new Date()
  );

  const confirmDate = () => {
    onChange(tempDate.toISOString().split("T")[0]); // format YYYY-MM-DD
    setOpen(false);
  };

  return (
    <View className="mb-4 w-full">
      {label && (
        <Text className="text-sm font-base font-semibold text-left text-gray-700 mb-2">
          {label}
        </Text>
      )}

      <TouchableOpacity
        onPress={() => setOpen(true)}
        className="flex-row items-center justify-between px-4 py-5
        rounded-xl bg-white border-hairline border-gray-500"
      >
        {value ? (
          <Text className="text-gray-800 font-medium">
            {dayjs(value).format("YYYY/MM/DD")}
          </Text>
        ) : (
          <Text className="text-gray-400">{placeholder}</Text>
        )}
        <Ionicons name="calendar-outline" size={18} color="#6B7280" />
      </TouchableOpacity>

      {/* Modal with native picker */}
      <Modal visible={open} transparent animationType="fade">
        <View className="flex-1 bg-black/40 justify-center items-center">
          <View className="bg-white rounded-xl w-11/12 p-4">
            <DateTimePicker
              value={tempDate}
              mode="date"
              display="spinner"
              onChange={(e: DateTimePickerEvent, date?: Date) => {
                if (date) setTempDate(date);
              }}
            />

            <View className="flex-row justify-center items-center mt-3 gap-3">
              <TouchableOpacity
                onPress={() => setOpen(false)}
                className="flex-1 px-4 py-2 border-hairline border-gray-500 rounded-lg"
              >
                <Text className="text-gray-500 text-center">إلغاء</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={confirmDate}
                className="flex-1 py-2 bg-blue-500 rounded-lg"
              >
                <Text className="text-white font-medium text-center">
                  تأكيد
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DatePicker;
