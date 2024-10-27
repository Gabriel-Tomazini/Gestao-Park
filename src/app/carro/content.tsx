import React from "react";

export default function VeiculoForm() {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Cadastro de Veículo</h2>
      <form style={styles.form}>
        <input
          type="text"
          placeholder="Modelo do Veículo"
          style={styles.input}
        />
        <input type="text" placeholder="Placa" style={styles.input} />
        <input type="text" placeholder="Cor" style={styles.input} />
        <div style={styles.inlineInputs}>
          <input type="text" placeholder="Código" style={styles.smallInput} />
          <input type="text" placeholder="Dono" style={styles.largeInput} />
        </div>
        <button type="submit" style={styles.button}>
          Cadastrar
        </button>
      </form>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "60vh",
    padding: "20px",
    backgroundColor: "#E0EBF5",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "400px",
    gap: "15px",
  },
  input: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    width: "100%",
    boxSizing: "border-box",
  },
  inlineInputs: {
    display: "flex",
    gap: "10px",
  },
  smallInput: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    width: "30%", // Reduzido para ocupar menos espaço
    boxSizing: "border-box",
  },
  largeInput: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    width: "70%", // Aumentado para ocupar mais espaço
    boxSizing: "border-box",
  },
  button: {
    padding: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#4A90E2",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#357ABD",
  },
};
