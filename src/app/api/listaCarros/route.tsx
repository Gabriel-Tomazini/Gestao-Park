// src/app/api/registros/route.ts

import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

// Função para buscar registros
export async function GET() {
  try {
    const result = await sql`
      SELECT veiculos.id as veiculo_id, pessoas.id as pessoa_id, placa, modelo, cor, nome, telefone 
      FROM veiculos 
      LEFT JOIN pessoas ON pessoas.id = veiculos.pessoa_id
      where "situacaoPessoa" = true
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

// Função para atualizar um registro
export async function PUT(request: Request) {
  try {
    const { veiculo_id, placa, modelo, cor } = await request.json();

    console.log("Dados recebidos para atualização:", {
      veiculo_id,
      placa,
      modelo,
      cor,
    });

    if (!veiculo_id || !placa || !modelo || !cor) {
      return NextResponse.json(
        { error: "Dados incompletos para atualização" },
        { status: 400 },
      );
    }

    const updateResult = await sql`
      UPDATE veiculos 
      SET placa = ${placa}, modelo = ${modelo}, cor = ${cor}
      WHERE id = ${veiculo_id}
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

// Função para excluir um registro
export async function DELETE(request: Request) {
  try {
    const { veiculo_id } = await request.json();

    if (!veiculo_id) {
      return NextResponse.json(
        { error: "ID do veículo não fornecido" },
        { status: 400 },
      );
    }

    const deleteResult = await sql`
      DELETE FROM veiculos WHERE id = ${veiculo_id}
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
