import { NextResponse } from "next/server";

export class ApiHandler {
  public static ResponseToJson(
    response: object | unknown,
    type: 200 | 500 | 201 | 400 | 404 | 401 | 403 | 405 | 409 | 422 | 429 | 503,
  ): NextResponse<object | unknown> {
    return NextResponse.json({ rows: response }, { status: type });
  }
}
