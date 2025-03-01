import "./globals.css";

import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import { SheetProvider } from "@/components/providers/sheet-provider";
import { Toaster } from "@/components/ui/sonner";

import { CartProvider } from "./[slug]/menu/context/cart";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "FoodTotemHub",
  description: "Projeto de hub para restaurantes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} ${poppins.className} antialiased`}>
      <SheetProvider>
        <CartProvider>
          {children}
          </CartProvider>
        </SheetProvider>
        <Toaster />
      </body>
    </html>
  );
}
