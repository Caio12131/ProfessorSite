"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/app/api/firebase";
import { getUserProfile } from "@/app/api/database";
import {
  X,
  Home,
  FileText,
  User,
  LogOut,
  Mail,
  Ticket,
  User2,
  Headset,
} from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userTicket, setUserTicket] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  // Buscar dados do usuário quando o menu abrir
  useEffect(() => {
    const fetchUserData = async () => {
      if (isOpen && auth.currentUser) {
        setLoading(true);
        try {
          // Obter email do Auth
          setUserEmail(auth.currentUser.email);

          // Obter ticket do banco de dados
          const userProfile = await getUserProfile(auth.currentUser.uid);
          if (userProfile && userProfile.Tickets !== undefined) {
            setUserTicket(userProfile.Tickets);
          }
        } catch (error) {
          console.error("Erro ao buscar dados do usuário:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
      onClose();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  // Previne o scroll quando o menu está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const menuItems = [
    { href: "/home", label: "Home", icon: Home },
    { href: "/dietas", label: "Dietas", icon: FileText },
    { href: "/perfil", label: "Perfil", icon: User },
  ];

  return (
    <>
      {/* Overlay com animação de fade */}
      <div
        className={`fixed inset-0 bg-black/30 z-50 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Menu com animação de slide */}
      <div
        className={`fixed inset-y-0 right-0 w-[80%] max-w-xs bg-white z-50 shadow-xl flex flex-col transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header do menu */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center">
            <div>
                      <span className="text-3xl">
                      <Image src="/img/logoh.png" alt="Logo" width={150} height={200} />
            
                      </span>
                      </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Fechar menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Links do menu com design mais profissional */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-4 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
                  isActive(item.href)
                    ? "bg-gray-100 text-gray-900"
                    : "hover:bg-gray-50 text-zinc-500"
                }`}
                onClick={onClose}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center mr-3 ${
                    isActive(item.href)
                      ? "bg-white text-green-700"
                      : "bg-gray-50 text-gray-500"
                  }`}
                >
                  <item.icon size={18} />
                </div>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Card de informações do usuário na parte inferior */}
        <div className="p-4 border-t border-gray-100">
          {loading ? (
            <div className="animate-pulse space-y-2 p-4 bg-gray-50 rounded-lg">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-100">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-2">
                  <User size={16} />
                </div>
                <div className="flex-1 truncate">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    Meu Perfil
                  </h3>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-700">
                  <Mail
                    size={14}
                    className="mr-2 text-gray-500 flex-shrink-0"
                  />
                  <span className="truncate">{userEmail || "Usuário"}</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Ticket
                    size={14}
                    className="mr-2 text-gray-500 flex-shrink-0"
                  />
                  <span>
                    Saldo: {userTicket !== null ? `#${userTicket}` : "0"}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Botão de logout */}
          <button
            onClick={handleLogout}
            className="flex items-center w-full p-3 mt-3 rounded-lg hover:bg-gray-50 text-gray-700 transition-all duration-200"
          >
            <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 mr-3">
              <LogOut size={18} />
            </div>
            <span className="font-medium">Sair</span>
          </button>
        </div>
      </div>
    </>
  );
}
