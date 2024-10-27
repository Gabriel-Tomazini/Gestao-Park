"use client";

import React, { useEffect, useState } from "react";

interface Registro {
  pessoa_id: number;
  veiculo_id: number;
  placa: string;
  modelo: string;
  nome: string;
  data_entrada: string;
  data_saida: string | null;
}

// Função para formatar data e hora
const formatDateTime = (dateTime: string | null) => {
  if (!dateTime) return "Ainda no estacionamento";
  const date = new Date(dateTime);
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
};

export function TabelaRegistros() {
  const [registros, setRegistros] = useState<Registro[]>([]);

  const fetchRegistros = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/listaRegistro");
      const data = await response.json();
      console.log("Dados recebidos:", data);

      if (Array.isArray(data)) {
        setRegistros(data);
      } else {
        console.error("Os dados recebidos não são um array:", data);
        setRegistros([]);
      }
    } catch (error) {
      console.error("Erro ao buscar registros:", error);
      setRegistros([]);
    }
  };

  useEffect(() => {
    fetchRegistros();
  }, []);

  return (
    <div style={styles.tableContainer}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.headerCell}>Placa</th>
            <th style={styles.headerCell}>Modelo</th>
            <th style={styles.headerCell}>Dono</th>
            <th style={styles.headerCell}>Entrada</th>
            <th style={styles.headerCell}>Saída</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(registros) && registros.length > 0 ? (
            registros.map((registro) => (
              <tr key={registro.veiculo_id}>
                <td style={styles.cell}>{registro.placa}</td>
                <td style={styles.cell}>{registro.modelo}</td>
                <td style={styles.cell}>{registro.nome}</td>
                <td style={styles.cell}>
                  {formatDateTime(registro.data_entrada)}
                </td>
                <td style={styles.cell}>
                  {formatDateTime(registro.data_saida)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td style={styles.cell} colSpan={5}>
                Nenhum registro encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  tableContainer: {
    width: "100%",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#F5F9FD",
  },
  headerCell: {
    padding: "10px 15px",
    fontWeight: "bold",
    borderBottom: "1px solid #ddd",
    textAlign: "left",
  },
  cell: {
    padding: "10px 15px",
    borderBottom: "1px solid #ddd",
    textAlign: "left",
  },
};
