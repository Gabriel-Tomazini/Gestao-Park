// src/app/api/registros/route.ts

import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await sql`
      select placa, modelo, cor, nome, telefone from veiculos left join pessoas on pessoas.id = veiculos.pessoa_id
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
