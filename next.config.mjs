/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/clientes", // Caminho customizado que o usuário verá
        destination: "/home/cliente", // Caminho real da página no sistema de arquivos
      },
    ];
  },
};

export default nextConfig;
