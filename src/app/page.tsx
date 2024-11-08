"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FiDownload,
  FiShield,
  FiZap,
  FiStar,
  FiCheck,
  FiSmartphone,
} from "react-icons/fi";
import { toast } from "sonner";
import { Header } from "@/components/layout/Header";

// Types
type Stats = {
  value: string;
  label: string;
};

type Feature = {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  benefits: string[];
};

// Constants
const APP_DOWNLOAD_URL =
  process.env.NEXT_PUBLIC_APP_DOWNLOAD_URL ||
  "https://download938.mediafire.com/fskd0uy8kfjgxCrFoYTgRRvvWGXGCYt4L1IJP8u5h9jVE9RtMZ3xBxsOJuF3AYz1r42zTYACv_LmrIsUxklS_fItpKdIewp9t5IMz9PxZkgUwadeAGmDCpI5AFIa6ebkuI2VE5k7YM-ziugMiuPXLpTEDRJEcnatbgcBPRglP_LbZ0E/fpcwzteqta0gyrw/TroK%21.apk";

const APP_URL = "https://app.trok-servicos.com.br";

const stats: Stats[] = [
  { value: "50.000+", label: "Downloads" },
  { value: "4.8", label: "Avaliação" },
  { value: "1.200+", label: "Avaliações" },
];

const features: Feature[] = [
  {
    icon: FiSmartphone,
    title: "App Completo",
    description: "Gerencie seus serviços, agenda e clientes em um só lugar.",
    color: "orange",
    benefits: [
      "Agendamento integrado",
      "Gestão de clientes",
      "Controle financeiro",
    ],
  },
  {
    icon: FiShield,
    title: "100% Seguro",
    description: "Pagamentos seguros e proteção total dos seus dados.",
    color: "green",
    benefits: [
      "Criptografia de dados",
      "Backups automáticos",
      "Conformidade LGPD",
    ],
  },
  {
    icon: FiZap,
    title: "Super Rápido",
    description: "Interface otimizada para a melhor experiência possível.",
    color: "blue",
    benefits: [
      "Carregamento instantâneo",
      "Modo offline",
      "Sincronização automática",
    ],
  },
  {
    icon: FiStar,
    title: "Bem Avaliado",
    description: "4.8 de 5 estrelas na Play Store, mais de 50 mil downloads.",
    color: "yellow",
    benefits: [
      "Suporte premium",
      "Atualizações frequentes",
      "Comunidade ativa",
    ],
  },
];

// Components
const FeatureCard = ({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
  >
    <div
      className={`w-12 h-12 bg-${feature.color}-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-4`}
    >
      <feature.icon className={`w-6 h-6 text-${feature.color}-500`} />
    </div>
    <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
      {feature.description}
    </p>
    <ul className="space-y-2">
      {feature.benefits.map((item) => (
        <li key={item} className="flex items-center text-sm text-gray-500">
          <FiCheck className={`w-5 h-5 text-${feature.color}-500 mr-2`} />
          {item}
        </li>
      ))}
    </ul>
  </motion.div>
);

const QRCodeSection = ({ onDownload }: { onDownload: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center space-y-4"
  >
    <div className="bg-[#1a2335]/80 backdrop-blur-sm p-4 rounded-xl shadow-lg w-[200px] sm:w-[240px]">
      <div className="relative w-full aspect-square">
        <Image
          src="/qrcode.png"
          alt="QR Code para download do app TroK!"
          fill
          className="rounded-lg object-contain"
          priority
          sizes="(max-width: 640px) 200px, 240px"
        />
      </div>
    </div>

    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onDownload}
      className="flex items-center gap-2 px-6 py-3 text-orange-500 hover:text-orange-600 transition-colors font-medium text-lg"
    >
      <FiDownload className="w-5 h-5" />
      <span>Baixar Aplicativo</span>
    </motion.button>

    <p className="text-sm text-gray-400 text-center max-w-xs">
      Escaneie o QR Code ou clique no botão acima para baixar o aplicativo
    </p>
  </motion.div>
);

export default function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDownload = useCallback(async () => {
    try {
      window.location.href = APP_DOWNLOAD_URL;
      toast.success("Redirecionando para download...", {
        description: "Você será redirecionado para a Play Store",
      });
    } catch (error) {
      toast.error("Erro ao iniciar o download", {
        description:
          "Por favor, tente novamente ou acesse diretamente a Play Store",
      });
      console.error(error);
    }
  }, []);

  const handleLogin = useCallback(() => {
    window.location.href = `${APP_URL}/login`;
  }, []);

  const handleRegister = useCallback(() => {
    window.location.href = `${APP_URL}/cadastro`;
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#111827] text-gray-900 dark:text-white overflow-x-hidden">
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />

      <main className="flex flex-col min-h-[calc(100vh-80px)] pt-20">
        {/* Hero Section */}
        <section className="flex-1 flex flex-col justify-start w-full">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 pt-8 md:pt-16 lg:pt-24">
            <div className="flex flex-col items-center">
              {/* Título e Subtítulo */}
              <div className="text-center mb-8 sm:mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold px-4">
                    Seu Negócio na{" "}
                    <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent whitespace-nowrap">
                      Palma da Mão
                    </span>
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-xl mx-auto px-4">
                    Gerencie serviços, clientes e pagamentos de forma simples e
                    profissional com o TroK.
                  </p>
                </motion.div>
              </div>

              {/* Mascote */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="w-full flex justify-center items-center my-8 sm:my-12"
              >
                <div className="relative w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px]">
                  <Image
                    src="/Trokinho.png"
                    alt="Mascote TroK!"
                    fill
                    priority
                    className="object-contain"
                    sizes="(max-width: 640px) 200px, (max-width: 768px) 300px, 400px"
                    loader={({ src }) => src} // adicione esta linha
                    unoptimized // e esta
                  />
                </div>
              </motion.div>

              {/* Stats */}
              <div className="w-full max-w-3xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-[#1a2335]/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8"
                >
                  <div className="grid grid-cols-3 gap-4 sm:gap-8">
                    {stats.map((stat) => (
                      <div key={stat.label} className="text-center">
                        <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-500">
                          {stat.value}
                        </p>
                        <p className="text-sm sm:text-base text-gray-400 mt-1">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* QR Code */}
              <div className="mt-12 sm:mt-16">
                <QRCodeSection onDownload={handleDownload} />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full bg-gray-50 dark:bg-gray-800 mt-16 sm:mt-24 py-16">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {features.map((feature, index) => (
                <FeatureCard
                  key={feature.title}
                  feature={feature}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
