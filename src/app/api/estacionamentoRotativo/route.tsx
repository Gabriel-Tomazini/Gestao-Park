import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

// Definindo a interface para o registro
interface RegistroRotativo {
  id_rotativo: number;
  placa_rotativo: string;
  cor_rotativo: string;
  modelo_rotativo: string;
  hora_entrada_rotativo: string;
  hora_saida_rotativo: string | null;
}

export async function GET() {
  try {
    // Tipagem explícita para o tipo de `result.rows`
    const result = await sql<RegistroRotativo[]>`
      SELECT 
        id_rotativo, 
        placa_rotativo, 
        cor_rotativo, 
        modelo_rotativo, 
        hora_entrada_rotativo, 
        hora_saida_rotativo 
      FROM estacionamento_rotativo
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
    const {
      placa_rotativo,
      modelo_rotativo,
      cor_rotativo,
      hora_entrada_rotativo,
    }: RegistroRotativo = await request.json();

    console.log("Dados recebidos para criação:", {
      placa_rotativo,
      modelo_rotativo,
      cor_rotativo,
      hora_entrada_rotativo,
    });

    const insertResult = await sql`
      INSERT INTO estacionamento_rotativo (placa_rotativo, modelo_rotativo, cor_rotativo, hora_entrada_rotativo)
      VALUES (${placa_rotativo}, ${modelo_rotativo}, ${cor_rotativo}, ${hora_entrada_rotativo})
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
    const { hora_saida_rotativo, id_rotativo }: Partial<RegistroRotativo> =
      await request.json();

    console.log("Dados recebidos para atualização:", {
      hora_saida_rotativo,
      id_rotativo,
    });

    if (!hora_saida_rotativo || !id_rotativo) {
      return NextResponse.json(
        { error: "Dados incompletos para atualização" },
        { status: 400 },
      );
    }

    const updateResult = await sql`
      UPDATE public.estacionamento_rotativo
      SET hora_saida_rotativo = ${hora_saida_rotativo}
      WHERE id_rotativo = ${id_rotativo};
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
