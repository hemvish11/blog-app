import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export const POST = async (req: NextResponse) => {
  return new NextResponse(JSON.stringify({ message: "Logged out" }));
};
