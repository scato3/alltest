import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET() {
  // JWT 토큰 생성
  const token = jwt.sign({ user: "guest" }, "your-secret-key", {
    expiresIn: "1h",
  });

  // 응답 생성
  const response = NextResponse.json({ message: "Token created", token });

  // 쿠키에 토큰 저장
  response.cookies.set("auth-token", token, {
    httpOnly: false, // 클라이언트에서도 접근 가능
    secure: process.env.NODE_ENV === "production", // HTTPS 환경에서만 작동
    maxAge: 60 * 60, // 1시간 (초 단위)
  });

  return response;
}
