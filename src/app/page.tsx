// src/app/page.tsx
"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FiDownload,
  FiShield,
  FiZap,
  FiStar,
  FiSmartphone,
  FiCheck,
  FiLogIn,
  FiUserPlus,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { toast } from "sonner";

// Constantes
const URL_DOWNLOAD_APP = "/app_trok.apk";
const URL_APP = "https://app.trok-servicos.com.br";
const IMAGEM_PADRAO = "/trokinho.png";

// Tipos
type Estatistica = { valor: string; rotulo: string };
type Recurso = {
  icone: React.ElementType;
  titulo: string;
  descricao: string;
  cor: string;
  beneficios: string[];
};
const estatisticas: Estatistica[] = [
  { valor: "50.000+", rotulo: "Downloads" },
  { valor: "4.8", rotulo: "Avaliação" },
  { valor: "1.200+", rotulo: "Avaliações" },
];

const recursos: Recurso[] = [
  {
    icone: FiSmartphone,
    titulo: "App Completo",
    descricao: "Gerencie seus serviços, agenda e clientes em um só lugar.",
    cor: "laranja",
    beneficios: [
      "Agendamento integrado",
      "Gestão de clientes",
      "Controle financeiro",
    ],
  },
  {
    icone: FiShield,
    titulo: "100% Seguro",
    descricao: "Pagamentos seguros e proteção total dos seus dados.",
    cor: "verde",
    beneficios: [
      "Criptografia de dados",
      "Backups automáticos",
      "Conformidade LGPD",
    ],
  },
  {
    icone: FiZap,
    titulo: "Super Rápido",
    descricao: "Interface otimizada para a melhor experiência possível.",
    cor: "azul",
    beneficios: [
      "Carregamento instantâneo",
      "Modo offline",
      "Sincronização automática",
    ],
  },
  {
    icone: FiStar,
    titulo: "Bem Avaliado",
    descricao: "4.8 de 5 estrelas na Play Store, mais de 50 mil downloads.",
    cor: "amarelo",
    beneficios: [
      "Suporte premium",
      "Atualizações frequentes",
      "Comunidade ativa",
    ],
  },
]; // Componente do QR Code
function SecaoQRCode() {
  const [erroQR, setErroQR] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center space-y-4"
    >
      <div className="bg-neutral-700/80 backdrop-blur-sm p-4 rounded-xl shadow-lg w-[200px] sm:w-[240px]">
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

      <p className="text-sm text-gray-300 text-center max-w-xs">
        {erroQR
          ? "Use o botão abaixo para baixar o aplicativo"
          : "Escaneie o QR Code para baixar o aplicativo"}
      </p>
    </motion.div>
  );
}

// Componente do Cabeçalho
function Cabecalho() {
  const [menuAberto, setMenuAberto] = useState(false);

  const navegarPara = useCallback((url: string) => {
    try {
      window.location.href = url;
    } catch {
      toast.error("Erro ao navegar", {
        description: "Por favor, tente novamente mais tarde",
      });
    }
  }, []);

  const fazerLogin = () => navegarPara(`${URL_APP}/login`);
  const fazerCadastro = () => navegarPara(`${URL_APP}/cadastro`);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-neutral-800-800 backdrop-blur-sm border-b border-neutral-600">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
            TroK!
          </span>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={fazerLogin}
              className="inline-flex items-center gap-2 px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-medium shadow-lg shadow-orange-500/25 transition-all duration-200"
            >
              <FiLogIn className="w-5 h-5" />
              Entrar
            </button>
            <button
              onClick={fazerCadastro}
              className="inline-flex items-center gap-2 px-8 py-3 border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-full font-medium transition-all duration-200"
            >
              <FiUserPlus className="w-5 h-5" />
              Criar Conta
            </button>
          </div>

          <button
            onClick={() => setMenuAberto(!menuAberto)}
            className="md:hidden p-2 text-white hover:bg-neutral-700 rounded-lg transition-colors"
          >
            {menuAberto ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>

        {menuAberto && (
          <div className="md:hidden mt-6 pb-6 space-y-4 animate-in slide-in-from-top">
            <button
              onClick={fazerLogin}
              className="flex w-full items-center justify-center gap-2 px-8 py-3.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-medium shadow-lg shadow-orange-500/25 transition-all duration-200"
            >
              <FiLogIn className="w-5 h-5" />
              Entrar
            </button>
            <button
              onClick={fazerCadastro}
              className="flex w-full items-center justify-center gap-2 px-8 py-3.5 border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-full font-medium transition-all duration-200"
            >
              <FiUserPlus className="w-5 h-5" />
              Criar Conta
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}

// Componente do Cartão de Recurso
function CartaoRecurso({
  feature: recurso,
  index,
}: {
  feature: Recurso;
  index: number;
}) {
  const coresFundo = {
    laranja: "bg-neutral-800",
    verde: "bg-gray-800",
    azul: "bg-gray-800",
    amarelo: "bg-gray-800",
  };

  const coresIcone = {
    laranja: "text-orange-500",
    verde: "text-green-500",
    azul: "text-blue-500",
    amarelo: "text-yellow-500",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-neutral-700 p-6 rounded-xl hover:bg-neutral-700 transition-all duration-300"
    >
      <div
        className={`w-12 h-12 ${
          coresFundo[recurso.cor as keyof typeof coresFundo]
        } rounded-lg flex items-center justify-center mb-4`}
      >
        <recurso.icone
          className={`w-6 h-6 ${
            coresIcone[recurso.cor as keyof typeof coresIcone]
          }`}
        />
      </div>
      <h3 className="text-lg font-semibold mb-3 text-white">
        {recurso.titulo}
      </h3>
      <p className="text-gray-300 mb-4 text-sm">{recurso.descricao}</p>
      <ul className="space-y-2">
        {recurso.beneficios.map((beneficio) => (
          <li
            key={beneficio}
            className="flex items-center text-sm text-gray-300"
          >
            <FiCheck
              className={`w-5 h-5 ${
                coresIcone[recurso.cor as keyof typeof coresIcone]
              } mr-2 opacity-50`}
            />
            {beneficio}
          </li>
        ))}
      </ul>
    </motion.div>
  );
} // Componente Principal da Página
export default function PaginaInicial() {
  const [imagemSrc, setImagemSrc] = useState("/trokinho.png");

  const iniciarDownload = useCallback(async () => {
    try {
      const novaJanela = window.open(URL_DOWNLOAD_APP, "_blank");
      if (novaJanela) {
        toast.success("Redirecionando para download...", {
          description: "Você será redirecionado para a Play Store",
        });
      } else {
        throw new Error("Popup bloqueado");
      }
    } catch {
      toast.error("Erro ao iniciar o download", {
        description:
          "Por favor, tente novamente ou acesse diretamente a Play Store",
      });
    }
  }, []);

  return (
    // Cor principal de fundo aqui ↓
    <div className="min-h-screen bg-neutral-800 text-white overflow-x-hidden">
      <Cabecalho />

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
                  <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-xl mx-auto px-4">
                    Gerencie serviços, clientes e pagamentos de forma simples e
                    profissional com o TroK.
                  </p>
                </motion.div>
              </div>
              {/* Imagem do Mascote */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="w-full flex justify-center items-center my-8 sm:my-12"
              >
                <div className="relative w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px]">
                  <Image
                    src={imagemSrc}
                    alt="Mascote TroK!"
                    fill
                    priority
                    className="object-contain"
                    sizes="(max-width: 640px) 200px, (max-width: 768px) 300px, 400px"
                    onError={() => setImagemSrc(IMAGEM_PADRAO)}
                  />
                </div>
              </motion.div>

              {/* Estatísticas */}
              <div className="w-full max-w-3xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-neutral-700 backdrop-blur-sm rounded-2xl p-6 sm:p-8"
                >
                  <div className="grid grid-cols-3 gap-4 sm:gap-8">
                    {estatisticas.map((estatistica) => (
                      <div key={estatistica.rotulo} className="text-center">
                        <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-500">
                          {estatistica.valor}
                        </p>
                        <p className="text-sm sm:text-base text-gray-300 mt-1">
                          {estatistica.rotulo}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* QR Code e Botão Download */}
              <div className="mt-12 sm:mt-16 flex flex-col items-center gap-8">
                <SecaoQRCode />

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={iniciarDownload}
                  className="flex items-center gap-2 px-6 py-3 text-orange-500 hover:text-orange-600 transition-colors font-medium text-lg"
                >
                  <FiDownload className="w-5 h-5" />
                  <span>Baixar Aplicativo</span>
                </motion.button>
              </div>
            </div>
          </div>
        </section>
        {/* Seção de Recursos */}
        {/* Segunda cor de fundo principal aqui ↓ */}
        <section className="w-full bg-neutral-800 mt-16 sm:mt-24 py-16">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {recursos.map((recurso, index) => (
                <CartaoRecurso
                  key={recurso.titulo}
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
