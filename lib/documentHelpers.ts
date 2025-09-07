import { Ionicons } from "@expo/vector-icons";

export interface DocumentMeta {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  bg: string;
}

export const documentTypes: Record<string, DocumentMeta> = {
  commercial_register: {
    label: "السجل التجاري",
    icon: "briefcase-outline",
    color: "#2563EB",
    bg: "#DBEAFE",
  },
  trading_license: {
    label: "الرخصة التجارية",
    icon: "storefront-outline",
    color: "#16A34A",
    bg: "#DCFCE7",
  },
  tax_registration: {
    label: "شهادة سداد ضريبي",
    icon: "receipt-outline",
    color: "#F59E0B",
    bg: "#FEF3C7",
  },
  import_register: {
    label: "سجل مستوردين",
    icon: "cart-outline",
    color: "#7C3AED",
    bg: "#EDE9FE",
  },
  industrial_register: {
    label: "سجل صناعي",
    icon: "construct-outline",
    color: "#0891B2",
    bg: "#CFFAFE",
  },
  industrial_license: {
    label: "رخصة صناعية",
    icon: "build-outline",
    color: "#EA580C",
    bg: "#FFEDD5",
  },
  statistical_code: {
    label: "رمز إحصائي",
    icon: "stats-chart-outline",
    color: "#4F46E5",
    bg: "#E0E7FF",
  },
  cbl_certificate: {
    label: "شهادة CBL",
    icon: "shield-checkmark-outline",
    color: "#059669",
    bg: "#D1FAE5",
  },
  social_security_certificate: {
    label: "شهادة ضمان اجتماعي",
    icon: "people-outline",
    color: "#DB2777",
    bg: "#FCE7F3",
  },
  solidarity_certificate: {
    label: "شهادة تضامن",
    icon: "hand-left-outline",
    color: "#2563EB",
    bg: "#DBEAFE",
  },
  articles_of_association: {
    label: "النظام الأساسي",
    icon: "document-text-outline",
    color: "#0D9488",
    bg: "#CCFBF1",
  },
  foundation_contract: {
    label: "عقد التأسيس",
    icon: "create-outline",
    color: "#CA8A04",
    bg: "#FEF9C3",
  },
  amendment_contract: {
    label: "عقد التعديل",
    icon: "document-attach-outline",
    color: "#9333EA",
    bg: "#F3E8FF",
  },
  general_assembly_minutes: {
    label: "محضر الجمعية العمومية",
    icon: "podium-outline",
    color: "#DC2626",
    bg: "#FEE2E2",
  },
};

// ✅ Existing fallback
export function getDocumentMeta(type?: string): DocumentMeta {
  return (
    (type && documentTypes[type]) || {
      label: "مستند",
      icon: "document-outline",
      color: "#6B7280",
      bg: "#F3F4F6",
    }
  );
}

// ✅ Extra: generate options for dropdowns
export const documentTypeOptions = Object.entries(documentTypes).map(
  ([value, meta]) => ({
    label: meta.label, // Arabic text shown
    value, // English key stored in DB
    icon: meta.icon, // you can show the icon inside picker if you want
    color: meta.color,
    bg: meta.bg,
  })
);

// ✅ Extra: helper for label lookup only
export const getDocumentLabel = (key?: string) =>
  (key && documentTypes[key]?.label) || "غير محدد";
