"use client";

import React from "react";
import { useEffect, useState } from "react";

export default function RegistroEntradaSaidaForm() {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Registrar de Entrada de Veículos</h2>
      <form style={styles.form}>
        <input type="text" placeholder="Placa" style={styles.input} />
        <input type="text" placeholder="Modelo" style={styles.input} />
        <input type="text" placeholder="Dono" style={styles.input} />
        <input
          type="datetime-local"
          placeholder="Data/Hora Entrada"
          style={styles.input}
        />
        <input
          type="datetime-local"
          placeholder="Data/Hora Saída"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Registrar
        </button>
      </form>
    </div>
  );
}

interface Registro {
  pessoa_id: number; // Adicione este campo se estiver usando na tabela
  veiculo_id: number; // Adicione este campo se estiver usando na tabela
  placa: string;
  modelo: string;
  nome: string; // Nome do Dono
  data_entrada: string;
  data_saida: string | null;
}

export function TabelaRegistros() {
  const [registros, setRegistros] = useState<Registro[]>([]);

  // Função para buscar os registros do banco via API
  const fetchRegistros = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/carro");
      const data = await response.json();

      console.log("Dados recebidos:", data); // Verifique a resposta da API

      // Verifique se data é um array
      if (Array.isArray(data)) {
        setRegistros(data);
      } else {
        console.error("Os dados recebidos não são um array:", data);
        setRegistros([]); // Define como array vazio se não for um array
      }
    } catch (error) {
      console.error("Erro ao buscar registros:", error);
      setRegistros([]); // Define como array vazio em caso de erro
    }
  };

  useEffect(() => {
    fetchRegistros();
  }, []);

  return (
    <div className="table-container">
      <table className="registro-tabela">
        <thead>
          <tr>
            <th>Placa</th>
            <th>Modelo</th>
            <th>Dono</th>
            <th>Entrada</th>
            <th>Saída</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(registros) && registros.length > 0 ? (
            registros.map((registro) => (
              <tr key={registro.veiculo_id}>
                {" "}
                {/* Mudei para usar veiculo_id como chave */}
                <td>{registro.placa}</td>
                <td>{registro.modelo}</td>
                <td>{registro.nome}</td>
                <td>{registro.data_entrada}</td>
                <td>{registro.data_saida || "Ainda no estacionamento"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>Nenhum registro encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "80vh",
    width: "70vh",
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
  buttonHover: {
    backgroundColor: "#357ABD",
  },
};
