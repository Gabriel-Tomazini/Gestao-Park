"use client";

import React, { useState } from "react";
import { TabelaRegistros } from "./conponents/listarPessoa"; // Verifique o caminho correto para o arquivo listarPessoa

export default function CadastroForm() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [valores_id, setValoresId] = useState("");
  const [loading, setLoading] = useState(false);

  const formatCpf = (value: string) => {
    const onlyNumbers = value.replace(/\D/g, "").slice(0, 11);
    return onlyNumbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const formatTelefone = (value: string) => {
    const onlyNumbers = value.replace(/\D/g, "").slice(0, 11);
    return onlyNumbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  };

  const handleCpfChange = (value: string) => {
    setCpf(formatCpf(value));
  };

  const handleTelefoneChange = (value: string) => {
    setTelefone(formatTelefone(value));
  };

  const handleValoresIdChange = (value: string) => {
    const onlyNumbers = value.replace(/\D/g, "");
    setValoresId(onlyNumbers);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/cadastroPessoa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, cpf, telefone, endereco, valores_id }),
      });

      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        setNome("");
        setCpf("");
        setTelefone("");
        setEndereco("");
        setValoresId("");
        window.location.reload();
      } else {
        alert("Erro ao realizar o cadastro. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
      alert("Erro ao realizar o cadastro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Cadastro</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          style={styles.input}
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="CPF"
          style={styles.input}
          value={cpf}
          onChange={(e) => handleCpfChange(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Telefone"
          style={styles.input}
          value={telefone}
          onChange={(e) => handleTelefoneChange(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Endereço"
          style={styles.input}
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Tipo Valor"
          style={styles.input}
          value={valores_id}
          onChange={(e) => handleValoresIdChange(e.target.value)}
          required
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
      <div style={styles.footerText}>Preencha todos os campos</div>
    </div>
  );
}

function PessoaTable() {
  return (
    <div style={styles.containerRegistro}>
      <TabelaRegistros />
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
    width: "90%",
    padding: "20px",
    backgroundColor: "#E0EBF5",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginTop: "-450px",
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
  containerRegistro: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "90%",
    padding: "20px",
    backgroundColor: "#F5F9FD",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxHeight: "70vh",
    overflowY: "auto",
  },
};

export { CadastroForm, PessoaTable };
