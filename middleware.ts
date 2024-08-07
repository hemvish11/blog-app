import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { loggingMiddleware } from "./middlewares/apis/loggingMiddleware";
import { authMiddleware } from "./middlewares/apis/authMiddleware";

export default function middleware(req: NextRequest) {
  if (req.url.includes("/api")) {
    loggingMiddleware(req);
    console.log("Request", req);
  }

  const handler: NextApiHandler = async (
    req: NextApiRequest,
    res: NextApiResponse
  ) => {};

  const authRes = authMiddleware(handler);

  if (!authRes) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  return NextResponse.next();
}
