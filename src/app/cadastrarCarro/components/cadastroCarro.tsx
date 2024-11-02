import React, { useState } from "react";

export default function CadastroForm() {
  const [placa, setPlaca] = useState("");
  const [modelo, setModelo] = useState("");
  const [cor, setCor] = useState("");
  const [pessoa_id, setPessoaId] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePlacaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value.toUpperCase().slice(0, 7);
    setPlaca(valor);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    if (placa.length !== 7) {
      alert("A placa deve ter exatamente 7 caracteres.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/cadastroCarro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ placa, modelo, cor, pessoa_id }),
      });

      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        setPlaca("");
        setModelo("");
        setCor("");
        setPessoaId("");
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
          placeholder="Placa"
          style={styles.input}
          value={placa}
          onChange={handlePlacaChange}
          required
        />
        <input
          type="text"
          placeholder="Modelo"
          style={styles.input}
          value={modelo}
          onChange={(e) => setModelo(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Cor"
          style={styles.input}
          value={cor}
          onChange={(e) => setCor(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Código do dono"
          style={styles.input}
          value={pessoa_id}
          onChange={(e) => setPessoaId(e.target.value)}
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

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "60vh",
    padding: "20px",
    backgroundColor: "#E0EBF5",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
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
};
