"use client";

import React, { useEffect, useState } from "react";

interface Registro {
  id_estacionamento_rotativo: number;
  descricao_estacionamento_rotativo: string;
  valor_estacionamento_rotativo: number;
}

export function TabelaValorRotativo() {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [editando, setEditando] = useState<number | null>(null);
  const [valoresEditados, setValoresEditados] = useState<Partial<Registro>>({});

  const fetchRegistros = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/valoresRotativo",
        { cache: "reload" },
      );
      const data = await response.json();
      setRegistros(data);
    } catch (error) {
      console.error("Erro ao buscar registros:", error);
    }
  };

  useEffect(() => {
    fetchRegistros();
  }, []);

  const iniciarEdicao = (registro: Registro) => {
    setEditando(registro.id_estacionamento_rotativo);
    setValoresEditados({
      valor_estacionamento_rotativo: registro.valor_estacionamento_rotativo,
    });
  };

  const cancelarEdicao = () => {
    setEditando(null);
    setValoresEditados({});
  };

  const salvarEdicao = async (id_estacionamento_rotativo: number) => {
    const novoRegistro = { id_estacionamento_rotativo, ...valoresEditados };
    try {
      const response = await fetch(
        "http://localhost:3000/api/valoresRotativo",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(novoRegistro),
        },
      );
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
      <h2 style={styles.title}>Rotativo</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.headerCell}>Descrição</th>
            <th style={styles.headerCell}>Valor</th>
            <th style={styles.headerCell}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(registros) && registros.length > 0 ? (
            registros.map((registro) => (
              <tr
                key={registro.id_estacionamento_rotativo}
                style={
                  editando === registro.id_estacionamento_rotativo
                    ? styles.editRow
                    : {}
                }
              >
                {/* Exibe a descrição como um texto não editável */}
                <td style={styles.cell}>
                  {registro.descricao_estacionamento_rotativo}
                </td>

                {/* Campo de valor editável */}
                <td style={styles.cell}>
                  {editando === registro.id_estacionamento_rotativo ? (
                    <input
                      type="text"
                      name="valor_estacionamento_rotativo"
                      value={
                        valoresEditados.valor_estacionamento_rotativo || ""
                      }
                      onChange={handleInputChange}
                      style={styles.input}
                    />
                  ) : (
                    registro.valor_estacionamento_rotativo
                  )}
                </td>

                <td style={styles.cell}>
                  {editando === registro.id_estacionamento_rotativo ? (
                    <>
                      <button
                        onClick={() =>
                          salvarEdicao(registro.id_estacionamento_rotativo)
                        }
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
                    <button
                      onClick={() => iniciarEdicao(registro)}
                      style={styles.editButton}
                    >
                      Editar
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} style={styles.cell}>
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
  editRow: {
    backgroundColor: "#e0f7fa",
  },
  input: {
    width: "100%",
    padding: "5px",
    borderRadius: "4px",
    border: "1px solid #ddd",
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
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
  },
};
