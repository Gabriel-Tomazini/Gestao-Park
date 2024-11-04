import { CadastroForm, PessoaTable } from "./content";

export default function Registro() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        marginTop: "650px",
        width: "90%",
        marginLeft: "10%",
      }}
    >
      <div>
        <CadastroForm />
      </div>
      <div>
        <PessoaTable />
      </div>
    </div>
  );
}
