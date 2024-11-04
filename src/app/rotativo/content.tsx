"use client";

import React, { useState } from "react";
import { TabelaRegistros } from "./conponents/listarRegistros"; // Corrija o caminho para o seu componente de tabela, se necessário

// Formulário para Registro de Entrada e Saída
export default function RegistroEntradaSaidaForm() {
  const [placa_rotativo, setPlaca] = useState("");
  const [modelo_rotativo, setModelo] = useState("");
  const [hora_entrada_rotativo, setHoraEntrada] = useState("");
  const [cor_rotativo, setCor] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3000/api/estacionamentoRotativo",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            placa_rotativo: placa_rotativo,
            modelo_rotativo: modelo_rotativo,
            cor_rotativo: cor_rotativo,
            hora_entrada_rotativo: hora_entrada_rotativo,
          }),
        },
      );

      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        setPlaca("");
        setModelo("");
        setHoraEntrada("");
      } else {
        alert("Erro ao realizar o cadastro. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
      alert("Erro ao realizar o cadastro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Registrar de Entrada de Veículos</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Placa"
          style={styles.input}
          value={placa_rotativo}
          onChange={(e) => setPlaca(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Modelo"
          style={styles.input}
          value={modelo_rotativo}
          onChange={(e) => setModelo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Cor"
          style={styles.input}
          value={cor_rotativo}
          onChange={(e) => setCor(e.target.value)}
          required
        />
        <input
          type="datetime-local"
          placeholder="Data/Hora Entrada"
          style={styles.input}
          value={hora_entrada_rotativo}
          onChange={(e) => setHoraEntrada(e.target.value)}
          required
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}

// Componente para exibir a Tabela de Veículos
function VehicleTable() {
  return (
    <div style={styles.containerRegistro}>
      <TabelaRegistros />
    </div>
  );
}

// Estilos do componente
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "80vh",
    width: "90%",
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
  containerRegistro: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "80vh",
    width: "90%",
    padding: "20px",
    backgroundColor: "#E0EBF5",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
};

// Exportando os componentes
export { RegistroEntradaSaidaForm, VehicleTable };
