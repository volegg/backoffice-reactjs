import type { ReactNode } from "react";

export function renderDate(value: AnyType): ReactNode {
  return new Date(String(value)).toLocaleString();
}