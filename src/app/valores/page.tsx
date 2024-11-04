import { CadastroForm, ValoresTable, ValoresRotativos } from "./content";

export default function Registro() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        width: "90%",
        marginTop: "650px",
        marginLeft: "150px",
      }}
    >
      <div>
        <CadastroForm />
      </div>
      <div style={{ display: "flex", maxWidth: "1075px" }}>
        <div style={{ flex: 1, padding: 0 }}>
          <ValoresTable />
        </div>
        <div style={{ flex: 1, padding: 0 }}>
          <ValoresRotativos />
        </div>
      </div>
    </div>
  );
}
