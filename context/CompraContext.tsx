// context/CompraContext.tsx
'use client'
import { createContext, useContext, useState } from "react";

type CompraContextType = {
  receitas: boolean;
  setReceitas: (value: boolean) => void;
};

const CompraContext = createContext<CompraContextType | undefined>(undefined);

export function CompraProvider({ children }: { children: React.ReactNode }) {
  const [receitas, setReceitas] = useState(false);

  return (
    <CompraContext.Provider value={{ receitas, setReceitas }}>
      {children}
    </CompraContext.Provider>
  );
}

export function useCompra() {
  const context = useContext(CompraContext);
  if (!context) throw new Error("useCompra deve ser usado dentro de CompraProvider");
  return context;
}