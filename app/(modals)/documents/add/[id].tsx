import AttachmentPicker from "@/components/AttachmentPicker";
import CsButton from "@/components/CsButton";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import Select, { Option } from "@/components/Select";
import TextArea from "@/components/TextArea";
import api from "@/lib/api";
import { queryClient } from "@/lib/client";
import { documentTypeOptions } from "@/lib/documentHelpers";
import { getErrorMessage, getServerImageUrl } from "@/lib/utils";
import { Company, Document } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useLayoutEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";

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

  const { data, isLoading } = useQuery({
    queryKey: ["document", id],
    queryFn: async () => {
      const res = await api.get(`/documents/${id}`);
      return res.data.document as Document;
    },
    enabled: id !== "0",
  });

  React.useEffect(() => {
    if (data && !isLoading) {
      setForm({
        company_id: String(data.company_id),
        type: data.type,
        issue_date: data.issue_date || "",
        expiry_date: data.expiry_date || "",
        number: data.number || "",
        attachments: (data.attachments || []).map((path: string) => ({
          uri: getServerImageUrl(path),
          name: path.split("/").pop() || "file",
          type: path.endsWith(".pdf") ? "application/pdf" : "image/jpeg",
          isRemote: true,
        })),
        notes: data.notes || "",
      });
    }
  }, [data, isLoading]);

  const [form, setForm] = useState<{
    company_id: string;
    type: string;
    issue_date: string;
    expiry_date: string;
    number: string;
    attachments: {
      uri: string;
      name: string;
      type: string;
      isRemote?: boolean;
    }[];
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

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append("company_id", form.company_id);
      formData.append("type", form.type);
      formData.append("issue_date", form.issue_date);
      formData.append("expiry_date", form.expiry_date);
      formData.append("number", form.number);
      formData.append("notes", form.notes);

      form.attachments.forEach((file, idx) => {
        if (file.isRemote) {
          formData.append(
            "existing_attachments[]",
            file.uri.replace(getServerImageUrl(""), "")
          );
        } else {
          formData.append("attachments[]", {
            uri: file.uri.startsWith("file://")
              ? file.uri
              : `file://${file.uri}`,
            type: file.type || "application/octet-stream",
            name: file.name || `attachment_${idx}`,
          } as any);
        }
      });

      if (id !== "0") {
        await api.post(`/documents/${id}?_method=PUT`, formData, {
          headers: { Accept: "application/json" },
        });
        Alert.alert("نجاح", "تم تحديث المستند بنجاح");
      } else {
        await api.post("/documents", formData, {
          headers: { Accept: "application/json" },
        });
        Alert.alert("نجاح", "تم حفظ المستند بنجاح");
      }

      queryClient.invalidateQueries({
        queryKey: ["documents", form.company_id],
      });

      navigation.goBack();
    } catch (error: any) {
      console.log("Upload error:", error.response?.data || error.message);
      Alert.alert("خطأ", getErrorMessage(error));
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        padding: 16,
      }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={true}
    >
      <View className="flex flex-col gap-5">
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

        <TextArea
          label="ملاحظات"
          value={form.notes}
          onChangeText={(text) => setForm({ ...form, notes: text })}
          placeholder="أدخل ملاحظاتك هنا..."
          rows={4}
        />

        <CsButton onPress={handleSubmit} title="حفظ" />
        <View className="h-16" />
      </View>
    </ScrollView>
  );
};

export default DocumentForm;
