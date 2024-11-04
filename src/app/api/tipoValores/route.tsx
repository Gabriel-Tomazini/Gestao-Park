// src/app/api/registros/route.ts

import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await sql`
        select * from tipovalores
        order by id_tipovalores
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

export async function POST(request: Request) {
  try {
    const { descricao, valor } = await request.json();

    console.log("Dados recebidos para criação:", {
      descricao,
      valor,
    });

    const insertResult = await sql`
      INSERT INTO tipovalores (descricao, valor)
      VALUES (${descricao}, ${valor})
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

// Função para excluir um registro
export async function DELETE(request: Request) {
  try {
    const { id_tipovalores } = await request.json();

    if (!id_tipovalores) {
      return NextResponse.json(
        { error: "ID da pessoa não fornecido" },
        { status: 400 },
      );
    }

    const deleteResult = await sql`
      DELETE FROM tipovalores WHERE id_tipovalores = ${id_tipovalores}
    `;

    console.log("Resultado do DELETE:", deleteResult);

    return NextResponse.json({ message: "Registro excluído com sucesso" });
  } catch (error) {
    console.error("Erro ao excluir registro:", error);
    return NextResponse.json(
      { error: "Erro ao excluir registro" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { id_tipovalores, valor, descricao } = await request.json();

    console.log("Dados recebidos para atualização:", {
      id_tipovalores,
      valor,
      descricao,
    });

    if (!id_tipovalores) {
      return NextResponse.json(
        { error: "Dados incompletos para atualização" },
        { status: 400 },
      );
    }

    const updateResult = await sql`
      UPDATE tipovalores 
      SET valor = ${valor}, descricao = ${descricao}
      WHERE id_tipovalores = ${id_tipovalores}
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
