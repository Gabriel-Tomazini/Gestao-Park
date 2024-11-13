import React from "react";
import { CSSProperties } from "react";
import { TabelaRegistros } from "./conponents/listarVeiculo"; // Verifique o caminho correto

const VehicleTable: React.FC = () => {
  return (
    <div style={styles.container}>
      <TabelaRegistros />
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "80vh", // Ajusta a altura do contêiner para 80% da altura da tela
    width: "70%", // Define a largura do contêiner
    padding: "20px",
    backgroundColor: "#E0EBF5",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxHeight: "60vh", // Definindo altura máxima do contêiner para a tabela
    overflowY: "auto", // Ativa a rolagem vertical caso o conteúdo ultrapasse a altura máxima
  },
};

export default VehicleTable;
