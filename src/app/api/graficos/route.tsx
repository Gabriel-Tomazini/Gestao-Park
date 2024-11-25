import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

// Função para obter o número de entradas por dia em um intervalo de datas
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  if (!startDate || !endDate) {
    return NextResponse.json(
      { error: "Os parâmetros startDate e endDate são obrigatórios." },
      { status: 400 },
    );
  }

  try {
    const result = await sql`
      SELECT 
        DATE_TRUNC('day', hora_entrada_rotativo) AS dia,
        COUNT(*) AS quantidade
      FROM estacionamento_rotativo
      WHERE hora_entrada_rotativo >= ${startDate} AND hora_entrada_rotativo <= ${endDate}
      AND valor_rotativo > 0
      GROUP BY dia
      ORDER BY dia;
    `;

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return NextResponse.json(
      { error: "Erro ao buscar dados." },
      { status: 500 },
    );
  }
}
