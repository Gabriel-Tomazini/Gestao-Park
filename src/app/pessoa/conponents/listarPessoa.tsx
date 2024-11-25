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
  pago: boolean;
  ativo: boolean;
}

export function TabelaRegistros() {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [editando, setEditando] = useState<number | null>(null);
  const [valoresEditados, setValoresEditados] = useState<Partial<Registro>>({});
  const [mostrarInativos, setMostrarInativos] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchRegistros = async () => {
    setLoading(true);
    try {
      // Adiciona o parâmetro `inativos` à URL com base no estado de `mostrarInativos`
      const url = `http://localhost:3000/api/cadastroPessoa${mostrarInativos ? "?inativos=true" : ""}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Erro ao buscar registros");

      const data = await response.json();
      // Adaptando o campo `situacaoPessoa` para `ativo`
      const registrosAdaptados = data.map((registro: any) => ({
        ...registro,
        ativo: registro.situacaoPessoa,
      }));
      setRegistros(registrosAdaptados);
    } catch (error) {
      console.error("Erro ao buscar registros:", error);
      alert("Erro ao buscar registros");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistros();
  }, [mostrarInativos]);

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
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/cadastroPessoa", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...valoresEditados }),
      });
      if (!response.ok) throw new Error("Erro ao atualizar o registro");

      alert("Registro atualizado com sucesso!");
      fetchRegistros();
    } catch (error) {
      console.error("Erro ao enviar atualização:", error);
      alert("Erro ao atualizar o registro");
    } finally {
      setEditando(null);
      setValoresEditados({});
      setLoading(false);
    }
  };

  const excluirRegistro = async (id: number) => {
    if (!confirm("Deseja realmente excluir o registro?")) return;
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/cadastroPessoa", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error("Erro ao excluir o registro");

      alert("Registro excluído com sucesso!");
      fetchRegistros();
    } catch (error) {
      console.error("Erro ao excluir registro:", error);
      alert("Erro ao excluir registro");
    } finally {
      setLoading(false);
    }
  };

  const atualizarStatusAtivo = async (id: number, ativo: boolean) => {
    try {
      const response = await fetch("http://localhost:3000/api/cadastroPessoa", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, toggleSituacao: true }),
      });
      if (!response.ok) throw new Error("Erro ao atualizar status de ativação");

      alert(`Registro ${ativo ? "ativado" : "desativado"} com sucesso!`);
      fetchRegistros();
    } catch (error) {
      console.error("Erro ao atualizar ativação:", error);
      alert("Erro ao atualizar ativação");
    }
  };

  const handleAtivarDesativarClick = (registro: Registro) => {
    const novoStatus = !registro.ativo;
    atualizarStatusAtivo(registro.id, novoStatus);
  };

  const handleToggleMostrarInativos = () => {
    setMostrarInativos((prev) => !prev);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValoresEditados((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div style={styles.tableContainer}>
      <button onClick={handleToggleMostrarInativos} style={styles.filterButton}>
        {mostrarInativos ? "Mostrar Ativos" : "Mostrar Inativos"}
      </button>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.headerCell}>Nome</th>
            <th style={styles.headerCell}>CPF</th>
            <th style={styles.headerCell}>Telefone</th>
            <th style={styles.headerCell}>Endereço</th>
            <th style={styles.headerCell}>Tipo Mensalidade</th>
            <th style={styles.headerCell}>Tipo Valor</th>
            <th style={styles.headerCell}>Valor</th>
            <th style={styles.headerCell}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={7} style={styles.cell}>
                Carregando...
              </td>
            </tr>
          ) : registros.length > 0 ? (
            registros
              .filter((registro) => registro.ativo === !mostrarInativos)
              .map((registro) => (
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
                  <td style={styles.cell}>{registro.cpf}</td>
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
                      registro.telefone
                    )}
                  </td>
                  <td style={styles.cell}>
                    {editando === registro.id ? (
                      <input
                        type="text"
                        name="endereco"
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
                  <td style={styles.cell}>{registro.descricao}</td>
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
                          onClick={() => handleAtivarDesativarClick(registro)}
                          style={{
                            ...styles.activationButton,
                            backgroundColor: registro.ativo
                              ? "#FF9800"
                              : "#4CAF50",
                          }}
                        >
                          {registro.ativo ? "Desativar" : "Ativar"}
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan={7} style={styles.cell}>
                Nenhum registro encontrado
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  tableContainer: { width: "100%", padding: "20px" },
  filterButton: {
    marginBottom: "15px",
    padding: "10px 15px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#007BFF",
    color: "#FFFFFF",
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
    fontSize: "14px",
    borderBottom: "1px solid #ddd",
    textAlign: "left",
  },
  editRow: { backgroundColor: "#e0f7fa" },
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
  activationButton: {
    color: "white",
    padding: "5px 10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "5px",
  },
};
