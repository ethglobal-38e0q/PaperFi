import Axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { setupCache } from "axios-cache-interceptor";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function uploadAvatar(file: File, userId: string) {
  const formData = new FormData();
  formData.append("avatar", file);

  const res = await fetch("/api/avatar", {
    method: "POST",
    headers: {
      "x-user-id": userId, // Worker reads this
    },
    body: formData,
  });

  const data = await res.json();
  return data.url; // Public R2 URL
}

export function customPriceFormatter(symbolInfo) {
  return {
    format: price => {
      if (price >= 100000) {
        return price.toFixed(0);
      } else if (price >= 1000) {
        return price.toFixed(2);
      } else if (price >= 1) {
        return price.toFixed(3);
      } else {
        return price.toFixed(5);
      }
    },
  };
}
const instance = Axios.create();
export const axiosCached = setupCache(instance);
