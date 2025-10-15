"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/app/api/firebase";
import { Menu, LogOut } from "lucide-react";
import MobileMenu from "./mobile-menu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  const isActive = (path: string) => pathname === path;

  const menuItems = [
    { href: "/home", label: "Home" },
    { href: "/dietas", label: "Dietas" },
    { href: "/perfil", label: "Perfil" },
  ];

  return (
    <>
      <header
        className={`w-full fixed top-0 left-0 z-40 bg-white transition-all duration-300 ${
          isScrolled ? "shadow-sm" : ""
        } border-b border-gray-100`}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Botão menu mobile (lado esquerdo) */}
          <div className="w-1/3 flex md:hidden">
            <button onClick={toggleMenu} aria-label="Abrir menu">
              <Menu className="h-6 w-6 text-gray-700" />
            </button>
          </div>

          {/* Menus centralizados (desktop) */}
          <div className="hidden md:flex items-center space-x-6 justify-center w-1/3">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors relative ${
                  isActive(item.href)
                    ? "text-black-700"
                    : "text-zinc-500 hover:text-gray-900"
                }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="absolute -bottom-1.5 left-0 w-full h-0.5 bg-black-700 rounded-full"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Botão sair (lado direito) */}
          <div className="w-1/3 flex justify-end">
            <button
              onClick={handleLogout}
              className="ml-4 px-4 py-2 rounded-md border border-black-700 text-black-700 hover:bg-black-50 transition-colors text-sm font-medium flex items-center"
            >
              <span>Sair</span>
              <LogOut className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile (drop) */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <div className="h-14"></div>
    </>
  );
}
