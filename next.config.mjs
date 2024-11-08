/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [], // para domínios externos se necessário
    unoptimized: true, // isso pode ajudar com o erro 400
  },
};

export default nextConfig;
