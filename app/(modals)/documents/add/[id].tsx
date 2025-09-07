import AttachmentPicker from "@/components/AttachmentPicker";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import Select, { Option } from "@/components/Select";
import api from "@/lib/api";
import { documentTypeOptions } from "@/lib/documentHelpers";
import { Company } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import { ScrollView, View } from "react-native";

const DocumentForm = () => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const { data: companies } = useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const res = await api.get("/companies/light");
      return res.data as Company[];
    },
  });

  const [form, setForm] = useState<{
    company_id: string;
    type: string;
    issue_date: string;
    expiry_date: string;
    number: string;
    attachments: string[];
    notes: string;
  }>({
    company_id: "",
    type: "",
    issue_date: "",
    expiry_date: "",
    number: "",
    attachments: [],
    notes: "",
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: id !== "0" ? "تعديل مستند" : "مستند جديد",
    });
  }, [id, navigation]);
  return (
    <ScrollView contentContainerClassName="flex-1 p-4">
      <View className="flex flex-col items-start gap-5">
        <Select
          label="الشركة"
          value={form.company_id}
          onChange={(value) => setForm({ ...form, company_id: String(value) })}
          options={
            companies
              ? companies.map((company) => ({
                  label: company.name,
                  value: String(company.id),
                }))
              : []
          }
          placeholder="اختر"
        />
        <Select
          label="نوع المستند"
          placeholder="اختر"
          value={form.type}
          onChange={(value) => setForm({ ...form, type: String(value) })}
          options={documentTypeOptions as Option[]}
        />

        <DatePicker
          label="تاريخ الإصدار"
          value={form.issue_date}
          onChange={(date) => setForm({ ...form, issue_date: date })}
        />

        <DatePicker
          label="تاريخ الانتهاء"
          value={form.expiry_date}
          onChange={(date) => setForm({ ...form, expiry_date: date })}
        />

        <Input
          label="رقم المستند"
          value={form.number}
          onChangeText={(text) => setForm({ ...form, number: text })}
          placeholder="أدخل الرقم"
        />

        <AttachmentPicker
          value={form.attachments}
          onChange={(files) => setForm({ ...form, attachments: files })}
        />
      </View>
    </ScrollView>
  );
};

export default DocumentForm;

// company_id;
// type;
// issue_date;
// expiry_date;
// number;
// attachments;
// notes;
// document_path;
