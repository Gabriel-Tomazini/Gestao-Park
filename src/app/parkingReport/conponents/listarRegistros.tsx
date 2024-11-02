"use client";

import React, { useEffect, useState } from "react";

interface Registro {
  id: number;
  veiculo_id: number;
  placa: string;
  modelo: string;
  nome: string;
  telefone: string;
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
  const [editando, setEditando] = useState<number | null>(null);
  const [valoresEditados, setValoresEditados] = useState<Partial<Registro>>({});

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

  const formatarTelefone = (telefone: string) => {
    const apenasNumeros = telefone.replace(/\D/g, "");
    return apenasNumeros.replace(
      /(\d{2})(\d{1})(\d{4})(\d{4})/,
      "($1) $2 $3-$4",
    );
  };

  const iniciarEdicao = (registro: Registro) => {
    setEditando(registro.id);
    setValoresEditados({
      data_saida: registro.data_saida,
    });
  };

  const cancelarEdicao = () => {
    setEditando(null);
    setValoresEditados({});
  };

  const salvarEdicao = async (id: number) => {
    const novoRegistro = {
      registro_id: id,
      placa: valoresEditados.placa || "",
      data_saida: valoresEditados.data_saida || "",
    };

    console.log("Enviando dados para atualização:", novoRegistro);

    try {
      const response = await fetch("http://localhost:3000/api/listaRegistro", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoRegistro),
      });

      if (response.ok) {
        alert("Registro atualizado com sucesso!");
        fetchRegistros(); // Recarrega a lista de registros após o update
      } else {
        alert("Erro ao atualizar o registro.");
      }
    } catch (error) {
      console.error("Erro ao enviar atualização:", error);
      alert("Erro ao atualizar o registro.");
    } finally {
      setEditando(null);
      setValoresEditados({});
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValoresEditados((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div style={styles.tableContainer}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.headerCell}>Placa</th>
            <th style={styles.headerCell}>Modelo</th>
            <th style={styles.headerCell}>Dono</th>
            <th style={styles.headerCell}>Telefone</th>
            <th style={styles.headerCell}>Entrada</th>
            <th style={styles.headerCell}>Saída</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(registros) && registros.length > 0 ? (
            registros.map((registro) => (
              <tr key={registro.id}>
                <td style={styles.cell}>{registro.placa.toUpperCase()}</td>
                <td style={styles.cell}>{registro.modelo}</td>
                <td style={styles.cell}>{registro.nome}</td>
                <td style={styles.cell}>
                  {formatarTelefone(registro.telefone)}
                </td>
                <td style={styles.cell}>
                  {formatDateTime(registro.data_entrada)}
                </td>
                <td style={styles.cell}>
                  {editando === registro.id ? (
                    <input
                      type="datetime-local"
                      name="data_saida"
                      value={valoresEditados.data_saida || ""}
                      onChange={handleInputChange}
                      style={styles.inputField}
                    />
                  ) : (
                    formatDateTime(registro.data_saida)
                  )}
                </td>

                <td style={styles.cell}>
                  {editando === registro.id ? (
                    <>
                      <button
                        onClick={() => salvarEdicao(registro.id)}
                        style={styles.saveButton}
                      >
                        Salvar
                      </button>
                      <button
                        onClick={cancelarEdicao}
                        style={styles.cancelButton}
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => iniciarEdicao(registro)}
                        style={styles.editButton}
                      >
                        Editar
                      </button>
                    </>
                  )}
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
  editButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "5px 10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "5px",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "5px 10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "5px",
  },
  cancelButton: {
    backgroundColor: "#f44336",
    color: "white",
    padding: "5px 10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "5px",
  },
  inputField: {
    padding: "5px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
};
