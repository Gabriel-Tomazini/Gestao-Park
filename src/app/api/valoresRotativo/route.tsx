// src/app/api/registros/route.ts

import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await sql`
        select * from valores_estacionamento_rotativo
        order by id_estacionamento_rotativo
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

export async function PUT(request: Request) {
  try {
    const { id_estacionamento_rotativo, valor_estacionamento_rotativo } =
      await request.json();

    console.log("Dados recebidos para atualização:", {
      id_estacionamento_rotativo,
      valor_estacionamento_rotativo,
    });

    if (!id_estacionamento_rotativo) {
      return NextResponse.json(
        { error: "Dados incompletos para atualização" },
        { status: 400 },
      );
    }

    const updateResult = await sql`
      UPDATE valores_estacionamento_rotativo 
      SET valor_estacionamento_rotativo = ${valor_estacionamento_rotativo}
      WHERE id_estacionamento_rotativo = ${id_estacionamento_rotativo}
    `;

    console.log("Resultado do UPDATE:", updateResult);

    return NextResponse.json({ message: "Registro atualizado com sucesso" });
  } catch (error) {
    console.error("Erro ao atualizar registro:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar registro" },
      { status: 500 },
    );
  }
}
