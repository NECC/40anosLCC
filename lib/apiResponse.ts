import { NextResponse } from "next/server";

export function successResponse<T>(data: T) {
  return NextResponse.json(
    {
      status: "success",
      data,
    },
    { status: 200 },
  );
}

export function errorResponse(message: string, status: number) {
  return NextResponse.json(
    {
      status: "error",
      message,
    },
    { status },
  );
}