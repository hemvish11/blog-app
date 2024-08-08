import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "@/app/modals/User";
import dbConnect from "@/app/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const { email, password } = await req.json();
  if (!email || !password) {
    return new NextResponse(
      JSON.stringify({ message: "Email and password are required" }),
      {
        status: 400,
      }
    );
  }

  await dbConnect();

  const existingUser = await User.findOne({ email: email });
  if (!existingUser) {
    return new NextResponse(JSON.stringify({ message: "User Not found" }), {
      status: 400,
    });
  }

  const isMatch = await bcrypt.compare(password, existingUser.password);
  if (isMatch) {
    const token = jwt.sign({ email: existingUser.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    return new NextResponse(JSON.stringify({ message: "Logged In", token,name: existingUser.name }), {
      status: 200,
    });
  } else {
    return new NextResponse(JSON.stringify({ message: "Wrong Password" }), {
      status: 401,
    });
  }
};
