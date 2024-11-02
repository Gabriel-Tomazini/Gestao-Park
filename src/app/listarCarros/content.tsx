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
    height: "80vh",
    width: "70%",
    padding: "20px",
    backgroundColor: "#E0EBF5",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
};

export default VehicleTable;
