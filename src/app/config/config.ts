const baseApiUrl =
  process.env.NEXT_PUBLIC_ENV === "production"
    ? "https://estacionamento-rho.vercel.app"
    : "http://localhost:3000/api";

export const apiUrls = {
  veiculos: `${baseApiUrl}/veiculos`,
  modelos: `${baseApiUrl}/modelo`,
  tipoVeiculo: `${baseApiUrl}/tipoVeiculo`,

  // Adicione outros endpoints conforme necessário
};
