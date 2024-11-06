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
import { Header } from "@/components/layout/Header";
import { toast } from "sonner";

// Configurações
const APP_DOWNLOAD_URL =
  process.env.NEXT_PUBLIC_APP_DOWNLOAD_URL ||
  "https://download938.mediafire.com/fskd0uy8kfjgxCrFoYTgRRvvWGXGCYt4L1IJP8u5h9jVE9RtMZ3xBxsOJuF3AYz1r42zTYACv_LmrIsUxklS_fItpKdIewp9t5IMz9PxZkgUwadeAGmDCpI5AFIa6ebkuI2VE5k7YM-ziugMiuPXLpTEDRJEcnatbgcBPRglP_LbZ0E/fpcwzteqta0gyrw/TroK%21.apk";

const APP_URL = "https://app.trok-servicos.com.br";

// Stats
const stats = [
  { value: "50.000+", label: "Downloads" },
  { value: "4.8", label: "Avaliação" },
  { value: "1.200+", label: "Avaliações" },
] as const;

// Features
const features = [
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
] as const;

// Componente Feature Card
const FeatureCard = ({
  feature,
  index,
}: {
  feature: (typeof features)[number];
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
  >
    <div
      className={`w-12 h-12 bg-${feature.color}-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-4`}
    >
      <feature.icon className={`w-6 h-6 text-${feature.color}-500`} />
    </div>
    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
    <p className="text-gray-600 dark:text-gray-300 mb-4">
      {feature.description}
    </p>
    <ul className="space-y-2">
      {feature.benefits.map((item) => (
        <li key={item} className="flex items-center text-gray-500">
          <FiCheck className={`w-5 h-5 text-${feature.color}-500 mr-2`} />
          {item}
        </li>
      ))}
    </ul>
  </motion.div>
);

// Componente QR Code
const QRCodeSection = ({ onDownload }: { onDownload: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="mt-12 flex flex-col items-center space-y-6"
  >
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
      <div className="relative w-48 h-48">
        <Image
          src="/qrcode.png"
          alt="QR Code para download do app TroK!"
          fill
          className="rounded-lg object-contain"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </div>

    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onDownload}
      className="flex items-center gap-2 px-6 py-2.5 text-orange-500 hover:text-orange-600 transition-colors font-medium"
    >
      <FiDownload className="w-5 h-5" />
      <span>Baixar Aplicativo</span>
    </motion.button>

    <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs text-center">
      Escaneie o QR Code ou clique no botão acima para baixar o aplicativo
    </p>
  </motion.div>
);

// Componente Stats
const StatsSection = () => (
  <div className="grid grid-cols-3 gap-8 py-8 max-w-3xl mx-auto">
    {stats.map((stat, index) => (
      <motion.div
        key={stat.label}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <p className="text-3xl font-bold text-orange-500">{stat.value}</p>
        <p className="text-sm text-gray-500">{stat.label}</p>
      </motion.div>
    ))}
  </div>
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
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="py-16 md:py-24 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Seu Negócio na{" "}
              <span className="text-orange-500">Palma da Mão</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Gerencie serviços, clientes e pagamentos de forma simples e
              profissional com o TroK.
            </p>

            {/* Stats Section */}
            <StatsSection />

            {/* QR Code Section */}
            <QRCodeSection onDownload={handleDownload} />
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
