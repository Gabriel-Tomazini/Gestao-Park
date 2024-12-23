import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await sql`
      SELECT 
        regEsta.id, 
        pessoa_id, 
        nome, 
        telefone, 
        veiculo_id, 
        placa, 
        modelo, 
        data_entrada, 
        data_saida 
      FROM registros_estacionamento as regEsta
      LEFT JOIN veiculos ON veiculos.id = veiculo_id 
      LEFT JOIN pessoas ON pessoas.id = pessoa_id
      ORDER BY regEsta.id;
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
    const { placa, dataEntrada } = await request.json();

    console.log("Dados recebidos para criação:", { placa, dataEntrada });

    // Verifica se o veículo existe e se o proprietário está com o pagamento em dia
    const result = await sql`
      SELECT pessoas.pago 
      FROM veiculos 
      JOIN pessoas ON pessoas.id = veiculos.pessoa_id
      WHERE veiculos.placa ILIKE ${placa}
      AND "situacaoPessoa" = true
    `;

    // Verifica o status do pagamento
    if (result.rowCount === 0 || !result.rows[0].pago) {
      return NextResponse.json(
        { error: "Cadastro não permitido. Existe uma pendência com o financeiro, ou cadastro inativo." },
        { status: 400 },
      );
    }

    // Cadastro permitido, então prossegue com a inserção do registro
    const insertResult = await sql`
      INSERT INTO public.registros_estacionamento (veiculo_id, data_entrada)
      VALUES (
        (SELECT id FROM public.veiculos WHERE placa ILIKE ${placa}),
        ${dataEntrada}
      );
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

export async function PUT(request: Request) {
  try {
    const { data_saida, registro_id } = await request.json();

    console.log("Dados recebidos para atualização:", {
      data_saida,
      registro_id,
    });

    if (!data_saida || !registro_id) {
      return NextResponse.json(
        { error: "Dados incompletos para atualização" },
        { status: 400 },
      );
    }

    const updateResult = await sql`
      UPDATE registros_estacionamento 
      SET data_saida = ${data_saida}
      WHERE id = ${registro_id}
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
