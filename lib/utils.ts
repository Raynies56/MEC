import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhoneDO(phone: string) {
  // Very basic format representation
  const cleaned = ('' + phone).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{1})?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    const intlCode = (match[1] ? '+1 ' : '');
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
  }
  return phone;
}
