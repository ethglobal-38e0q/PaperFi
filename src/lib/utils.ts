import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function uploadAvatar(file: File, userId: string) {
  const formData = new FormData();
  formData.append("avatar", file);

  const res = await fetch("https://paper.19700102.xyz/api/avatar", {
    method: "POST",
    headers: {
      "x-user-id": userId, // Worker reads this
    },
    body: formData,
  });

  const data = await res.json();
  return data.url; // Public R2 URL
}
