const baseApiUrl =
  process.env.NODE_ENV === "production"
    ? "https://estacionamento-rho.vercel.app/api" // Adicione o "https://" para garantir que a URL esteja completa
    : "http://localhost:3000/api";

export const apiUrls = {
  veiculos: `${baseApiUrl}/veiculos`,
  modelos: `${baseApiUrl}/modelo`,
  tipoVeiculo: `${baseApiUrl}/tipoVeiculo`,

  // Adicione outros endpoints conforme necessário
};
