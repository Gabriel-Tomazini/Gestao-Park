import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Executa a query para buscar os valores da primeira hora e das horas adicionais
    const result = await sql`
      SELECT id_estacionamento_rotativo, valor_estacionamento_rotativo
      FROM valores_estacionamento_rotativo
      WHERE id_estacionamento_rotativo IN (1, 2)
    `;

    // Formata a resposta em um objeto com `primeiraHora` e `horasAdicionais`
    const valores = result.rows.reduce(
      (acc, row) => {
        if (row.id_estacionamento_rotativo === 1) {
          acc.primeiraHora = row.valor_estacionamento_rotativo;
        } else if (row.id_estacionamento_rotativo === 2) {
          acc.horasAdicionais = row.valor_estacionamento_rotativo;
        }
        return acc;
      },
      { primeiraHora: 0, horasAdicionais: 0 },
    );

    return NextResponse.json(valores);
  } catch (error) {
    console.error("Erro ao buscar valores de estacionamento:", error);
    return NextResponse.json(
      { error: "Erro ao buscar valores de estacionamento" },
      { status: 500 },
    );
  }
}
