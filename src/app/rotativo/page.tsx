import { RegistroEntradaSaidaForm, VehicleTable } from "./content";

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
        <RegistroEntradaSaidaForm />
      </div>
      <div>
        <VehicleTable />
      </div>
    </div>
  );
}
