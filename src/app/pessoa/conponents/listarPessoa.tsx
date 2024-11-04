"use client";

import React, { useEffect, useState } from "react";

interface Registro {
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
  endereco: string;
  descricao: string;
  valor: number;
  valores_id: number;
}

export function TabelaRegistros() {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [editando, setEditando] = useState<number | null>(null);
  const [valoresEditados, setValoresEditados] = useState<Partial<Registro>>({});

  const fetchRegistros = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/cadastroPessoa");
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

  const formatarCPF = (cpf: string) => {
    const apenasNumeros = cpf.replace(/\D/g, "");
    return apenasNumeros.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const iniciarEdicao = (registro: Registro) => {
    setEditando(registro.id);
    setValoresEditados({
      nome: registro.nome,
      cpf: registro.cpf,
      telefone: registro.telefone,
      endereco: registro.endereco,
      valores_id: registro.valores_id,
    });
  };

  const cancelarEdicao = () => {
    setEditando(null);
    setValoresEditados({});
  };

  const salvarEdicao = async (id: number) => {
    const novoRegistro = {
      id: id,
      ...valoresEditados,
    };

    try {
      const response = await fetch("http://localhost:3000/api/cadastroPessoa", {
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

  const excluirRegistro = async (id: number) => {
    try {
      const response = await fetch("http://localhost:3000/api/cadastroPessoa", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
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
            <th style={styles.headerCell}>Nome</th>
            <th style={styles.headerCell}>CPF</th>
            <th style={styles.headerCell}>Telefone</th>
            <th style={styles.headerCell}>Endereço</th>
            <th style={styles.headerCell}>Tipo Valor</th>
            <th style={styles.headerCell}>Valor</th>
            <th style={styles.headerCell}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(registros) && registros.length > 0 ? (
            registros.map((registro) => (
              <tr
                key={registro.id}
                style={editando === registro.id ? styles.editRow : {}}
              >
                <td style={styles.cell}>
                  {editando === registro.id ? (
                    <input
                      type="text"
                      name="nome"
                      value={valoresEditados.nome || ""}
                      onChange={handleInputChange}
                      style={styles.input}
                    />
                  ) : (
                    registro.nome
                  )}
                </td>
                <td style={styles.cell}>
                  {editando === registro.id ? (
                    <input
                      type="text"
                      name="cpf"
                      value={valoresEditados.cpf || ""}
                      onChange={handleInputChange}
                      style={styles.input}
                    />
                  ) : (
                    formatarCPF(registro.cpf)
                  )}
                </td>
                <td style={styles.cell}>
                  {editando === registro.id ? (
                    <input
                      type="text"
                      name="telefone"
                      value={valoresEditados.telefone || ""}
                      onChange={handleInputChange}
                      style={styles.input}
                    />
                  ) : (
                    formatarTelefone(registro.telefone)
                  )}
                </td>
                <td style={styles.cell}>
                  {editando === registro.id ? (
                    <input
                      type="text"
                      name="Endereço"
                      value={valoresEditados.endereco || ""}
                      onChange={handleInputChange}
                      style={styles.input}
                    />
                  ) : (
                    registro.endereco
                  )}
                </td>
                <td style={styles.cell}>
                  {editando === registro.id ? (
                    <input
                      type="text"
                      name="valores_id"
                      value={valoresEditados.valores_id || ""}
                      onChange={handleInputChange}
                      style={styles.input}
                    />
                  ) : (
                    registro.valores_id
                  )}
                </td>
                <td style={styles.cell}>
                  {registro.valor != null ? registro.valor : "Não informado"}
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
                      <button
                        onClick={() => excluirRegistro(registro.id)}
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
    fontWeight: "normal",
    borderBottom: "1px solid #ddd",
    textAlign: "left",
  },
  cell: {
    padding: "10px 15px",
    fontSize: "14px",
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
