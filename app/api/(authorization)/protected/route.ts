import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";

export const GET = async (req: NextApiRequest) => {
  const headersList = headers();
  const authHeader = headersList.get("authorization");
  const token = authHeader?.split(" ")[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      return new NextResponse(
        JSON.stringify({ message: "Protected data", user: decoded }),
        {
          status: 200,
        }
      );
    } catch (error) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or expired token" }),
        {
          status: 401,
        }
      );
    }
  } else {
    return new NextResponse(JSON.stringify({ message: "No token provided" }), {
      status: 401,
    });
  }
};
