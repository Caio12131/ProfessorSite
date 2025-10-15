"use client";

import { CompraProvider } from "@/context/CompraContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <CompraProvider>{children}</CompraProvider>;
}
