const baseApiUrl =
  process.env.NODE_ENV === "production"
    ? "estacionamento-rho.vercel.app/api"
    : "http://localhost:3000/api";

export const apiUrls = {
  veiculos: `${baseApiUrl}/veiculos`,
  modelos: `${baseApiUrl}/modelo`,
  tipoVeiculo: `${baseApiUrl}/tipoVeiculo`,

  // Adicione outros endpoints conforme necessário
};
