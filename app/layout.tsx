import type React from "react";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Toaster } from "sonner";
import Providers from "./providers";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata = {
  title: "Professor Med | Sua aprovação, nossa missão",
  description:
    "Site de video aulas de medicina para ajudar estudantes latinos a se prepararem para a carreira academica.",
  keywords:
    "videoaula, meidicna, latinos, site, estudantes, plano academico",
  author: "Nutri Med Equipe",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body className={`${poppins.variable} font-poppins`}>
        <Toaster
          position="top-center"
          className="mt-20 z-50"
          duration={4000}
          closeButton
          richColors
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
