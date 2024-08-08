import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/modals/User";

const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";

export const GET = async (req: NextRequest) => {
  const headersList = headers();
  const authHeader = headersList.get("authorization");
  const token = authHeader?.split(" ")[1];
  if (token) {
    try {
      await dbConnect();
      console.log("Checking the token...");
      const decoded = jwt.verify(token, SECRET_KEY) as { email: string };
      console.log("Decoded token...", decoded);

      const user = await User.findOne({ email: decoded.email });
      if (!user) {
        return new NextResponse(JSON.stringify({ message: "User not found" }), {
          status: 401,
        });
      }

      const newToken = jwt.sign({ email: user.email }, SECRET_KEY, {
        expiresIn: "1h",
      });

      return new NextResponse(
        JSON.stringify({ message: "Logged In", newToken }),
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
