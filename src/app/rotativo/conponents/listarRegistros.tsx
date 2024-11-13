"use client";

import React, { useEffect, useState } from "react";

interface Registro {
  id_rotativo: number;
  placa_rotativo: string;
  modelo_rotativo: string;
  cor_rotativo: string;
  hora_entrada_rotativo: string;
  hora_saida_rotativo: string | null;
  valor_rotativo: number | null;
}

interface ValoresEstacionamento {
  primeiraHora: number;
  horasAdicionais: number;
}

// Função para formatar data e hora
const formatDateTime = (dateTime: string | null) => {
  if (!dateTime) return null;
  const date = new Date(dateTime);
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
};

const formatarValor = (valor: number | null) => {
  if (valor === null) return "-";
  return `R$ ${valor.toFixed(2).replace(".", ",")}`;
};

// Função para calcular o valor com base no tempo de permanência
const calcularValor = (
  hora_entrada_rotativo: string,
  hora_saida_rotativo: string,
  valores: ValoresEstacionamento,
) => {
  const entrada = new Date(hora_entrada_rotativo);
  const saida = new Date(hora_saida_rotativo);
  const diffMs = saida.getTime() - entrada.getTime();
  const diffHrs = Math.ceil(diffMs / (1000 * 60 * 60)); // Arredonda para cima

  if (diffHrs <= 1) return valores.primeiraHora;
  return valores.primeiraHora + (diffHrs - 1) * valores.horasAdicionais;
};

export function TabelaRegistros() {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [valoresEstacionamento, setValoresEstacionamento] =
    useState<ValoresEstacionamento | null>(null);
  const [editando, setEditando] = useState<number | null>(null);
  const [valoresEditados, setValoresEditados] = useState<Partial<Registro>>({});

  // Função para buscar os valores de cobrança
  const fetchValoresEstacionamento = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/valoresEstacionamentoRotativo",
        { cache: "reload" },
      );
      const data = await response.json();

      // Acessa diretamente as propriedades do objeto retornado e define no estado
      setValoresEstacionamento({
        primeiraHora: parseFloat(data.primeiraHora),
        horasAdicionais: parseFloat(data.horasAdicionais),
      });
    } catch (error) {
      console.error("Erro ao buscar valores de estacionamento:", error);
    }
  };

  const fetchRegistros = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/estacionamentoRotativo",
      );
      const data = await response.json();
      setRegistros(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Erro ao buscar registros:", error);
      setRegistros([]);
    }
  };

  useEffect(() => {
    fetchRegistros();
    fetchValoresEstacionamento();
  }, []);

  const iniciarEdicao = (registro: Registro) => {
    setEditando(registro.id_rotativo);
    setValoresEditados({
      hora_saida_rotativo: registro.hora_saida_rotativo,
    });
  };

  const cancelarEdicao = () => {
    setEditando(null);
    setValoresEditados({});
  };

  const salvarEdicao = async (id: number) => {
    // Encontra o registro atual para obter a hora de entrada
    const registroAtual = registros.find((r) => r.id_rotativo === id);
    const horaSaida = valoresEditados.hora_saida_rotativo || "";

    if (
      registroAtual &&
      valoresEstacionamento &&
      registroAtual.hora_entrada_rotativo
    ) {
      const valorAPagar = calcularValor(
        registroAtual.hora_entrada_rotativo,
        horaSaida,
        valoresEstacionamento,
      );

      const novoRegistro = {
        id_rotativo: id,
        hora_saida_rotativo: horaSaida,
        valor_rotativo: valorAPagar,
      };

      try {
        const response = await fetch(
          "http://localhost:3000/api/estacionamentoRotativo",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(novoRegistro),
          },
        );

        if (response.ok) {
          alert("Registro atualizado com sucesso!");
          fetchRegistros(); // Atualiza a lista de registros
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
    } else {
      alert("Erro: Dados insuficientes para calcular o valor.");
    }
  };

  return (
    <div style={styles.tableContainer}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.headerCell}>Placa</th>
            <th style={styles.headerCell}>Modelo</th>
            <th style={styles.headerCell}>Cor</th>
            <th style={styles.headerCell}>Entrada</th>
            <th style={styles.headerCell}>Saída</th>
            <th style={styles.headerCell}>Valor a Pagar</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((registro) => (
            <tr key={registro.id_rotativo}>
              <td style={styles.cell}>
                {registro.placa_rotativo.toUpperCase()}
              </td>
              <td style={styles.cell}>
                {registro.modelo_rotativo || (
                  <span style={{ color: "red" }}>Não informado</span>
                )}
              </td>
              <td style={styles.cell}>{registro.cor_rotativo}</td>
              <td style={styles.cell}>
                {formatDateTime(registro.hora_entrada_rotativo)}
              </td>
              <td style={styles.cell}>
                {editando === registro.id_rotativo ? (
                  <input
                    type="datetime-local"
                    style={styles.inputField}
                    value={valoresEditados.hora_saida_rotativo || ""}
                    onChange={(e) =>
                      setValoresEditados({
                        ...valoresEditados,
                        hora_saida_rotativo: e.target.value,
                      })
                    }
                  />
                ) : (
                  formatDateTime(registro.hora_saida_rotativo) || (
                    <span style={{ color: "red" }}>
                      Ainda no estacionamento
                    </span>
                  )
                )}
              </td>
              <td style={styles.cell}>{formatarValor(registro.valor_rotativo)}</td>
              <td style={styles.cell}>
                {editando === registro.id_rotativo ? (
                  <>
                    <button
                      onClick={() => salvarEdicao(registro.id_rotativo)}
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
          ))}
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
