"use client";

import React, { useEffect, useState } from "react";
import { apiUrls } from "../../config/config";

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
  const [editando, setEditando] = useState<number | null>(null);
  const [valoresEditados, setValoresEditados] = useState<Partial<Registro>>({});

  const fetchRegistros = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/listaCarros");
      const data = await response.json();
      setRegistros(data);
    } catch (error) {
      console.error("Erro ao buscar registros:", error);
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
    setEditando(registro.veiculo_id);
    setValoresEditados({
      placa: registro.placa,
      modelo: registro.modelo,
      cor: registro.cor,
    });
  };

  const cancelarEdicao = () => {
    setEditando(null);
    setValoresEditados({});
  };

  const salvarEdicao = async (id: number) => {
    const novoRegistro = {
      veiculo_id: id,
      placa: valoresEditados.placa || "",
      modelo: valoresEditados.modelo || "",
      cor: valoresEditados.cor || "",
    };

    try {
      const response = await fetch("http://localhost:3000/api/listaCarros", {
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

  const excluirRegistro = async (veiculo_id: number) => {
    try {
      const response = await fetch(apiUrls.veiculos, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ veiculo_id }),
      });

      if (response.ok) {
        alert("Registro excluído com sucesso!");
        // Recarregar a lista de registros
        fetchRegistros();
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
            <th style={styles.headerCell}>Placa</th>
            <th style={styles.headerCell}>Modelo</th>
            <th style={styles.headerCell}>Cor</th>
            <th style={styles.headerCell}>Dono</th>
            <th style={styles.headerCell}>Telefone</th>
            <th style={styles.headerCell}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(registros) && registros.length > 0 ? (
            registros.map((registro) => (
              <tr
                key={registro.veiculo_id}
                style={editando === registro.veiculo_id ? styles.editRow : {}}
              >
                <td style={styles.cell}>
                  {editando === registro.veiculo_id ? (
                    <input
                      type="text"
                      name="placa"
                      value={valoresEditados.placa || ""}
                      onChange={handleInputChange}
                      style={styles.input}
                    />
                  ) : (
                    registro.placa.toUpperCase()
                  )}
                </td>
                <td style={styles.cell}>
                  {editando === registro.veiculo_id ? (
                    <input
                      type="text"
                      name="modelo"
                      value={valoresEditados.modelo || ""}
                      onChange={handleInputChange}
                      style={styles.input}
                    />
                  ) : (
                    registro.modelo
                  )}
                </td>
                <td style={styles.cell}>
                  {editando === registro.veiculo_id ? (
                    <input
                      type="text"
                      name="cor"
                      value={valoresEditados.cor || ""}
                      onChange={handleInputChange}
                      style={styles.input}
                    />
                  ) : (
                    registro.cor
                  )}
                </td>
                <td style={styles.cell}>{registro.nome}</td>
                <td style={styles.cell}>
                  {formatarTelefone(registro.telefone)}
                </td>
                <td style={styles.cell}>
                  {editando === registro.veiculo_id ? (
                    <>
                      <button
                        onClick={() => salvarEdicao(registro.veiculo_id)}
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
              <td style={styles.cell} colSpan={6}>
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
