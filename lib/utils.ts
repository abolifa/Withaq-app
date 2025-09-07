import { AxiosError } from "axios";

export function getErrorMessage(error: unknown): string {
  if (error && typeof error === "object" && "isAxiosError" in error) {
    const axiosError = error as AxiosError<any>;

    // Laravel validation errors (422)
    if (
      axiosError.response?.status === 422 &&
      axiosError.response.data?.errors
    ) {
      const firstField = Object.values(
        axiosError.response.data.errors
      )[0] as string[];
      return firstField[0] || "خطأ في التحقق من البيانات";
    }

    // Laravel error with "message"
    if (axiosError.response?.data?.message) {
      return axiosError.response.data.message;
    }

    // Laravel error with "error"
    if (axiosError.response?.data?.error) {
      return axiosError.response.data.error;
    }

    // Fallback to generic Axios message
    return axiosError.message || "حدث خطأ غير متوقع";
  }

  return "حدث خطأ غير متوقع";
}

import api from "./api";

export async function getUsdToLyd() {
  const res = await api.get("https://open.er-api.com/v6/latest/USD");
  return res.data.rates.LYD;
}

export async function getEurToLyd() {
  const res = await api.get("https://open.er-api.com/v6/latest/EUR");
  return res.data.rates.LYD;
}

export function getServerImageUrl(path: string): string {
  const BASE_URL = "http://172.20.10.3:8000/storage";
  return `${BASE_URL}/${path}`;
}
