"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FiDownload,
  FiShield,
  FiZap,
  FiStar,
  FiSmartphone,
  FiCheck,
} from "react-icons/fi";
import { toast } from "sonner";
import { Header } from "@/components/layout/Header";

// Tipos
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

// Constantes
const APP_DOWNLOAD_URL = "/app_trok.apk";

const APP_URL = "https://app.trok-servicos.com.br";

// Imagem de fallback
const IMAGEM_FALLBACK = "/placeholder-mascot.png";

// Dados estáticos
const estatisticas: Stats[] = [
  { value: "50.000+", label: "Downloads" },
  { value: "4.8", label: "Avaliação" },
  { value: "1.200+", label: "Avaliações" },
];

const recursos: Feature[] = [
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

// Componentes
const CartaoRecurso = ({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}) => {
  // Classes de cores seguras
  const classesCoresFundo = {
    orange: "bg-orange-100 dark:bg-gray-800",
    green: "bg-green-100 dark:bg-gray-800",
    blue: "bg-blue-100 dark:bg-gray-800",
    yellow: "bg-yellow-100 dark:bg-gray-800",
  };

  const classesTextosCores = {
    orange: "text-orange-500",
    green: "text-green-500",
    blue: "text-blue-500",
    yellow: "text-yellow-500",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div
        className={`w-12 h-12 ${
          classesCoresFundo[feature.color as keyof typeof classesCoresFundo]
        } rounded-lg flex items-center justify-center mb-4`}
      >
        <feature.icon
          className={`w-6 h-6 ${
            classesTextosCores[feature.color as keyof typeof classesTextosCores]
          }`}
        />
      </div>
      <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
        {feature.description}
      </p>
      <ul className="space-y-2">
        {feature.benefits.map((item) => (
          <li key={item} className="flex items-center text-sm text-gray-500">
            <FiCheck
              className={`w-5 h-5 ${
                classesTextosCores[
                  feature.color as keyof typeof classesTextosCores
                ]
              } mr-2`}
            />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

const ImagemMascote = () => {
  const [imgSrc, setImgSrc] = useState("/trokinho.png");
  const [erro, setErro] = useState(false);

  return (
    <div className="relative w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px]">
      <Image
        src={imgSrc}
        alt="Mascote TroK!"
        fill
        priority
        className="object-contain"
        sizes="(max-width: 640px) 200px, (max-width: 768px) 300px, 400px"
        onError={() => {
          if (!erro) {
            setImgSrc(IMAGEM_FALLBACK);
            setErro(true);
          }
        }}
      />
    </div>
  );
};
const SecaoQRCode = ({ onDownload }: { onDownload: () => void }) => {
  const [erroQR, setErroQR] = useState(false);

  return (
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
            onError={() => setErroQR(true)}
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
        {erroQR
          ? "Clique no botão acima para baixar o aplicativo"
          : "Escaneie o QR Code ou clique no botão acima para baixar o aplicativo"}
      </p>
    </motion.div>
  );
};

export default function PaginaInicial() {
  const [menuMobileAberto, setMenuMobileAberto] = useState(false);
  const [montado, setMontado] = useState(false);

  useEffect(() => {
    setMontado(true);
  }, []);

  const handleDownload = useCallback(async () => {
    try {
      const novaJanela = window.open(APP_DOWNLOAD_URL, "_blank");
      if (novaJanela) {
        toast.success("Redirecionando para download...", {
          description: "Você será redirecionado para a Play Store",
        });
      } else {
        throw new Error("Popup bloqueado");
      }
    } catch (erro) {
      toast.error("Erro ao iniciar o download", {
        description:
          "Por favor, tente novamente ou acesse diretamente a Play Store",
      });
      console.error("Erro no download:", erro);
    }
  }, []);

  const handleNavegacao = useCallback((url: string) => {
    try {
      window.location.href = url;
    } catch (erro) {
      console.error("Erro na navegação:", erro);
      toast.error("Erro ao navegar", {
        description: "Por favor, tente novamente mais tarde",
      });
    }
  }, []);

  const handleLogin = useCallback(() => {
    handleNavegacao(`${APP_URL}/login`);
  }, [handleNavegacao]);

  const handleCadastro = useCallback(() => {
    handleNavegacao(`${APP_URL}/cadastro`);
  }, [handleNavegacao]);

  if (!montado) return null;

  return (
    <div className="min-h-screen bg-[#111827] text-gray-900 dark:text-white overflow-x-hidden">
      <Header
        isMobileMenuOpen={menuMobileAberto}
        setIsMobileMenuOpen={setMenuMobileAberto}
        onLogin={handleLogin}
        onRegister={handleCadastro}
      />

      <main className="flex flex-col min-h-[calc(100vh-80px)] pt-20">
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
                <ImagemMascote />
              </motion.div>

              {/* Estatísticas */}
              <div className="w-full max-w-3xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-[#1a2335]/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8"
                >
                  <div className="grid grid-cols-3 gap-4 sm:gap-8">
                    {estatisticas.map((stat) => (
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
                <SecaoQRCode onDownload={handleDownload} />
              </div>
            </div>
          </div>
        </section>

        {/* Seção de Recursos */}
        <section className="w-full bg-gray-50 dark:bg-gray-800 mt-16 sm:mt-24 py-16">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {recursos.map((recurso, index) => (
                <CartaoRecurso
                  key={recurso.title}
                  feature={recurso}
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
