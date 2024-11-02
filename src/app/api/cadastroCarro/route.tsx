import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

// Função para criar um novo registro
export async function POST(request: Request) {
  try {
    const { modelo, placa, cor, pessoa_id } = await request.json();

    console.log("Dados recebidos para criação:", {
      modelo,
      placa,
      cor,
      pessoa_id,
    });

    const insertResult = await sql`
      INSERT INTO veiculos (pessoa_id, placa, modelo, cor) 
      VALUES (${pessoa_id}, ${placa}, ${modelo}, ${cor});
    `;

    console.log("Resultado da inserção:", insertResult);

    return NextResponse.json({ message: "Registro criado com sucesso" });
  } catch (error) {
    console.error("Erro ao criar registro:", error);
    return NextResponse.json(
      { error: "Erro ao criar registro" },
      { status: 500 },
    );
  }
}
