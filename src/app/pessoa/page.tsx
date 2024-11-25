import { CadastroForm, PessoaTable } from "./content";

export default function Registro() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        marginTop: "770px",
        width: "95%",
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
