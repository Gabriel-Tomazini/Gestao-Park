import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

// Função para buscar registros
export async function GET() {
  try {
    const result = await sql`
          SELECT pessoas.id, 
          nome, 
          cpf,
          telefone, 
          endereco, 
          pessoas.valores_id,
          tipovalores.valor, 
          tipovalores.descricao, 
          tipovalores.id_tipovalores
          FROM pessoas
          left join tipovalores on tipovalores.id_tipovalores = pessoas.valores_id
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

// Função para criar um novo registro
export async function POST(request: Request) {
  try {
    const { nome, cpf, telefone, endereco, valores_id } = await request.json();

    console.log("Dados recebidos para criação:", {
      nome,
      cpf,
      telefone,
      endereco,
      valores_id,
    });

    const insertResult = await sql`
      INSERT INTO pessoas (nome, cpf, telefone, endereco, valores_id) 
      VALUES (${nome}, ${cpf}, ${telefone}, ${endereco}, ${valores_id});
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

// Função para atualizar um registro
export async function PUT(request: Request) {
  try {
    const { id, nome, cpf, telefone, endereco } = await request.json();

    console.log("Dados recebidos para atualização:", {
      id,
      nome,
      cpf,
      telefone,
      endereco,
    });

    if (!id || !nome || !cpf || !telefone || !endereco) {
      return NextResponse.json(
        { error: "Dados incompletos para atualização" },
        { status: 400 },
      );
    }

    const updateResult = await sql`
      UPDATE pessoas 
      SET nome = ${nome}, cpf = ${cpf}, telefone = ${telefone}, endereco = ${endereco}
      WHERE id = ${id}
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
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "ID da pessoa não fornecido" },
        { status: 400 },
      );
    }

    const deleteResult = await sql`
      DELETE FROM pessoas WHERE id = ${id}
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