"use client";

import React, { useEffect, useState } from "react";

interface Registro {
  id_tipovalores: number;
  descricao: string;
  valor: number;
}

export function TabelaRegistros() {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [editando, setEditando] = useState<number | null>(null);
  const [valoresEditados, setValoresEditados] = useState<Partial<Registro>>({});

  const fetchRegistros = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/tipoValores");
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
    setEditando(registro.id_tipovalores);
    setValoresEditados({
      descricao: registro.descricao,
      valor: registro.valor,
    });
  };

  const cancelarEdicao = () => {
    setEditando(null);
    setValoresEditados({});
  };

  const salvarEdicao = async (id_tipovalores: number) => {
    const novoRegistro = {
      id_tipovalores: id_tipovalores,
      ...valoresEditados,
    };

    try {
      console.log("TO aqui caralho", JSON.stringify(novoRegistro));
      const response = await fetch("http://localhost:3000/api/tipoValores", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novoRegistro),
      });

      if (response.ok) {
        alert("Registro atualizado com sucesso!");
        fetchRegistros(); // Recarrega a lista de registros após o update
        console.log("Cheguei");
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

  const excluirRegistro = async (id_tipovalores: number) => {
    try {
      const response = await fetch("http://localhost:3000/api/tipoValores", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_tipovalores }),
      });

      if (response.ok) {
        alert("Registro excluído com sucesso!");
        fetchRegistros(); // Recarregar a lista de registros
      } else {
        console.error("Erro ao excluir registro:", await response.json());
      }
    } catch (error) {
      console.error("Erro ao excluir registro:", error);
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
            <th style={styles.headerCell}>Descrição</th>
            <th style={styles.headerCell}>Valor</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(registros) && registros.length > 0 ? (
            registros.map((registro) => (
              <tr
                key={registro.id_tipovalores}
                style={
                  editando === registro.id_tipovalores ? styles.editRow : {}
                }
              >
                <td style={styles.cell}>
                  {editando === registro.id_tipovalores ? (
                    <input
                      type="text"
                      name="nome"
                      value={valoresEditados.descricao || ""}
                      onChange={handleInputChange}
                      style={styles.input}
                    />
                  ) : (
                    registro.descricao
                  )}
                </td>
                <td style={styles.cell}>
                  {editando === registro.id_tipovalores ? (
                    <input
                      type="text"
                      name="cpf"
                      value={valoresEditados.valor || ""}
                      onChange={handleInputChange}
                      style={styles.input}
                    />
                  ) : (
                    registro.valor
                  )}
                </td>
                <td style={styles.cell}>
                  {editando === registro.id_tipovalores ? (
                    <>
                      <button
                        onClick={() => salvarEdicao(registro.id_tipovalores)}
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
                      <button
                        onClick={() => excluirRegistro(registro.id_tipovalores)}
                        style={styles.deleteButton}
                      >
                        Excluir
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr></tr>
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
  deleteButton: {
    backgroundColor: "#f44336",
    color: "white",
    padding: "5px 10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
