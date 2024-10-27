"use client";

import React, { useEffect, useState } from "react";

interface Registro {
  pessoa_id: number;
  veiculo_id: number;
  placa: string;
  modelo: string;
  nome: string;
  cor: string;
  telefone: string;
}

export function TabelaRegistros() {
  const [registros, setRegistros] = useState<Registro[]>([]);

  const fetchRegistros = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/listaCarros");
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

  // Função para formatar o telefone
  const formatarTelefone = (telefone: string) => {
    // Remove caracteres não numéricos
    const apenasNumeros = telefone.replace(/\D/g, "");

    // Aplica o formato "(47) 9 9999-9999"
    return apenasNumeros.replace(
      /(\d{2})(\d{1})(\d{4})(\d{4})/,
      "($1) $2 $3-$4",
    );
  };

  return (
    <div style={styles.tableContainer}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.headerCell}>Placa</th>
            <th style={styles.headerCell}>Modelo</th>
            <th style={styles.headerCell}>Cor</th>
            <th style={styles.headerCell}>Dono</th>
            <th style={styles.headerCell}>Telefone</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(registros) && registros.length > 0 ? (
            registros.map((registro) => (
              <tr key={registro.veiculo_id}>
                <td style={styles.cell}>{registro.placa}</td>
                <td style={styles.cell}>{registro.modelo}</td>
                <td style={styles.cell}>{registro.cor}</td>
                <td style={styles.cell}>{registro.nome}</td>
                <td style={styles.cell}>
                  {formatarTelefone(registro.telefone)}
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
