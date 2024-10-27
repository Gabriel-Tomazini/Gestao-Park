// src/app/api/registros/route.ts

import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await sql`
      SELECT pessoa_id, nome, veiculo_id, placa, modelo, data_entrada, data_saida 
      FROM registros_estacionamento 
      LEFT JOIN veiculos ON veiculos.id = veiculo_id 
      LEFT JOIN pessoas ON pessoas.id = pessoa_id;
    `;
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Erro ao buscar registros:", error);
    return NextResponse.json(
      { error: "Erro ao buscar registros" },
      { status: 500 },
    );
  }
}
